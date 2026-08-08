-- Bing offline conversion feed.
--
-- WHY: the UET tag lives in the browser, so every ad blocker / Edge tracking-prevention /
-- Safari ITP visitor that clicks an affiliate link is invisible to Bing — while the same
-- click still lands in affiliate_clicks (server-side) and pings Telegram. That is the gap
-- the patron sees. On top of that, Bing can only ever see "clicked out", never the event
-- that actually pays: registration → verification → first-time deposit, which lives in the
-- broker's IB panel and has no postback.
--
-- FIX: feed Bing from Postgres instead of from the browser. affiliate_clicks already stores
-- msclkid for every outbound click, and broker_conversions (below) is where the IB-panel
-- reality gets written down. Both are exported as Microsoft "offline conversions".

-- ── 1. IB-panel reality ──────────────────────────────────────────────────────
create table if not exists public.broker_conversions (
  id                  uuid primary key default gen_random_uuid(),
  broker_id           text not null,
  stage               text not null check (stage in ('signup', 'verified', 'ftd')),
  -- The ad click this belongs to. Nullable because the IB panel may not echo our subid —
  -- in that case it is matched by hand against affiliate_clicks on {broker, date}.
  msclkid             text,
  occurred_at         timestamptz not null default now(),
  deposit_usd         numeric(10, 2),   -- what the trader funded
  payout_usd          numeric(10, 2),   -- what we earn — this is the value Bing bids against
  broker_account_ref  text,             -- account id / login as shown in the IB panel
  note                text,
  created_at          timestamptz not null default now(),
  -- Same account cannot be recorded twice at the same stage.
  unique (broker_id, broker_account_ref, stage)
);

create index if not exists broker_conversions_msclkid_idx on public.broker_conversions (msclkid);
create index if not exists broker_conversions_occurred_idx on public.broker_conversions (occurred_at desc);

alter table public.broker_conversions enable row level security;
-- No policies: service_role only, same as affiliate_clicks reads. The site never touches this.

create index if not exists affiliate_clicks_msclkid_idx on public.affiliate_clicks (msclkid);

-- ── 2. The export Bing eats ──────────────────────────────────────────────────
-- Columns and header text are the Microsoft Advertising bulk offline-conversion format.
-- Times are emitted in UTC — pick UTC as the time zone in the import dialog to match.
--
-- Usage:  select * from bing_offline_conversions(now() - interval '7 days');
--         → download as CSV → Bing Ads ▸ Tools ▸ Import ▸ Offline conversions
create or replace function public.bing_offline_conversions(
  from_ts timestamptz,
  to_ts   timestamptz default now()
)
returns table (
  "Type"                     text,
  "Microsoft Click Id"       text,
  "Conversion Name"          text,
  "Conversion Time"          text,
  "Conversion Value"         numeric,
  "Conversion Currency Code" text
)
language sql
stable
as $$
  -- One row per ad click, not per button press. A visitor who taps four broker cards is
  -- one conversion here but four Telegram alerts — that difference is most of the
  -- "Telegram says more than Bing" gap.
  select
    'Offline Conversion',
    c.msclkid,
    'offline_affiliate_click',
    to_char(min(c.created_at) at time zone 'UTC', 'MM/DD/YYYY HH24:MI:SS'),
    0::numeric,
    'USD'
  from public.affiliate_clicks c
  where c.msclkid is not null
    and c.created_at >= from_ts
    and c.created_at <  to_ts
    -- Microsoft rejects click ids older than 90 days; stay inside that with margin.
    and c.created_at >  now() - interval '85 days'
  group by c.msclkid

  union all

  -- The money events. Only uploadable once the click id is known, and only while the
  -- original ad click is still inside Microsoft's 90-day window.
  select
    'Offline Conversion',
    b.msclkid,
    'offline_' || b.stage,
    to_char(b.occurred_at at time zone 'UTC', 'MM/DD/YYYY HH24:MI:SS'),
    coalesce(b.payout_usd, 0)::numeric,
    'USD'
  from public.broker_conversions b
  where b.msclkid is not null
    and b.occurred_at >= from_ts
    and b.occurred_at <  to_ts
    and exists (
      select 1 from public.affiliate_clicks c
      where c.msclkid = b.msclkid
        and c.created_at > now() - interval '85 days'
    )
  order by 4;
$$;

comment on function public.bing_offline_conversions is
  'Microsoft Advertising offline-conversion CSV rows for a time window. Server-side, so ad blockers cannot drop them.';
