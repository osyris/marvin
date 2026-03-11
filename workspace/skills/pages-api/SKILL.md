---
name: pages_api
description: Create dynamic API endpoints for interactive pages - handle form submissions, data updates, and real-time interactions
metadata: {"openclaw": {"always": true}}
---

# Pages API

You can create dynamic backend endpoints that interactive pages can call. This enables forms, toggles, real-time data, and any server-side logic your pages need.

## How it works

1. Create JavaScript handler files in `/data/workspace/pages-api/`
2. Each file exports a function that registers routes using an Express-like API
3. Endpoints become available at `https://{domain}/pages-api/`
4. Routes hot-reload automatically when files change - no restart needed

## Handler file format

Each `.js` or `.cjs` file exports a setup function:

```javascript
// /data/workspace/pages-api/my-feature.js
const fs = require('fs');
const path = require('path');

module.exports = function(app, ctx) {
    // GET endpoint
    app.get('/items', (req, res) => {
        const data = ctx.readJSON('pages/items.json') || [];
        res.json(data);
    });

    // POST endpoint
    app.post('/items', (req, res) => {
        const items = ctx.readJSON('pages/items.json') || [];
        items.push(req.body);
        ctx.writeJSON('pages/items.json', items);
        res.json({ ok: true, count: items.length });
    });

    // URL parameters
    app.get('/items/:id', (req, res) => {
        const items = ctx.readJSON('pages/items.json') || [];
        const item = items.find(i => i.id === req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    });

    // PUT/PATCH/DELETE also supported
    app.delete('/items/:id', (req, res) => {
        let items = ctx.readJSON('pages/items.json') || [];
        items = items.filter(i => i.id !== req.params.id);
        ctx.writeJSON('pages/items.json', items);
        res.json({ ok: true });
    });
};
```

## Request object (req)

- `req.method` - HTTP method (GET, POST, etc.)
- `req.pathname` - URL path (without /pages-api prefix)
- `req.query` - Query string parameters as object
- `req.params` - URL path parameters (from `:param` patterns)
- `req.body` - Parsed request body (JSON or form-encoded)
- `req.headers` - HTTP headers

## Response object (res)

- `res.json(data)` - Send JSON response
- `res.send(data)` - Send text or auto-detect JSON
- `res.html(data)` - Send HTML response
- `res.status(code)` - Set status code (chainable)
- `res.setHeader(name, value)` - Set response header
- `res.end(data)` - End response with raw data

## Context object (ctx)

The second argument provides workspace helpers:

- `ctx.readJSON(path)` - Read and parse JSON from workspace (relative to /data/workspace/)
- `ctx.writeJSON(path, data)` - Write JSON to workspace (creates directories)
- `ctx.readFile(path)` - Read text file from workspace
- `ctx.writeFile(path, content)` - Write text file to workspace
- `ctx.workspaceDir` - Absolute path to workspace root
- `ctx.dataDir` - Absolute path to pages directory

## Calling from pages

From your HTML pages, call the API using fetch:

```html
<script>
// GET request
const response = await fetch('/pages-api/items');
const data = await response.json();

// POST request
await fetch('/pages-api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: '1', name: 'Example' })
});
</script>
```

## Directory structure

```
/data/workspace/pages-api/
├── movies.js           → handles /pages-api/movies/*
├── voting.js           → handles /pages-api/voting/*
├── dashboard-data.js   → handles /pages-api/dashboard-data/*
└── forms.js            → handles /pages-api/forms/*
```

## Guidelines

1. **Create the directory first** if it doesn't exist:
   ```bash
   mkdir -p /data/workspace/pages-api
   ```

2. **One file per feature** - keep related endpoints together

3. **Store data in workspace** - use `ctx.readJSON()` / `ctx.writeJSON()` for persistence. Store data files under `/data/workspace/pages/` alongside the pages that use them, or under a `/data/workspace/data/` directory for shared data

4. **No auth by default** - endpoints are public like static pages. If you need protected endpoints, check for auth headers in your handler

5. **CORS enabled** - pages from any origin can call the API (useful for embedded widgets)

6. **Hot reload** - changes take effect within 1 second, no restart needed

7. **Error handling** - wrap handler logic in try/catch; unhandled errors return 500 automatically

## Example: Interactive toggle

Page (`/data/workspace/pages/movie-list/index.html`):
```html
<button onclick="toggle('movie-1')">Toggle Watched</button>
<script>
async function toggle(id) {
    const res = await fetch('/pages-api/movies/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });
    const data = await res.json();
    // Update UI based on response
}
</script>
```

Handler (`/data/workspace/pages-api/movies.js`):
```javascript
module.exports = function(app, ctx) {
    app.post('/movies/toggle', (req, res) => {
        const movies = ctx.readJSON('pages/movie-list/movies.json') || [];
        const movie = movies.find(m => m.id === req.body.id);
        if (movie) {
            movie.watched = !movie.watched;
            ctx.writeJSON('pages/movie-list/movies.json', movies);
        }
        res.json({ ok: true, movies });
    });

    app.get('/movies', (req, res) => {
        const movies = ctx.readJSON('pages/movie-list/movies.json') || [];
        res.json(movies);
    });
};
```
