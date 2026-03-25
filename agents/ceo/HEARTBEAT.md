# HEARTBEAT.md -- CEO Heartbeat Checklist

Run this checklist on every heartbeat. This covers both your local planning/memory work and your organizational coordination via the Paperclip skill.

## 1. Identity and Context

- `GET /api/agents/me` -- confirm your id, role, budget, chainOfCommand.
- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.

## 2. Local Planning Check

1. Read today's plan from `$AGENT_HOME/memory/YYYY-MM-DD.md` under "## Today's Plan".
2. Review each planned item: what's completed, what's blocked, and what up next.
3. For any blockers, resolve them yourself or escalate to the board.
4. If you're ahead, start on the next highest priority.
5. **Record progress updates** in the daily notes.

## 3. Approval Follow-Up

If `PAPERCLIP_APPROVAL_ID` is set:

- Review the approval and its linked issues.
- Close resolved issues or comment on what remains open.

## 4. Get Assignments

- `GET /api/companies/{companyId}/issues?assigneeAgentId={your-id}&status=todo,in_progress,blocked`
- Prioritize: `in_progress` first, then `todo`. Skip `blocked` unless you can unblock it.
- If there is already an active run on an `in_progress` task, just move on to the next thing.
- If `PAPERCLIP_TASK_ID` is set and assigned to you, prioritize that task.

## 5. Checkout and Work

- Always checkout before working: `POST /api/issues/{id}/checkout`.
- Never retry a 409 -- that task belongs to someone else.
- Do the work. Update status and comment when done.

## 6. Agent Health Check (Her Heartbeat)

Her çalışmada tüm ajanların sağlığını kontrol et:

```
GET /api/companies/{companyId}/agents
```

Her ajan için:
- `lastHeartbeatAt` → beklenen interval'ın 2 katından uzun süredir sessizse sorunlu say
- `status: "running"` ama `lastHeartbeatAt` çok eskiyse → stale, araştır
- Beklenen interval'lar: SEO/FE/Ads/Growth = 30dk | Analytics = 6s | Reporter = 24s | Content = 7gün

Sorunlu ajan için:
1. Ajanın üzerindeki görevleri kontrol et (`status=in_progress`)
2. `in_progress` + `checkoutRunId` var ama 2x interval geçtiyse → `PATCH status=todo` ile sıfırla
3. `runtimeConfig.heartbeat.enabled` kapalıysa → aç
4. Sorun devam ederse board'a bildir

## 7. Delegation

- Create subtasks with `POST /api/companies/{companyId}/issues`. Always set `parentId` and `goalId`.
- Use `paperclip-create-agent` skill when hiring new agents.
- Assign work to the right agent for the job.

## 7. Fact Extraction

1. Check for new conversations since last extraction.
2. Extract durable facts to the relevant entity in `$AGENT_HOME/life/` (PARA).
3. Update `$AGENT_HOME/memory/YYYY-MM-DD.md` with timeline entries.
4. Update access metadata (timestamp, access_count) for any referenced facts.

## 8. Refresh Telegram Report Cache

On every heartbeat, update the issues cache so cron reports have fresh data:

```python
python3 -c "
import json, os, requests
API = os.environ['PAPERCLIP_API_URL']
KEY = os.environ['PAPERCLIP_API_KEY']
CID = os.environ['PAPERCLIP_COMPANY_ID']
headers = {'Authorization': f'Bearer {KEY}'}
cache = {}
for status in ['done', 'in_progress', 'todo', 'blocked']:
    r = requests.get(f'{API}/api/companies/{CID}/issues', params={'status': status}, headers=headers, timeout=10)
    if r.status_code == 200:
        cache[status] = [{'identifier': i['identifier'], 'title': i['title']} for i in r.json()]
with open('agents/ceo/memory/issues_cache.json', 'w') as f:
    json.dump(cache, f, indent=2, ensure_ascii=False)
"
```

## 9. Exit

- Comment on any in_progress work before exiting.
- If no assignments and no valid mention-handoff, exit cleanly.

---

## CEO Responsibilities

- **Strategic direction**: Set goals and priorities aligned with the company mission.
- **Hiring**: Spin up new agents when capacity is needed.
- **Unblocking**: Escalate or resolve blockers for reports.
- **Budget awareness**: Above 80% spend, focus only on critical tasks.
- **Never look for unassigned work** -- only work on what is assigned to you.
- **Never cancel cross-team tasks** -- reassign to the relevant manager with a comment.

## Rules

- Always use the Paperclip skill for coordination.
- Always include `X-Paperclip-Run-Id` header on mutating API calls.
- Comment in concise markdown: status line + bullets + links.
- Self-assign via checkout only when explicitly @-mentioned.
