# 🌅 Portfolio Quentin Moraine — Suivi de projet

> Fichier de pilotage. Mis à jour au fil de l'eau.
> Légende : ✅ fait · 🔄 en cours · ⬜ à faire · 💡 idée / nice-to-have

Dernière mise à jour : **2026-06-07**

---

## 📊 État global

| Zone | Statut | Note |
|---|---|---|
| Structure HTML (home + page projet) | ✅ | Template projet réutilisable en place |
| Design system (couleurs, typo, variables) | ✅ | Thème **crème** + contrastes AA corrigés |
| Interactions JS (curseur, magnétique, reveal, loader) | ✅ | Fonctionnel |
| Contenu réel (textes, projets, contact) | ✅ | Intégré depuis le CV — restent : Formspree ID, URLs réseaux, vraies photos |
| Pages projets (tri-vis, data-finance) | ✅ | Créées ; `charging-case` fictive supprimée |
| Page contact | ✅ | Coordonnées + formulaire Formspree + honeypot |
| Favicon + Open Graph | ✅ | favicon, apple-touch-icon, og-image 1200×630 |
| Modèle 3D Three.js | ⬜ | Hook prévu, scène à brancher (optionnel) |
| Déploiement (GitHub Pages) | ✅ | **En ligne** : https://quentin-moraine.github.io/ |
| Accessibilité (focus, curseur, contraste, reduced-motion) | ✅ | Passe a11y complet |

---

## 🔄 En cours

- _(rien en cours — prochaine étape : contenu réel & pages manquantes)_

---

## ⬜ À faire (priorité haute)

