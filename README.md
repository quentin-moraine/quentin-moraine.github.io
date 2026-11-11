# Portfolio — Quentin Moraine

Site statique (HTML / CSS / JS, sans framework).
Étudiant ingénieur en robotique, double diplôme ECAM Arts et Métiers / MSc Robotics (Cranfield), en recherche de stage dès mai 2027.

## Structure

```
.
├── index.html              # Accueil (hero, projets, compétences, parcours, à propos)
├── style.css               # Base, navigation, accueil
├── project.css             # Pages projet et contact
├── script.js               # Thème clair / sombre, langue EN / FR, menu mobile, formulaire
├── ROADMAP.md              # Suivi du projet
├── assets/                 # CV, favicon, image Open Graph, polices, portrait
└── pages/
    ├── contact/            # Coordonnées + formulaire (ouvre l'application mail)
    ├── tri-vis/            # Projet : machine de tri de vis par vision
    ├── abb-robotstudio/    # Projet : cellule de dessin ABB IRB 120
    ├── robotic-control/    # Projet : cellule de soudure UR3 et UR10e (en cours)
    └── yotaq/              # Projet : robot sumo Yotaq
```

## Code source et build

Les fichiers servis à la racine (`index.html`, `style.css`, `script.js`, `pages/**`)
sont **minifiés**. Les **sources lisibles** vivent dans **`src/`** (ignoré par git → non publié).

> ⚠️ `src/` n'est PAS dans le dépôt : **sauvegarde-le** (disque externe / dépôt privé). C'est ta vraie source éditable.

**Pour modifier le site :**
```bash
# 1. éditer les fichiers dans src/  (jamais les fichiers minifiés de la racine)
# 2. régénérer les fichiers servis :
npm install        # une seule fois
npm run build      # src/ -> racine (minifié)
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

- [ ] Captures RobotStudio de la cellule de dessin
- [ ] Page Robotic Control : table DH, code et résultats après le dépôt de décembre 2026
