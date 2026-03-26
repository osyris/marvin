# Autonomous Dev Loop — концепция

*Записано: 2026-03-26, разговор на Bali*

## Суть

Постоянно работающий orchestrator, который забирает готовые задачи из центральной БД и запускает их в работу автономно. Человек (KZ) только добавляет задачи в backlog и реагирует на блокеры.

## Схема

```
KZ (Telegram/Marvin) → задача в БД → Orchestrator → routing → Pipeline → done в БД
                                                                    ↓
                                                              (если блокер → KZ)
```

## Компоненты

### 1. База данных (Supabase)
Таблица `features`:
- `id`, `title`, `description` (markdown)
- `status`: backlog → planning → ready → in_progress → blocked → done
- `complexity`: simple | complex | tbd
- `context_files`: []  — ссылки на файлы, которые нужны агенту
- `plan`: текст плана (заполняется в planning стадии)
- `blocked_reason`: текст блокера (если status = blocked)
- `agent_session`: ключ активной сессии
- `created_at`, `updated_at`

### 2. Orchestrator (cron каждую минуту или webhook)
- Проверяет: есть ли задачи со статусом `ready`
- Считает: сколько уже `in_progress` (лимит параллельности)
- Для каждой свободной задачи: запускает Complexity Assessor

### 3. Complexity Assessor Agent
Получает задачу + контекст проекта. Решает:
- **Simple**: одна имплементация, сразу тест → готово
- **Complex**: нужен полный pipeline (plan validation → decomposition → parallel agents → testing)

Устанавливает `complexity` в записи и запускает нужный pipeline.

### 4. Simple Pipeline
```
Implement → Test → Mark done
```

### 5. Complex Pipeline
```
Plan Validation (vs стандарты/паттерны)
    → Decomposition (frontend agent, backend agent, etc.)
    → Parallel implementation
    → Integration test
    → Mark done
```

### 6. Blocker Handler
Если любой агент встречает ambiguity / требует human decision:
- Пишет `blocked_reason` в запись
- Меняет статус на `blocked`
- Посылает уведомление KZ в Telegram

### 7. Watchdog
Cron каждые N минут: проверяет `in_progress` задачи которые не обновлялись > X минут → помечает как `stalled`, уведомляет KZ

## Роль Marvin (я)
- Принимаю задачи в разговоре (голос/текст)
- Создаю/обогащаю записи в БД
- Могу сам проверить статус pipeline: "что сейчас делается?"
- Принимаю блокеры и передаю решение обратно в pipeline

## Стек
- **БД**: Supabase (Postgres + realtime + REST API)
- **Orchestrator**: OpenClaw cron → sessions_spawn
- **Агенты**: Claude Code через ACP или isolated subagents
- **Frontend**: простой /app/ для просмотра backlog

## Открытые вопросы
- [ ] Как Claude Code получает задачу из Supabase (Python skill?)
- [ ] ACP vs subagent — что лучше для долгих сессий разработки
- [ ] Лимит параллельности (2-3 задачи?)
- [ ] Как context_files передаётся агенту надёжно
- [ ] Recovery: что если агент упал посередине?