1. ✅ **Contenu réel intégré depuis le CV** : identité, accroche, stats (TOEIC 950, Icam 4ᵉ, MSc Cranfield), compétences, projets, contact, badge « recherche de stage juin 2026 »
2. ✅ **`pages/contact/index.html`** créée : coordonnées directes (email, tél, localisation) + formulaire Formspree + honeypot anti-spam
3. ✅ **Pages projets réelles** créées depuis le template : `pages/tri-vis/` & `pages/data-finance/` (l'ancienne `charging-case` fictive a été supprimée)
4. ✅ **Vignettes de preview** générées (`assets/thumb-tri-vis.png`, `thumb-data-finance.png`) — placeholders gradient propres, à remplacer par de vraies photos
5. ✅ **Favicon + Open Graph** : `favicon.png`, `apple-touch-icon.png`, `og-image.png` (1200×630) + balises OG/Twitter sur toutes les pages

### ⚠️ Reste à compléter par toi (placeholders restants)
- ✅ **Formulaire contact** : passé en email direct (mailto pré-rempli) — fonctionnel sans backend. _Option future : Formspree pour recevoir les messages sans ouvrir l'appli mail._
- ✅ **URLs LinkedIn / GitHub** : profils réels (`in/quentin-moraine-7a44022b5`, `github.com/quentin-moraine`) sur toutes les pages
- ✅ **Tri de vis** : croquis, diagramme pieuvre, Gantt, détections YOLO, training, confusion — visuels réels intégrés
- ✅ **Finanza (data-finance)** : 4 captures réelles de l'app (dashboard, transactions, catégories, annuel) sur **données de démo anonymisées** — stack corrigée Next.js (au lieu de Python/C++)
- ⬜ **CAO / RFID** : compléter avec de vraies photos/captures quand dispo
- ⚠️ **CV à corriger PAR TOI** (impossible par programme sans casser la mise en page Canva) : dans la ligne « Outil Python et C++ de suivi et d'analyse de données financières », remplacer **« Python et C++ » → « Next.js / TypeScript »**. ⚠️ NE PAS toucher la ligne « Apprentissage du C++ en autonomie » (elle est juste). À faire dans ton éditeur de CV (Canva/Word) puis ré-exporter le PDF dans `assets/CV-Quentin-Moraine.pdf`.
- ✅ **CV** : le vrai PDF est en place (`assets/CV-Quentin-Moraine.pdf`)
- ✅ **Déploiement** : en ligne sur https://quentin-moraine.github.io/

---

## 🔐 Sécurité & robustesse

> Site statique → surface d'attaque faible, mais quelques points pro à couvrir :

- 🔄 **SRI (Subresource Integrity)** : impossible sur l'importmap Three.js (non supporté par la spec) et peu fiable sur la CSS Google Fonts (varie selon le navigateur). Version Three.js épinglée (`@0.160.0`) + note ajoutée dans la page projet. ✅ **Vraie solution = self-host** (voir dernier point).
- ✅ **Content-Security-Policy** : balise `<meta http-equiv="Content-Security-Policy">` sur toutes les pages (sources verrouillées : self, fonts Google, unpkg, Formspree). _Note : `'unsafe-inline'` requis pour les styles inline + le chargement non-bloquant des fonts ; pour une CSP stricte (nonces/hash), passer par des headers réels via Netlify/Cloudflare._
- ✅ **`rel="noopener noreferrer"`** ajouté sur tous les liens sociaux `target="_blank"` (home + page projet)
- ⬜ **Pas de secret côté client** : à respecter lors de la création du formulaire contact → service type Formspree/Web3Forms (déjà autorisé dans la CSP `form-action`)
- ✅ **`referrerpolicy`** : `no-referrer` sur les liens fonts + `<meta name="referrer" content="strict-origin-when-cross-origin">` global
- 💡 Héberger les fonts + Three.js en local (woff2 / module) plutôt que via CDN → perf + RGPD + permet enfin un vrai SRI
- ✅ **Propriété / « anti-vol »** : `LICENSE` propriétaire (© tous droits réservés, copie/réutilisation interdites) = la vraie protection (juridique). + dissuasion technique : clic droit & raccourcis devtools désactivés, message console. ⚠️ **Important** : le front-end (HTML/CSS/JS) reste TOUJOURS lisible par le navigateur — aucun site ne peut empêcher ça ; les blocages sont seulement dissuasifs et contournables. Pour rendre le code illisible : minifier/obfusquer (optionnel, nécessite une étape de build).

---

## ♿ Accessibilité (a11y)

- ✅ **Contraste** : texte principal `#1C1714`, secondaire `#6E5D49` sur crème → WCAG AA
- ✅ **`prefers-reduced-motion`** : coupe grain, orbes, marquee, reveals, curseur custom, parallaxe + compteurs
- ✅ **Curseur custom** : désormais limité aux souris fines (`@media hover/pointer`) → curseur natif sur tactile/clavier
- ✅ **Focus visible** : styles `:focus-visible` nets (contour sunset) sur liens, boutons, champs, cartes projet
- ✅ **`alt` descriptifs** : images de contenu (tri-vis, Finanza) avec alt parlants ; décoratives en `alt=""`
- ✅ **Navigation clavier** : focus visible + fermeture menu mobile (Escape)
- ✅ **`aria-label`** : hamburger, sections ; liens sociaux explicites
- 💡 Reste : audit complet lecteur d'écran (NVDA/VoiceOver) si besoin

---

## ⚡ Performance

> Section traitée le 2026-06-07. ✅ = appliqué dans le code · ⬜ = dépend des vrais assets / à faire à la fin

- ✅ **Images — attributs anti-CLS** : `width`/`height` explicites + `loading="lazy"` + `decoding="async"` sur toutes les `<img>` de contenu et les previews projets → réserve la place, charge à la demande
- ✅ **Images — format WebP** : tous les visuels de contenu convertis en `.webp` (qualité 82) → **−68 %** (3,6 Mo → 1,2 Mo). Favicon/OG/apple-touch gardés en PNG (compat sociale).
- ✅ **Vidéos** : `preload="metadata"` + `poster` + dimensions sur les `<video>` → pas de téléchargement complet avant lecture, pas de layout shift
- ⬜ **Vidéos — encodage** : compresser les vrais fichiers (H.264/H.265, bitrate maîtrisé) une fois fournis
- ✅ **Fonts — non-bloquantes** : chargement Google Fonts en `media="print" onload` + `<noscript>` fallback → supprime la requête bloquante au rendu (le loader masque tout flash). `display=swap` déjà actif.
- 💡 **Fonts — self-host** : héberger les `.woff2` en local + `<link rel="preload">` (perf maximale + RGPD, pas d'appel à Google qui logge l'IP). À faire si tu obtiens les fichiers.
- ✅ **Grain — coût CPU** : animation **figée sur mobile** (`max-width:768px`) et **désactivée** en `prefers-reduced-motion` → économie CPU/batterie
- ✅ **`prefers-reduced-motion`** : bloc global qui coupe grain, orbes, marquee, reveals, curseur custom et réduit les transitions → moins de calcul + accessibilité
- ⬜ **Open Graph / favicon** : ajouter l'image de partage (impacte le ressenti, pas le score Lighthouse)
- 💡 **Lighthouse** : viser 95+ sur les 4 catégories avant déploiement (à mesurer une fois les vrais assets en place)

---

## 🎨 Design & lisibilité — axes d'amélioration

### Lisibilité
- ✅ **Hiérarchie typographique** : un seul `.section-heading` par section + sous-titre calme `.section-sub`
- ✅ **Largeur de ligne** : utilitaire `.measure` (max-width 38em) appliqué aux corps de texte
- ✅ **Interligne** : 1.6–1.8 sur le corps (conservé)
- ✅ **Contraste sur crème** : texte principal `#1C1714`, secondaire `#6E5D49` (AA)

### Taste pass (skills `Leonxlnx/taste-skill`) — appliqué le 2026-06-07
- ✅ **Police body Inter → Outfit** (Inter bannie par les skills ; Outfit reste sur Google Fonts → CSP OK) sur les 4 pages
- ✅ **`text-wrap: balance`** sur les titres, **`pretty`** sur les paragraphes (anti-orphelins)
- ✅ **Chiffres tabulaires** (`tabular-nums`) sur stats, années projet et méta
- ✅ **Ombres teintées chaudes** (plus de noir pur) sur boutons et cartes au survol
- ✅ **Profondeur ambiante** (lueur radiale discrète) sur les sections Projets & Compétences
- ✅ **Largeur maîtrisée** (`max-width: 1500px` centré) pour éviter l'edge-to-edge sur grands écrans
- ✅ **Flèche-dans-un-cercle** (button-in-button) sur les CTA forts (hero, CTA, formulaire contact)
- ✅ **Cartes à relief** (highlight lumineux en haut, façon hardware) sur le bento Compétences/Process/Stats
- ✅ **Nav « île flottante »** : se détache, s'arrondit et prend une ombre au scroll (morph fluide cubic-bezier)
- ✅ **Barre de progression de scroll** (gradient sunset, en haut, injectée par JS)
- ✅ **Parallaxe douce** des orbes au scroll (propriété `translate`, composée avec l'animation, désactivée en reduced-motion)
- ✅ **Souligné animé** sur les liens de nav · **icônes affinées** (stroke 1.25)
- 💡 Reste possible (gros morceau) : motion **GSAP** au scroll (pinning, scrub, stacking de cartes) — nécessiterait d'ajouter la lib GSAP

### Design / « instagrammable »
- ✅ **Fond crème / blanc cassé** au lieu du noir
- ✅ **Photos grand format** : showcases pleine largeur (tri-vis, Finanza)
- ✅ **Micro-animations sur les chiffres** : compteur count-up sur stats & KPIs (à l'apparition, respecte reduced-motion)
- ✅ **Curseur** : label « Voir → » au survol des projets, « Projet → » sur le bloc suivant
- ✅ **Navigation** : lien **Compétences** ajouté (desktop + mobile + pages projets)
- ⬜ **Plus de respiration** : marges encore plus généreuses (optionnel)
- ⬜ **Cohérence des coins** : rayon unique (optionnel)
- ✅ **Transition entre pages** : voile sunset (avec « QM ») qui balaie à chaque navigation interne — effet « app » premium (désactivé en reduced-motion)
- ✅ **Mode sombre** : toggle dans la nav (lune/soleil), variables de thème, init sans flash, persistance localStorage + `prefers-color-scheme`. Crème reste le défaut.

---

## 🧩 Idées contenu

- ✅ Section « Process » illustrée (croquis → CAO → impression → produit) — 4 étapes + flèches de liaison
- 🔄 Témoignages / encadrants — section codée (`.testi-*` dans le CSS) mais **retirée de la home** faute de vrais retours. À réactiver quand tu auras des recommandations réelles (Icam/Cranfield). En attendant, remplacée par une section **Compétences** (données réelles du CV).
- ✅ CV téléchargeable (PDF) — boutons dans la nav, le menu mobile et la section À propos (PDF placeholder dans `assets/`, à remplacer par le vrai)
- ✅ Petit « playground » 3D interactif en page d'accueil — cube CSS glisser-pour-tourner + auto-rotation + inertie (zéro dépendance)
- 💡 Section « Process » illustrée avec de **vraies photos** (croquis scannés, captures CAO, time-lapse impression)
- 💡 Micro-compteur animé sur les stats (3+, 12, MSc)

---

## 🚀 Déploiement

- ⬜ Repo GitHub + GitHub Pages (`/` ou `/docs`)
- ⬜ Domaine custom (ex. `quentinmoraine.com`)
- ⬜ Vérifier les chemins relatifs (`../../`) une fois en ligne
- 💡 Alternative Netlify/Vercel → headers de sécurité + formulaires gérés

---

## ✅ Fait

- ✅ Structure home complète (hero, marquee, projets, about, CTA, footer)
- ✅ Template de page projet (`pages/charging-case/`)
- ✅ Loader animé avec barre de progression
- ✅ Curseur custom (anneau + point avec lag)
- ✅ Boutons magnétiques
- ✅ Scroll reveals (IntersectionObserver)
- ✅ Nav glassmorphism au scroll
- ✅ Menu mobile plein écran
- ✅ Grain texture animée
- ✅ Marquee défilant infini
- ✅ Pivot thème **crème / blanc cassé** (fond chaud, gradient sunset conservé)
- ✅ Correction contrastes / ton-sur-ton (texte secondaire AA, texte blanc sur boutons gradient, labels lisibles)
- ✅ Optimisations performance : lazy-load + dimensions images, vidéos `preload=metadata`, fonts non-bloquantes, grain allégé mobile, `prefers-reduced-motion`
- ✅ Sections home : Process (4 étapes), Playground 3D (cube interactif), Témoignages (3 cartes)
- ✅ CV téléchargeable (boutons nav + menu mobile + À propos) + PDF placeholder
- ✅ Lisibilité : `.measure` (largeur de ligne), `.section-sub` (sous-titres calmes)
- ✅ Sécurité : CSP, `referrerpolicy`/meta referrer, `noopener noreferrer` sur liens externes, note SRI Three.js
- ✅ Contenu réel du CV partout (identité, stats, compétences, projets, contact)
- ✅ Page contact (mailto/tel + formulaire Formspree + honeypot anti-spam)
- ✅ Pages projets réelles : Tri Automatique de Vis + Analyse de Données Financières
- ✅ Favicon, apple-touch-icon, image Open Graph (partage social) + balises OG/Twitter
- ✅ Section Compétences (remplace les témoignages fictifs) + badge « recherche de stage »
