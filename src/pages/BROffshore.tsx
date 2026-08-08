import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ExternalLink, Shield, Zap, AlertTriangle, Award,
  Wallet, ArrowRight, ChevronDown, Clock, DollarSign, Gift, Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SEO from "@/components/SEO";
import BrokerLogo from "@/components/BrokerLogo";
import Logo from "@/components/Logo";
import { brokers, BrokerId, Broker } from "@/lib/brokers";
import { getAffiliateUrl, trackAffiliateClick, UTM_CONFIGS } from "@/lib/tracking";
import { subscribeNewsletter } from "@/lib/newsletterService";

/**
 * Dedicated PAID landing page for Bing Ads — Brazil (pt-BR), offshore/international intent.
 *
 * Why Brazil + these brokers (see geo research + plan): unlike the US /us funnel, the two
 * hard walls that killed /us are gone here — funding works via **Pix** (instant, zero fee,
 * near-universal in Brazil) so there is no crypto wall, and the leads are **regulated**
 * brokers (Exness, XM — FCA/CySEC/FSCA) rather than unregulated offshore, so the trust +
 * affiliate-payment risk is far lower. Bing is the only emerging-market search engine with
 * meaningful Brazil share (~8.5%), which is why the paid-Bing motion transfers here.
 *
 * Honest framing: Exness/XM are internationally regulated but NOT CVM-licensed in Brazil —
 * the copy says so plainly. Route variants: /br (both) and /br/:broker (ad-group specific).
 */

const CURRENT_YEAR = 2026;
const DEFAULT_ORDER: BrokerId[] = ["exness", "xm"];

/** Funding methods shown on the BR cards — Pix highlighted (the whole point). Hardcoded in
 *  pt-BR rather than read from broker.paymentMethods (which are English/US-oriented). */
const BR_FUNDING = ["Pix", "Cartão", "Boleto", "Transferência"];

/** pt-BR pros per broker — brokers.ts `pros` are English/US-oriented; a paid pt-BR page
 *  needs Portuguese. Falls back to the English pros for any broker not listed here. */
const BR_PROS: Partial<Record<BrokerId, string[]>> = {
  exness: [
    "Depósito e saque via Pix — instantâneo e sem taxa",
    "Regulada por FCA, CySEC, FSA e FSCA",
    "Spreads baixos e execução rápida",
  ],
  xm: [
    "Bônus de depósito e suporte em português",
    "Multi-regulada (CySEC, ASIC e outras)",
    "Depósito via Pix a partir de US$ 5",
  ],
};

/** Brazil-specific (pt) affiliate links — override the global brokers.ts links (which
 *  serve other markets, e.g. the XM link was Turkey-tagged) so /br traffic lands on the
 *  Portuguese onboarding with correct commission attribution. From the partner panels.
 *  XM routes through the same-origin /go/br-xm redirect (see public/_redirects) because
 *  its raw pipaffiliates.com URL is on ad-blocker lists — a direct href gets the whole
 *  button hidden. Exness (exnessonelink) isn't blocked, so it stays direct. */
const BR_AFFILIATE: Partial<Record<BrokerId, string>> = {
  exness: "https://one.exnessonelink.com/boarding/sign-up/a/c33epne0sj?lng=pt",
  xm: "/go/br-xm",
};

