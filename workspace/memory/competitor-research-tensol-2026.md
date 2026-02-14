# Исследование конкурентов: Tensol.ai и AyclawBots
**Дата:** 2026-02-13

---

## 1. Tensol.ai — Глубокий анализ

### 1.1 Продукт
**Позиционирование:** "Hire AI Employees for Your Business" — AI-сотрудники на базе OpenClaw, работающие 24/7 в изолированных sandbox-ах.

**Что делают:**
- Разворачивают AI-агентов (называют "AI employees"), которые подключаются к рабочим инструментам компании через OAuth
- Каждый агент живёт в отдельной изолированной VM
- Агенты проактивные — не ждут промптов, а сами мониторят и действуют

**Основные use cases / шаблоны (10+ готовых templates):**
- **Customer Support Employee** — мониторит Slack, GitHub, CRM; отвечает клиентам, подтягивает контекст, эскалирует баги
- **Engineering Employee** — следит за Sentry, CI/CD, Linear; находит root cause ошибок, может написать фикс через Claude Code и создать PR
- **SDR/Sales Employee** — обогащает лиды, обновляет CRM, пишет follow-up'ы, постит контент в LinkedIn/X
- **Marketing Employee** — управляет LinkedIn/X присутствием, пишет посты, мониторит engagement

**Интеграции (50+):** Slack, GitHub, Sentry, Linear, HubSpot, Gmail, Notion, Jira, Salesforce, Datadog, PagerDuty, Mixpanel и 40+ других.

**Каналы общения с агентом:** WhatsApp, Slack, Telegram.

### 1.2 Pricing
- **Free trial:** 3 дня, бесплатно
- **Точная цена за агента:** Не указана публично на сайте (pricing page = 404)
- **Оценка по рынку:** Статья на Substack упоминает "hundreds to thousands a month" за AI-агента. По индустрии — $300-$1000/мес за агента типично
- **Модель:** Скорее всего per AI employee / per month + возможно usage-based компонент (LLM токены)
- Для enterprise — отдельные условия (founders@tensol.ai)

### 1.3 Технология
- **Построен на OpenClaw** (open-source, 46k+ GitHub stars, создан Peter Steinberger)
- **Что добавили сверху:**
  - Managed deployment — zero-config, без терминала/Docker/DevOps
  - VM isolation per customer (выделенная VM для каждого клиента)
  - OAuth 2.0 интеграции (one-click подключение инструментов)
  - Credential management — безопасное хранение ключей
  - Audit trail — полный лог всех действий AI
  - SSO, guardrails, RBAC
  - GDPR/CCPA compliance
  - 256-bit encryption, hosted на AWS, 99.9% uptime SLA
  - Templates — готовые конфигурации для быстрого старта
  - Multi-agent — агенты могут работать вместе и делиться контекстом
- **GitHub организация:** github.com/Solstis-AI (6 followers)

### 1.4 YC и Фаундеры
- **Батч:** Y Combinator W26 (Winter 2026)
- **Бэкеры:** YC + Afore VC
- **Сколько подняли:** Стандартный YC deal ($500K за 7%) + возможно Afore VC (pre-seed). Точная сумма не раскрыта
- **Фаундеры:**
  - **Oliviero Pinotti** (Co-Founder) — repeat founder, бизнес-бэкграунд. Ранее построил Workflows продукт в Stacksync (YC W24), используется Fortune 500. LinkedIn: linkedin.com/in/olivieropinotti
  - **Pratik Savla** (Co-Founder) — mechanical engineer → AI engineer, Carnegie Mellon. Опыт в Rivian и Magna International
- Оба — self-taught программисты из нетрадиционных tech-бэкграундов

### 1.5 Маркетинг и каналы
- **Twitter/X:** @tensol_ai — 697 followers. Позиционирование "AI Employees for Startups, built on OpenClaw"
- **LinkedIn:** linkedin.com/company/tensolai
- **YouTube:** Есть видео "Tensol (YC W26) - AI Employees for Your Company, built on OpenClaw" (опубликовано 11 Feb 2026)
- **YC Launch Page:** ycombinator.com/launches/PQ9 — стандартный YC launch
- **Product Hunt:** Не найден
- **Контент-стратегия:**
  - Оседлали хайп OpenClaw (46k+ stars) — "built on OpenClaw" в каждом заголовке
  - YC badge как social proof
  - Demo-видео на YouTube
  - Активно пушат через YC network
  - Упоминаются в Substack-статьях о монетизации OpenClaw
  - Cal.com для букинга демо (cal.com/tensol-founders/30min)

### 1.6 Клиенты
- **Публичные кейсы:** Не найдены
- **Отзывы:** Не найдены (очень ранняя стадия — запустились ~11 Feb 2026)
- **Количество клиентов:** Неизвестно, скорее всего единицы-десятки (только что запустились)

### 1.7 Конкурентные преимущества (USP)
1. **OpenClaw** — строят на самом хайповом open-source AI agent (46k+ stars)
2. **Проактивность** — агенты не ждут промптов, сами действуют
3. **Zero-config deployment** — 5 минут до первого агента
4. **VM isolation** — enterprise-grade security out of the box
5. **Multi-agent collaboration** — агенты делятся контекстом
6. **YC W26 badge** — strong social proof для стартапов
7. **50+ интеграций** через OAuth — не надо ничего кодить

