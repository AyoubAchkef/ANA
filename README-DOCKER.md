# 🐳 ANA Platform - Docker Setup

Guide pour lancer le projet ANA Platform avec Docker en quelques commandes.

## 📋 Prérequis

- [Docker](https://docs.docker.com/get-docker/) installé sur votre machine
- [Docker Compose](https://docs.docker.com/compose/install/) (inclus avec Docker Desktop)

## 🚀 Lancement rapide

### Option 1 : Avec Docker Compose (Recommandé)

La méthode la plus simple pour lancer le projet :

```bash
# Construire et lancer le conteneur
docker-compose up --build

# Ou en mode détaché (background)
docker-compose up -d --build
```

L'application sera accessible sur **http://localhost:3000**

### Option 2 : Avec Docker uniquement

Si vous préférez utiliser Docker directement :

```bash
# 1. Construire l'image Docker
docker build -t ana-platform .

# 2. Lancer le conteneur
docker run -p 3000:3000 ana-platform
```

L'application sera accessible sur **http://localhost:3000**

## 🛠️ Commandes utiles

### Arrêter le conteneur

```bash
# Avec Docker Compose
docker-compose down

# Avec Docker
docker stop ana-platform
```

### Voir les logs

```bash
# Avec Docker Compose
docker-compose logs -f

# Avec Docker
docker logs -f ana-platform
```

### Reconstruire après modifications

```bash
# Avec Docker Compose
docker-compose up --build

# Avec Docker
docker build -t ana-platform . && docker run -p 3000:3000 ana-platform
```

### Nettoyer les ressources Docker

```bash
# Arrêter et supprimer les conteneurs
docker-compose down

# Supprimer l'image
docker rmi ana-platform

# Nettoyer tous les conteneurs et images inutilisés
docker system prune -a
```

## 📦 Structure Docker

Le projet utilise un **multi-stage build** optimisé :

1. **deps** : Installation des dépendances
2. **builder** : Build de l'application Next.js
3. **runner** : Image de production légère (Alpine Linux)

### Fichiers Docker créés

- `Dockerfile` : Configuration pour construire l'image Docker
- `.dockerignore` : Fichiers à exclure du build Docker
- `docker-compose.yml` : Configuration Docker Compose
- `next.config.ts` : Modifié avec `output: 'standalone'` pour Docker

## 🔧 Configuration avancée

### Variables d'environnement

Pour ajouter des variables d'environnement :

1. Créez un fichier `.env.production` :

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

2. Modifiez `docker-compose.yml` :

```yaml
services:
  ana-app:
    env_file:
      - .env.production
```

### Changer le port

Pour utiliser un port différent (ex: 8080) :

**Dans docker-compose.yml :**
```yaml
ports:
  - '8080:3000'
```

**Ou avec Docker :**
```bash
docker run -p 8080:3000 ana-platform
```

L'application sera accessible sur **http://localhost:8080**

## 🐛 Dépannage

### Port déjà utilisé

Si le port 3000 est déjà utilisé :

```bash
# Trouver le processus utilisant le port
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000

# Ou changez le port dans docker-compose.yml
```

### Build échoue

```bash
# Nettoyer le cache Docker
docker builder prune

# Reconstruire sans cache
docker-compose build --no-cache
```

### L'application ne démarre pas

```bash
# Vérifier les logs
docker-compose logs -f

# Vérifier que le conteneur tourne
docker ps

# Reconstruire depuis zéro
docker-compose down
docker-compose up --build
```

## 📚 Ressources

- [Documentation Next.js Docker](https://nextjs.org/docs/deployment#docker-image)
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Docker Compose](https://docs.docker.com/compose/)

## ✨ Fonctionnalités

Cette configuration Docker inclut :

- ✅ Multi-stage build pour images optimisées (~150MB au lieu de ~1GB)
- ✅ Alpine Linux pour une taille minimale
- ✅ Standalone output Next.js
- ✅ Non-root user pour la sécurité
- ✅ Production-ready

---

**Note :** Cette configuration est optimisée pour la **production**. Pour le développement, utilisez plutôt `npm run dev` directement.
