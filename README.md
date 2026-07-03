# 💰 FinTrackr

A private, installable shared finance tracker for two people. No accounts, no subscriptions, no ads. Your data stays in your browser.

---

## Features

- **Bills & Subscriptions** — Track recurring expenses with due dates, categories, auto-pay status, and who pays
- **Accounts & Balances** — Checking, savings, credit cards, cash, investments — manually updated net worth
- **Savings Goals** — Visual progress bars with target dates and custom icons
- **Income Tracking** — Both earners, all frequencies, combined monthly summary
- **Dashboard** — Net worth hero, monthly cashflow bar, bills due this week, goal snapshots
- **Export / Import** — JSON backup so you can share data or restore on another device
- **PWA Install** — Installable on phone and desktop, works fully offline

---

## Setup (GitHub Pages — 5 minutes)

1. Create a new GitHub repo (e.g. `fintrackr`)
2. Drop these 4 files into it:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon.svg`
3. Go to **Settings → Pages → Source: main branch → / (root)**
4. Visit `https://yourusername.github.io/fintrackr/`
5. On mobile, tap **Share → Add to Home Screen** to install it as an app

---

## First Time Setup

1. Tap ⚙️ in the top right
2. Enter both your names under **Household Members** and hit Save
3. Start adding accounts, bills, goals, and income

---

## Sharing Data With Your Partner

Since data is stored locally per-browser, use the Export/Import flow to sync:

1. One person hits **Export** (Settings → Data Backup) — downloads a `.json` file
2. Send it via iMessage, email, AirDrop, etc.
3. Other person hits **Import** and loads the file

> **Tip:** Do a quick export once a week after any big update so you're both current.

---

## File Structure

```
fintrackr/
├── index.html      ← Entire app (HTML + CSS + JS)
├── manifest.json   ← PWA install metadata
├── sw.js           ← Service worker (offline support)
└── icon.svg        ← App icon
```

---

## Roadmap Ideas (Future)

- [ ] Firebase Firestore real-time sync (you already have this from the wedding gallery)
- [ ] Transaction log per account
- [ ] Monthly budget categories
- [ ] Bill paid/unpaid toggle with history
- [ ] Net worth over time chart

---

*Built as a single-file PWA. No frameworks, no build steps, no backend required.*
