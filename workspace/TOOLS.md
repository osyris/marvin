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

OpenClaw автоматически отправляет транскрипцию голосового перед ответом (echoTranscript: true). Дублировать транскрипт в ответе не нужно — просто отвечай по содержанию.

## Email — правила

- **Драфты по умолчанию:** Когда KZ просит подготовить ответ на email (или написать письмо) — это **всегда только драфт**, если он явно не говорит «отправляй». Показать текст, дождаться чёткого подтверждения («отправляй», «ок, шли») → только тогда отправлять.
- Никогда не отправлять email без явного подтверждения KZ.
- **Сноска AI:** Всегда добавлять перед подписью строку: *«See kiri on koostatud AI-assistendi Marvin poolt Konstantini juhiste alusel.»* (или на языке письма — см. ниже). Ставить до «Parimat» / «Kind regards» / «С уважением».
  - Эстонский: `See kiri on koostatud AI-assistendi Marvin poolt Konstantini juhiste alusel.`
  - Английский: `This email was drafted by AI assistant Marvin on Konstantin's instructions.`
  - Русский: `Это письмо составлено AI-ассистентом Марвин по инструкции Константина.`

### Подпись konstantin@amanati.ai
```
Parimat,
--
Konstantin Zilin
"I supercharge businesses with AI" 🚀
konstantin@amanati.ai
+372 52 58 198
```
Использовать эту подпись всегда для писем с этого ящика.

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
