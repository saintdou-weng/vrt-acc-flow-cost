# VRT ACC + Factory Map v1.3.0

Upload these public files to the root of `saintdou-weng/vrt-acc-flow-cost`:

- `index.html`
- `factory-map.html`
- the complete `factory-map-assets/` folder

Keep the folder name and paths unchanged. The accounting page links to
`factory-map.html`, and the map loads its optimized technical drawings from
`factory-map-assets/` only when needed.

Do **not** upload the private `.gs` file to GitHub. Replace the code in the
existing Apps Script project with `VRT_ACC_FLOW_COST_READY_v1.3.0.gs`, update
the existing Web app deployment to a new version, and run `INSTALL_NOW()` once.
The existing Web app URL stays unchanged.

Factory Map admin password: `1111`.

Large attachments are split into 4 MiB chunks and stored under the existing
VRT Google Drive cloud folder. The current client accepts up to 1 GiB per file;
actual available capacity follows the Google Drive quota of the Apps Script
owner account.
