/**
 * Build : src/ (lisible) → racine (servi), minifié + obfusqué.
 *  - JS  : javascript-obfuscator (illisible mais fonctionnel)
 *  - CSS : clean-css (minifié)
 *  - HTML: html-minifier-terser (collapse, minifie le CSS/JS inline)
 *
 * Usage : npm run build
 * NB : les sources lisibles vivent dans src/ (hors dépôt public via .gitignore).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier-terser';
import JavaScriptObfuscator from 'javascript-obfuscator';

const banner = `/* © 2026 Quentin Moraine — Tous droits réservés. Code protégé, copie interdite. */\n`;

// ---- JS : obfuscation (réglages modérés = illisible mais fiable & rapide) ----
const js = readFileSync('src/script.js', 'utf8');
const obf = JavaScriptObfuscator.obfuscate(js, {
  compact: true,
  controlFlowFlattening: false,      // off = plus fiable / rapide
  deadCodeInjection: false,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  identifierNamesGenerator: 'mangled',
  numbersToExpressions: true,
  simplify: true,
  selfDefending: false,              // off = pas de casse si reformaté
  disableConsoleOutput: false,       // on garde notre message console ©
}).getObfuscatedCode();
writeFileSync('script.js', banner + obf);
console.log('JS  obfusqué  →', (banner + obf).length, 'o');

// ---- CSS : minification ----
const css = readFileSync('src/style.css', 'utf8');
const outCss = new CleanCSS({ level: 2 }).minify(css);
if (outCss.errors.length) { console.error(outCss.errors); process.exit(1); }
writeFileSync('style.css', banner + outCss.styles);
console.log('CSS minifié   →', outCss.styles.length, 'o');

// ---- HTML : minification (toutes les pages) ----
const htmlOpts = {
  collapseWhitespace: true,
  removeComments: true,
  conservativeCollapse: false,
  minifyCSS: true,
  minifyJS: true,
  removeRedundantAttributes: false,
  keepClosingSlash: true,
  ignoreCustomComments: [],
};
for await (const file of glob('src/**/*.html')) {
  const src = readFileSync(file, 'utf8');
  const out = await minifyHtml(src, htmlOpts);
  const dest = file.replace(/^src\//, '');
  writeFileSync(dest, out);
  console.log('HTML minifié  →', dest, `(${out.length} o)`);
}
console.log('\n✅ Build terminé.');
