# VRT ACC + Factory Map v1.4.0

Upload these public files to the root of `saintdou-weng/vrt-acc-flow-cost`:

- `index.html`
- `factory-map.html`
- the complete `factory-map-assets/` folder

Keep the folder name and paths unchanged. The accounting page links to
`factory-map.html`, and the map loads its optimized technical drawings from
`factory-map-assets/` only when needed.

Do **not** upload the private `.gs` file to GitHub. Replace the code in the
existing Apps Script project with `VRT_ACC_FLOW_COST_READY_v1.4.0.gs`, update
the existing Web app deployment to a new version, and run `INSTALL_NOW()` once.
The existing Web app URL stays unchanged.

## v1.4.0 factory-expense behavior

- Factory Expense, WIP and FG are stored as three independent modules.
- One expense workbook can import every detected month. A later import merges
  by month and source group instead of deleting earlier months.
- Cloud upload and download merge period/module data; they do not replace the
  whole browser or cloud snapshot.
- The factory-expense page includes 2023–2026 productivity history, detailed
  payroll, direct labor, manufacturing overhead, time/capacity fields,
  comparisons, anomalies and a versioned BOM conversion-rate JSON connector.
- Daily/weekly views use actual dated detail only. Monthly expense figures are
  not spread into invented daily or weekly values.

Factory Map admin password: `1111`.

Large attachments are split into 4 MiB chunks and stored under the existing
VRT Google Drive cloud folder. The current client accepts up to 1 GiB per file;
actual available capacity follows the Google Drive quota of the Apps Script
owner account.
