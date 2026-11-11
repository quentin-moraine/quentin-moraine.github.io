/**
 * Build : src/ (lisible) -> racine (servi), minifie.
 *  - JS   : terser (tous les src/*.js)
 *  - CSS  : clean-css (tous les src/*.css)
 *  - HTML : html-minifier-terser (toutes les pages de src/)
 *
 * Usage : npm run build
 * NB : les sources vivent dans src/ (hors depot public via .gitignore).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, basename } from 'node:path';
import { glob } from 'node:fs/promises';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier-terser';
import { minify as minifyJs } from 'terser';

const banner = `/* (c) 2026 Quentin Moraine */\n`;

// ---- JS ----
for await (const file of glob('src/*.js')) {
  const js = await minifyJs(readFileSync(file, 'utf8'));
  writeFileSync(basename(file), banner + js.code);
  console.log('JS   ->', basename(file), `(${js.code.length} o)`);
}

// ---- CSS ----
for await (const file of glob('src/*.css')) {
  const out = new CleanCSS({ level: 2 }).minify(readFileSync(file, 'utf8'));
  if (out.errors.length) { console.error(out.errors); process.exit(1); }
  writeFileSync(basename(file), banner + out.styles);
  console.log('CSS  ->', basename(file), `(${out.styles.length} o)`);
}

// ---- HTML ----
const htmlOpts = {
  collapseWhitespace: true,
  removeComments: true,
  conservativeCollapse: false,
  minifyCSS: true,
  minifyJS: true,
  removeRedundantAttributes: false,
  keepClosingSlash: true,
};
for await (const file of glob('src/**/*.html')) {
  const out = await minifyHtml(readFileSync(file, 'utf8'), htmlOpts);
  const dest = file.replace(/^src\//, '');
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, out);
  console.log('HTML ->', dest, `(${out.length} o)`);
}
console.log('\nBuild termine.');
