# 🚀 Configuration Déploiement One.com + GitHub

## État actuel
✅ Workflow GitHub Actions créé (`.github/workflows/deploy.yml`)  
✅ Script de génération des clés SSH créé (`setup-onecom-deploy.bat`)

## 📋 Étapes à suivre

### 1. Génération des clés SSH
```bash
# Exécuter le script dans le répertoire du projet
./setup-onecom-deploy.bat
```

### 2. Configuration GitHub Secrets
Aller dans votre repo GitHub → Settings → Secrets and variables → Actions

Ajouter ces 3 secrets :
- `ONE_DOMAIN_NAME` : votre-domaine.com (ex: monsite.com)
- `ONE_SSH_KEY_PRIVATE` : contenu complet de la clé privée
- `ONE_SSH_KEY_PUBLIC` : contenu complet de la clé publique

### 3. Configuration One.com

#### 3.1 Activer SSH
1. Connectez-vous au panneau de contrôle One.com
2. Allez dans "Avancé" → "SSH/SFTP"  
3. Activez SSH (vous recevrez un email pour créer un mot de passe SSH)

#### 3.2 Ajouter la clé publique
```bash
# Se connecter en SSH à votre hébergement
ssh votre-domaine.com@ssh.votre-domaine.com

# Créer le dossier .ssh s'il n'existe pas
mkdir -p ~/.ssh

# Créer/éditer le fichier authorized_keys
nano ~/.ssh/authorized_keys

# Coller votre clé publique (contenu de onecom_deploy_key.pub)
# Sauvegarder et quitter

# Définir les bonnes permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### 4. Test du déploiement

#### 4.1 Push vers GitHub
```bash
git add .
git commit -m "Setup One.com deployment"
git push origin main
```

#### 4.2 Vérification
- Allez dans l'onglet "Actions" de votre repo GitHub
- Vérifiez que le workflow s'exécute sans erreur
- Votre site devrait être mis à jour automatiquement sur One.com

## 🔧 Configuration avancée

### Variables d'environnement disponibles
- `TPO_SRC_PATH` : Dossier source (actuellement "dist/" pour Astro)
- `TPO_PATH` : Dossier destination sur One.com (vide = racine)

### Personnalisation du déclenchement
Le workflow se déclenche actuellement sur :
- Push vers la branche `main`
- Déclenchement manuel

Pour modifier, éditez `.github/workflows/deploy.yml`

## 🚨 Sécurité

### Nettoyage après configuration
```bash
# Supprimer les fichiers de clés locaux après configuration
rm onecom_deploy_key onecom_deploy_key.pub setup-onecom-deploy.bat
```

### Bonnes pratiques
- Ne jamais commiter les clés SSH dans le repo
- Utiliser des secrets GitHub pour stocker les informations sensibles
- Tester le déploiement sur une branche de test d'abord

## 📞 Support
En cas de problème :
1. Vérifiez les logs dans l'onglet Actions de GitHub
2. Testez la connexion SSH manuellement
3. Vérifiez que les secrets GitHub sont correctement configurés