const fundBadge = (method: string) => {
  const isPix = method.toLowerCase() === "pix";
  return (
    <span
      key={method}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
        isPix ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
      }`}
    >
      {isPix && <Zap className="w-3 h-3" />}
      {method}
    </span>
  );
};

const OfferCard = ({ broker, rank }: { broker: Broker; rank: number }) => {
  const bonusLabel = broker.bonus;
  const cta = getAffiliateUrl(broker.id, { ...UTM_CONFIGS.BR_LP, content: broker.id }, BR_AFFILIATE[broker.id]);
  return (
    <div
      className={`bg-card border rounded-2xl overflow-hidden flex flex-col ${
        rank === 1 ? "border-primary ring-2 ring-primary/30" : "border-border"
      }`}
    >
      {rank === 1 && (
        <div className="bg-primary text-primary-foreground text-center text-xs font-semibold py-1.5 uppercase tracking-wide">
          Mais escolhida no Brasil
        </div>
      )}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrokerLogo broker={broker} className="w-12 h-12 rounded-xl" />
            <div>
              <h3 className="font-bold text-lg leading-tight">{broker.name}</h3>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> Desde {broker.foundedYear} · {CURRENT_YEAR - broker.foundedYear} anos
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">{broker.rating.toFixed(1)}</span>
            <span className="text-[10px] text-muted-foreground">de 5</span>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-muted/40 rounded-lg py-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground"><Zap className="w-3 h-3" /> Alavancagem</div>
            <div className="font-bold text-sm">{broker.leverage}</div>
          </div>
          <div className="bg-muted/40 rounded-lg py-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground"><DollarSign className="w-3 h-3" /> Mínimo</div>
            <div className="font-bold text-sm">{broker.minDepositDisplay}</div>
          </div>
          <div className="bg-muted/40 rounded-lg py-2">
            <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground"><Gift className="w-3 h-3" /> Bônus</div>
            <div className="font-bold text-sm text-primary">{bonusLabel || "—"}</div>
          </div>
        </div>

        {/* Funding methods — Pix highlighted */}
        <div>
          <div className="text-xs text-muted-foreground mb-1.5">Depósito para brasileiros:</div>
          <div className="flex flex-wrap gap-1.5">{BR_FUNDING.map(fundBadge)}</div>
        </div>

        {/* Top pros */}
        <ul className="space-y-1.5 flex-1">
          {(BR_PROS[broker.id] ?? broker.pros.slice(0, 3)).map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{pro}</span>
            </li>
          ))}
        </ul>

        <Button variant="hero" size="lg" className="w-full group" asChild>
          <a
            href={cta}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackAffiliateClick(broker.id, `br_lp_${broker.id}`, "open_account", "INTL")}
          >
            {bonusLabel ? "Abrir conta + bônus" : "Abrir conta"}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </Button>
        <p className="text-[11px] text-center text-muted-foreground -mt-1">
          Corretora internacional regulada · não licenciada pela CVM
        </p>
      </div>
    </div>
  );
};

const FUNDING_STEPS = [
  {
    icon: Wallet,
    title: "1. Abra sua conta grátis",
    body: "O cadastro leva cerca de 2 minutos: e-mail, dados básicos e verificação. Sem depósito mínimo alto — a partir de US$ 5–10.",
  },
  {
    icon: Zap,
    title: "2. Deposite via Pix — em segundos",
    body: "Na página de depósito da corretora, escolha Pix, gere o QR Code ou copia-e-cola e pague pelo seu banco. O saldo cai na hora, sem taxa e sem recusa de cartão. Boleto e cartão também disponíveis.",
  },
  {
    icon: Landmark,
    title: "3. Comece a operar",
    body: "Seu depósito (e qualquer bônus) aparece na conta de trading. Abra o MT4/MT5 e você está no mercado. Os saques voltam pelo mesmo caminho, normalmente em até 24h.",
  },
];

const FAQS = [
  {
    q: "É legal um brasileiro operar com essas corretoras?",
    a: "Operar forex/CFDs é permitido. A CVM não licencia corretoras de forex no Brasil, então brasileiros usam corretoras internacionais reguladas no exterior (FCA, CySEC, FSCA). Isso é prática comum e legal para o trader — o que muda é que você não tem a proteção regulatória da CVM. Opere apenas com dinheiro que você pode perder.",
  },
  {
    q: "Consigo depositar via Pix?",
    a: "Sim. Exness e XM aceitam Pix para depósito e saque — instantâneo e sem taxa. É o método mais rápido e confiável para brasileiros; não há a barreira de cartão recusado que existe em outros métodos. Boleto e transferência também funcionam.",
  },
  {
    q: "Essas corretoras são reguladas?",
    a: "Sim, internacionalmente. Exness é regulada por FCA (Reino Unido), CySEC (Chipre), FSA e FSCA; XM é multi-regulada (CySEC, ASIC e outras). Nenhuma tem licença da CVM no Brasil — nenhuma corretora de forex tem, porque a CVM não emite esse tipo de licença. Regulação estrangeira é o padrão para o trader brasileiro.",
  },
  {
    q: "Quanto tempo leva para sacar?",
    a: "Via Pix, os saques costumam ser processados em até 24h e caem direto na sua conta bancária. Faça sempre um primeiro saque pequeno para testar antes de depositar valores maiores.",
  },
  {
    q: "Com qual corretora devo começar?",
    a: "Exness é a preferida dos brasileiros pela combinação de Pix instantâneo, spreads baixos e saque rápido. A XM se destaca pelo bônus de depósito e pelo suporte em português. Compare as duas acima e escolha a que melhor se encaixa no seu perfil.",
  },
];

const BROffshore = ({ focusBroker }: { focusBroker?: BrokerId }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  const order = focusBroker
    ? [focusBroker, ...DEFAULT_ORDER.filter((b) => b !== focusBroker)]
    : DEFAULT_ORDER;
  const list = order.map((id) => brokers[id]).filter(Boolean) as Broker[];
  const lead = list[0];

  const leadCta = getAffiliateUrl(lead.id, { ...UTM_CONFIGS.BR_LP, content: `hero_${lead.id}` }, BR_AFFILIATE[lead.id]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg("");
    const res = await subscribeNewsletter(email, "br_lp");
    setEmailMsg(res.message);
    if (res.success && !res.alreadySubscribed) setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Melhores Corretoras de Forex para Brasileiros (2026) — Depósito via Pix"
        description="Brasileiros podem operar forex com corretoras internacionais reguladas e depósito via Pix instantâneo. Compare Exness e XM — alavancagem alta, bônus e passo a passo do depósito por Pix."
        canonical="/br"
        noindex
      />

      {/* Minimal branded bar — no full nav (paid LP) */}
      <header className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="BeginnerFXGuide home">
            <Logo variant="default" size="md" />
          </Link>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Independente · Atualizado 2026
          </span>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
              <Award className="w-4 h-4" /> 🇧🇷 Aceita brasileiros · Depósito via Pix
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              As Melhores Corretoras de Forex para Brasileiros em 2026
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Alavancagem alta, bônus de depósito e corretoras reguladas internacionalmente — com depósito via Pix.
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8">
              Depósito instantâneo pelo Pix, sem taxa e sem cartão recusado. Mostramos o passo a passo completo.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a
                href={leadCta}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => trackAffiliateClick(lead.id, "br_lp_hero", "open_account", "INTL")}
              >
                Começar com {lead.name} {lead.bonus ? `— bônus ${lead.bonus}` : ""}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Depósito mínimo baixo</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Pix instantâneo, sem taxa</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Saques em ~24h</span>
            </div>
          </div>
        </section>

        {/* Broker offer cards */}
        <section className="py-10 md:py-14">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              {focusBroker ? `${lead.name} e as melhores alternativas` : "As melhores corretoras para brasileiros"}
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Reguladas internacionalmente, com depósito via Pix e suporte em português. Compare e escolha.
            </p>
            <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
              {list.map((broker, i) => (
                <OfferCard key={broker.id} broker={broker} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* How to fund with Pix — the section that fixes the FTD drop */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Como depositar via Pix — em 3 passos</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                O Pix cai na hora, sem taxa e sem recusa de cartão. Todo o processo leva poucos minutos.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {FUNDING_STEPS.map((step) => (
                <Card key={step.title} className="p-6">
                  <step.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="hero" size="lg" asChild>
                <a
                  href={leadCta}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={() => trackAffiliateClick(lead.id, "br_lp_funding", "open_account", "INTL")}
                >
                  Abrir conta na {lead.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust + honesty block */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Por que brasileiros escolhem corretoras internacionais</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <AdvantagesBlock />
              </Card>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" /> O lado honesto
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Essas corretoras são reguladas no exterior (FCA, CySEC, FSCA), mas <strong>não têm
                  licença da CVM no Brasil</strong> — nenhuma corretora de forex tem. A alavancagem alta
                  aumenta tanto os ganhos quanto as perdas: um movimento pequeno contra você pode zerar
                  uma conta muito alavancada. Opere apenas com dinheiro que você pode perder e comece com
                  um depósito pequeno para testar depósito e saque antes de aportar mais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Email capture → nurture */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Grátis: Guia de Depósito via Pix (PDF)</h2>
            <p className="text-muted-foreground mb-5 text-sm">
              Passo a passo com imagens de como depositar por Pix, mais qual corretora combina com o seu perfil.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
              />
              <Button type="submit" variant="hero">Quero o guia</Button>
            </form>
            {emailMsg && <p className="text-sm text-muted-foreground mt-3">{emailMsg}</p>}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Perguntas frequentes</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <Card key={i} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 hover:bg-muted/50 transition-colors flex items-start justify-between gap-4"
                  >
                    <h3 className="font-semibold pr-4">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <div className="px-5 pb-5"><p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p></div>}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-muted-foreground mb-7 max-w-xl mx-auto">
              Abra sua conta em minutos, deposite via Pix e comece a operar hoje.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a
                href={leadCta}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => trackAffiliateClick(lead.id, "br_lp_final", "open_account", "INTL")}
              >
                Abrir conta na {lead.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      {/* Minimal footer — required for ad policy */}
      <footer className="border-t border-border py-8">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed max-w-3xl mx-auto">
            <strong>Aviso de risco:</strong> operar forex e CFDs com alavancagem envolve alto risco. Entre
            74–89% das contas de investidores de varejo perdem dinheiro. As corretoras listadas são reguladas
            no exterior e não possuem licença da CVM no Brasil. A BeginnerFXGuide pode receber comissão quando
            você abre uma conta pelos nossos links, sem custo para você. Isso nunca influencia nossas avaliações.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <Link to="/legal/affiliate-disclosure" className="hover:text-primary">Divulgação de Afiliados</Link>
            <Link to="/legal/privacy" className="hover:text-primary">Privacidade</Link>
            <Link to="/legal/disclaimer" className="hover:text-primary">Aviso de Risco</Link>
            <Link to="/contact" className="hover:text-primary">Contato</Link>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-md border-t border-border">
        <Button variant="hero" size="lg" className="w-full" asChild>
          <a
            href={getAffiliateUrl(lead.id, { ...UTM_CONFIGS.BR_LP_STICKY, content: lead.id }, BR_AFFILIATE[lead.id])}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackAffiliateClick(lead.id, "br_lp_sticky", "open_account", "INTL")}
          >
            Abrir {lead.name} {lead.bonus ? `· ${lead.bonus}` : ""}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

/** Advantages block kept out of the main return for readability. */
const AdvantagesBlock = () => (
  <>
    <h3 className="font-semibold text-lg mb-3">Alavancagem e bônus maiores</h3>
    <ul className="space-y-2.5 text-sm">
      {[
        "Alavancagem de 1:500 a 1:2000 — muito acima do que a maioria das opções locais oferece.",
        "Bônus de depósito e cashback que corretoras locais não oferecem.",
        "Depósito e saque via Pix, instantâneo e sem taxa.",
        "MT4/MT5 com spreads baixos a partir de 0.0 pips e suporte em português.",
      ].map((t, i) => (
        <li key={i} className="flex items-start gap-2">
          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{t}</span>
        </li>
      ))}
    </ul>
  </>
);

export default BROffshore;