### 1.8 Слабые стороны
1. **Очень ранняя стадия** — буквально только запустились, нет публичных кейсов
2. **Pricing непрозрачен** — нет публичной страницы с ценами
3. **Зависимость от OpenClaw** — если OpenClaw изменит лицензию или направление, риск
4. **Высокая стоимость LLM токенов** — OpenClaw жрёт много токенов (по статье — $250+ только на setup)
5. **Конкуренция растёт** — много компаний уже строят на OpenClaw
6. **Нет Product Hunt launch** — упущенный канал
7. **Маленькая аудитория** — 697 followers в Twitter
8. **Security concerns** — OpenClaw имеет доступ к файлам, API ключам, что вызывает опасения (CSO Online статья)

---

## 2. AyclawBots (ayclawbots.com)

### 2.1 Продукт
- **Позиционирование:** "Enterprise OpenClaw Orchestration"
- **Сайт:** ayclawbots.com — крайне минималистичный, по сути лендинг с заголовком
- **Практически нулевая информация публично** — сайт не содержит деталей о продукте
- **Отличие от Tensol:** Фокус на "enterprise orchestration" (vs. Tensol = "AI employees for startups")
- Никаких подробностей о функционале, интеграциях, use cases

### 2.2 Pricing
- Не указан. Сайт не содержит информации о ценах

### 2.3 Каналы продвижения
- **Нулевое присутствие** — не найден ни в одном поисковом результате
- Нет Twitter/X, LinkedIn, YouTube, Product Hunt, блога
- Нет упоминаний в медиа
- **Вывод:** Либо крайне ранняя стадия (pre-launch), либо проект заброшен, либо это side-project

---

## 3. Другие конкуренты в пространстве "AI employees / managed OpenClaw"

### 3.1 Molty by Finna (molty.finna.ai)
- **Позиционирование:** "Your AI Assistant, On Every Channel" — 24/7 AI employee
- **Функции:** Email management, scheduling, research, document drafting, voice notes
- **Уникальное:** "Claw Gym" — 30-дневный курс обучения бота
- **Hosted OpenClaw** с VM isolation, E2E encryption
- Free trial, no credit card required
- Более consumer/prosumer ориентирован vs. Tensol (B2B)

### 3.2 Clawery (clawery.com)
- **Позиционирование:** "Clawdbot AKA OpenClaw for Enterprise"
- Перестраивает концепции OpenClaw (channels, memory, skills, MCP, workspace) как managed enterprise сервис
- Security-first подход

### 3.3 DigitalOcean
- **1-Click OpenClaw Deploy** — hardened security image
- Не SaaS, а инфраструктура для self-hosting

### 3.4 Общий ландшафт
- IBM + Anthropic — работают над enterprise AI agent архитектурой с MCP
- Множество IaaS провайдеров (Contabo, DO) предлагают 1-click deploy OpenClaw
- OpenClaw сам остаётся бесплатным open-source hobby project (Peter Steinberger)

---

## 4. Анализ рынка

### Размер рынка
- AI agents market оценивается в **$100-$5,000/мес per company** (WebFX, 2026)
- Conversational AI platforms: $100-$300/мес для малых deployments, тысячи для enterprise
- Рынок быстро растёт — OpenClaw набрал 145k+ GitHub stars за 2 месяца
- B2B use cases — основной источник монетизации (бизнес готов платить сотни-тысячи в месяц)

### Что работает в маркетинге
1. **Riding the OpenClaw wave** — любое упоминание OpenClaw привлекает внимание
2. **YC badge** — мгновенный social proof
3. **"AI employee" framing** — понятная метафора для бизнеса (vs. "AI agent")
4. **Demo videos** — показать, а не рассказать
5. **Free trial** — снижает барьер входа
6. **Content marketing** — упоминания в Substack, блогах о монетизации OpenClaw
7. **Enterprise security narrative** — VM isolation, audit logs, compliance

### Ключевые вызовы рынка
- **Стоимость токенов** — OpenClaw очень затратен ($250+ на setup, сотни/мес на работу)
- **Security** — CSO Online и WIRED пишут о рисках (AI с доступом к файлам, ключам, кредиткам)
- **Зависимость от upstream** — OpenClaw = hobby project одного человека
- **Дифференциация** — все строят примерно одно и то же на OpenClaw

---

## Резюме

| | Tensol.ai | AyclawBots | Molty by Finna | Clawery |
|---|---|---|---|---|
| Стадия | YC W26, только запуск | Pre-launch / неизвестно | Активен | Активен |
| Фокус | B2B startups | Enterprise (?) | Prosumer | Enterprise |
| На базе OpenClaw | ✅ | ✅ (предположительно) | ✅ | ✅ (переработан) |
| Pricing | ~$300+/мес (оценка) | Неизвестен | Free trial | Неизвестен |
| Интеграции | 50+ | ? | Несколько | ? |
| YC | W26 ✅ | Нет | Нет | Нет |
| Social proof | YC, Afore VC | Нет | Нет | Нет |

**Tensol — явный лидер** в этом пространстве по momentum: YC бэкинг, наиболее полный продукт, сильное позиционирование. Но очень ранняя стадия. AyclawBots — практически пустой сайт, не стоит рассматривать как серьёзного конкурента на данный момент.
