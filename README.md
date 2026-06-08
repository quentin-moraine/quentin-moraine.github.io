# Portfolio — Quentin Moraine

Site statique (HTML / CSS / JS, sans framework). Thème « sunset cream », contenu réel du CV.
Étudiant ingénieur généraliste (Icam) · futur MSc Robotics (Cranfield) · en recherche de stage dès juin 2026.

## Structure

```
.
├── index.html              # Accueil (hero, projets, process, playground, compétences, à propos, CTA)
├── style.css               # Design system complet (thème sunset crème)
├── script.js               # Interactions (curseur, reveals, parallaxe, nav île, playground 3D…)
├── ROADMAP.md              # Suivi du projet (à faire / fait / améliorations)
├── assets/                 # CV, favicon, image Open Graph, vignettes
└── pages/
    ├── contact/            # Coordonnées + formulaire Formspree
    ├── tri-vis/            # Projet : Tri Automatique de Vis
    └── data-finance/       # Projet : Analyse de Données Financières
```

## ⚙️ Code source & build (minifié / obfusqué)

Les fichiers servis à la racine (`index.html`, `style.css`, `script.js`, `pages/**`)
sont **minifiés et obfusqués**. Les **sources lisibles** vivent dans **`src/`** (ignoré par git → non publié).

> ⚠️ `src/` n'est PAS dans le dépôt : **sauvegarde-le** (disque externe / dépôt privé). C'est ta vraie source éditable.

**Pour modifier le site :**
```bash
# 1. éditer les fichiers dans src/  (jamais les fichiers minifiés de la racine)
# 2. régénérer les fichiers servis :
npm install        # une seule fois
npm run build      # src/ → racine (minifié + obfusqué)
# 3. publier
git add -A && git commit -m "..." && git push
```

## Développement local

```bash
npx serve .
# puis ouvrir http://localhost:3000
```

## Déploiement (GitHub Pages)

Voir la section « Mise en ligne » ci-dessous / les instructions fournies.
Tout fonctionne aussi bien à la racine d'un domaine qu'en sous-dossier (chemins relatifs).

## À compléter

- [ ] ID Formspree dans `pages/contact/index.html` (`VOTRE_ID_FORMSPREE`)
- [ ] URLs LinkedIn / GitHub réelles (dans toutes les pages)
- [ ] Vraies photos (remplacer les blocs « Visuel à venir » et les vignettes `assets/thumb-*.png`)
