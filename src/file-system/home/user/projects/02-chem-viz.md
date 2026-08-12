



## *CHEM-VIZ*
## 2026

### • Django REST, React, Pandas
### • PyQt5, PostgreSQL
Built solo as the screening deliverable for a FOSSEE internship at IIT Bombay. It is a chemical equipment parameter visualiser that runs as both a web app and a desktop app.

You upload a CSV of equipment name, type, flowrate, pressure and temperature. A Django REST backend parses it with Pandas, then a React web client and a PyQt5 desktop client both render KPI cards, bar and line charts, sortable tables, the last five datasets, and a branded PDF export.

The interesting constraint was feature parity. One shared REST API serves both frontends, with token auth and dataset ownership across them, but the web side draws with Chart.js and jsPDF while the desktop side uses Matplotlib and ReportLab.

Deployed as a trifecta: React on Vercel, Django plus PostgreSQL on Render, and a Windows .exe published to GitHub Releases by a tag-triggered PyInstaller workflow.

https://fossee-web.vercel.app
