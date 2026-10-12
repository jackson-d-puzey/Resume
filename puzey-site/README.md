# Jackson D. Puzey — Personal Site

Static site. No build step, no dependencies.

## Structure

```
index.html                  the page
assets/css/site.css         all styles
assets/js/site.js           language toggle + deck lightbox
assets/img/                 photographs
assets/decks/<name>/01.jpg  presentation slides (loaded only when opened)
assets/Jackson_Puzey_Resume.pdf
```

## Publishing to GitHub Pages

1. Create a repository on github.com (public).
2. Unzip this archive first. **Add file → Upload files**, then drag in
   `index.html`, the `assets` folder, and this README.

   **`index.html` must sit at the top level of the repository, not inside a
   folder.** If your repo shows `site/index.html` or `puzey-site/index.html`,
   GitHub Pages returns "does not contain the requested file". Drag the
   *contents* of the unzipped folder, not the folder itself.
3. Commit to `main`.
4. **Settings → Pages →** Source: *Deploy from a branch* → `main` → `/ (root)` → Save.
5. Live in about a minute at `https://<username>.github.io/<repo>`.

## Updating

Replace the file you changed and commit. Pages redeploys automatically.

- **Text** lives in `index.html`. Every translatable element carries both
  `data-en` and `data-it`. If you change English text, change the `data-en`
  attribute to match, or the toggle will revert your edit.
- **Photos** go in `assets/img/`. Keep the same filename to swap one out.
- **Slides** are numbered `01.jpg`, `02.jpg` … in each deck folder. If you add
  or remove slides, update the `count` for that deck in `assets/js/site.js`.

## Notes

- Initial page load is about 520 KB. The decks (11 MB) load only when a
  visitor opens one.
- `Cmd/Ctrl + P` prints a clean document — navigation, photos and buttons
  are hidden, dark sections print white.
