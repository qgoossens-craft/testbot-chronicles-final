# Claude Code Prompt - Intégration Lecteur Radio Lo-Fi Astro

## Contexte
J'ai un blog Astro (framework) avec du contenu en Markdown dans `src/content/blog/`. Je veux ajouter un lecteur de radio lo-fi discret et élégant pour créer une ambiance de lecture, en utilisant des flux radio légaux.

## Structure du projet
```
testbot-chronicles-final/
├── src/
│   ├── components/
│   ├── content/blog/
│   ├── layouts/
│   └── pages/blog/[...slug].astro
├── public/
│   └── images/
├── astro.config.mjs
└── package.json (Astro + Tailwind)
```

## Objectifs
1. **Mini-player flottant** en bas à droite de l'écran
2. **Sélection de stations radio lo-fi** (3-5 stations populaires)
3. **Persiste entre les pages** du blog
4. **Design minimaliste** avec Tailwind CSS
5. **Contrôles basiques** : play/pause, changement de station, volume
6. **UX respectueuse** : pas d'autoplay, contrôles discrets

## Spécifications techniques
- **Tech stack** : Astro + Web Audio API + Tailwind CSS
- **Source audio** : APIs radio lo-fi légales (Radio-Browser API, stations publiques)
- **Stations suggérées** :
  - LoFi Girl (YouTube Live stream)
  - ChillHop Radio
  - Chill Jazz Radio
  - Ambient Study Radio
- **Responsive** : Fonctionne sur mobile et desktop
- **Performance** : Léger, streaming direct
- **Accessibilité** : Contrôles keyboard-friendly

## APIs recommandées
```javascript
// Radio-Browser API (gratuite, open source)
// http://all.api.radio-browser.info/json/stations/search?tag=lofi

// Stations directes connues :
const lofiStations = [
  {
    name: "LoFi Hip Hop Radio",
    url: "https://www.youtube.com/watch?v=jfKfPfyJRdk", // Stream URL
    genre: "Lo-Fi Hip Hop"
  },
  {
    name: "ChillHop Radio",
    url: "https://streams.fluxfm.de/Chillhop/mp3-320/",
    genre: "Chill Hop"
  }
];
```

## Fonctionnalités demandées
- [ ] Icône vinyl qui tourne pendant la lecture
- [ ] Sélecteur de stations lo-fi
- [ ] Volume persistant (localStorage)
- [ ] Indicateur de statut "live radio"
- [ ] Animation smooth pour les transitions
- [ ] Mode "focus" (peut être masqué temporairement)
- [ ] Gestion des erreurs de connexion
- [ ] Fallback si une station est offline

## Contraintes
- **Légal** : Utilise uniquement des flux radio légaux/publics
- Compatible avec le build statique d'Astro
- Utilise uniquement Tailwind pour le styling
- Pas de jQuery ou frameworks lourds
- Gestion CORS pour les APIs radio
- Respecte les bonnes pratiques web modernes

Peux-tu créer cette solution complète et fonctionnelle ?