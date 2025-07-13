# 🚀 Déploiement Netlify + Domaine One.com

## ✅ Restauration effectuée
- Pages admin restaurées
- Configuration serveur remise
- Workflow Netlify créé

## 🌐 Configuration Netlify

### Étape 1 : Créer un compte Netlify
1. Va sur https://netlify.com
2. Connecte-toi avec ton compte GitHub
3. Clique "New site from Git"
4. Sélectionne ton repository `testbot-chronicles-final`

### Étape 2 : Configuration du build
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

### Étape 3 : Variables d'environnement Netlify
Dans ton dashboard Netlify → Site settings → Environment variables :
- Ajoute toutes tes variables `.env` si nécessaire

### Étape 4 : Récupérer les tokens pour GitHub
1. **Netlify Auth Token** :
   - Netlify Dashboard → User settings → Applications → Personal access tokens
   - Generate new token → Copie le token

2. **Netlify Site ID** :
   - Ton site Netlify → Site settings → General → Site details
   - Copie le "Site ID"

### Étape 5 : Ajouter les secrets GitHub
Dans ton repo GitHub → Settings → Secrets and variables → Actions :
- `NETLIFY_AUTH_TOKEN` : ton token d'accès
- `NETLIFY_SITE_ID` : l'ID de ton site

## 🔗 Configurer ton domaine One.com

### Option A : Redirection (Simple)
1. Dans ton panneau One.com
2. Redirection → Ajouter une redirection
3. De : `titusconsulting.be` → Vers : `ton-site.netlify.app`

### Option B : DNS personnalisé (Avancé)
1. Dans Netlify : Domain settings → Add custom domain → `titusconsulting.be`
2. Netlify te donnera des serveurs DNS
3. Dans One.com : Change les DNS vers ceux de Netlify

## 🎯 Avantages Netlify
- ✅ Supporte ton admin SSR
- ✅ HTTPS automatique
- ✅ CDN mondial
- ✅ Déploiement automatique GitHub
- ✅ Formulaires gérés
- ✅ Functions serverless

## 🚀 Test local
```bash
npm run dev
# Visite http://localhost:4321/admin pour tester l'admin
```

## 📝 Prochaines étapes
1. Push ce commit vers GitHub
2. Configurer Netlify avec ton repo
3. Récupérer les tokens et les mettre dans GitHub Secrets
4. Configurer ton domaine
