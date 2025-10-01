# Executive Dashboard — Frontend Assignment

A small React + Vite app that fulfills the assignment requirements:

- Build a dashboard from a dynamic JSON (catalog) of widgets grouped by categories.
- Add/remove widgets to categories.
- Search across all widgets.
- Each widget can be a chart (bar/line/pie) or text.
- Chart widgets are dynamic: press **Shuffle** to randomize values to simulate live data.
- Local state persisted to **localStorage**.
- Uses **Redux Toolkit** for local state management and **Recharts** for charts.

## Quick Start

```bash
# 1) Install deps (Node 18+ recommended)
npm install

# 2) Start dev server
npm run dev
# open the printed localhost URL
```

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
frontend-dashboard-assignment/
├─ index.html
├─ vite.config.js
├─ package.json
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ store.js
│  ├─ widgetsSlice.js
│  ├─ data/
│  │  └─ seed.json
│  └─ components/
│     ├─ SearchBar.jsx
│     ├─ Category.jsx
│     ├─ WidgetCard.jsx
│     └─ charts/
│        ├─ BarChartCard.jsx
│        ├─ LineChartCard.jsx
│        └─ PieChartCard.jsx
```

## Notes

- You can create a new widget in the catalog (choose type: bar/line/pie/note), then add it into any category.
- Remove a widget from a category via the **✕** button on that widget.
- **Reset** clears state and restores the initial seed.
- All data is mocked and lives only in the browser for assignment purposes.
- Styling is custom CSS (no Tailwind required).
```

