# Jackson D. Puzey — Personal Site

Flat structure on purpose: every file sits at the top level, no folders.
GitHub's web uploader flattens folders, so this layout survives it.

## Publishing

1. Unzip.
2. In your repo: **Add file → Upload files**.
3. Select **all** the files and drag them in together.
4. Commit to the default branch.
5. **Settings → Pages →** Source: *Deploy from a branch* → your default branch → `/ (root)`.

## Files

- `index.html` — the page
- `site.css` — styles
- `site.js` — language toggle + deck viewer
- `hero-bosco.jpg`, `liberazione.jpg`, `bocconi.jpg`, `duomo.jpg` — photographs
- `deck-<name>-NN.jpg` — presentation slides, loaded only when a deck is opened
- `Jackson_Puzey_Resume.pdf`

## Updating

Upload the changed file with the same name; it overwrites. Pages redeploys
automatically.

If you add or remove deck slides, update that deck's `count` in `site.js`.
