# TOOLS.md - Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:
- Camera names and locations
- SSH hosts and aliases  
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Voice Messages

When KZ sends a voice message, first reply with:
```
You said: [transcript]
```
Then respond to the content in a follow-up message.

## Email — правила

- **Драфты по умолчанию:** Когда KZ просит подготовить ответ на email (или написать письмо) — это **всегда только драфт**, если он явно не говорит «отправляй». Показать текст, дождаться чёткого подтверждения («отправляй», «ок, шли») → только тогда отправлять.
- Никогда не отправлять email без явного подтверждения KZ.

---

Add whatever helps you do your job. This is your cheat sheet.

## Runtime Environment

- **Python:** 3.11.2 (`/usr/bin/python3`)
- **uv:** 0.10.4 (`/root/.local/bin/uv`) — для venvs и пакетов
- **exec policy:** `security=full`, `ask=off` — полный доступ к CLI без подтверждений (настроено в Docker entrypoint)

---

## GitHub — инфра-репо OpenClaw

- **Repo:** `https://github.com/callva-one/openclaw.git`
- **Token:** хранится в `openclaw.json` → `env.GITHUB_PAT`
- **Локальная копия:** `/tmp/openclaw-infra/` (не переживает рестарт контейнера)
- **Восстановление:** если `/tmp/openclaw-infra/` нет — склонировать:
  ```
  git clone https://${GITHUB_PAT}@github.com/callva-one/openclaw.git /tmp/openclaw-infra
  ```
- Используется только для референса, не для работы.

---

## Email (IMAP)

### konstantin@amanati.ai
- **Server:** mail.amanati.ai
- **Port:** 993 (TLS)
- **Username:** konstantin@amanati.ai
- **Password:** хранится в `openclaw.json` → `env.IMAP_PASSWORD_KONSTANTIN_AMANATI`
- **Protocol:** IMAP (Dovecot)

### konstantin@callva.one *(Google Workspace)*
- **Server:** imap.gmail.com
- **Port:** 993 (TLS)
- **Username:** konstantin@callva.one
- **Auth:** App Password
- **Password:** хранится в `openclaw.json` → `env.IMAP_PASSWORD_KONSTANTIN_CALLVA`
