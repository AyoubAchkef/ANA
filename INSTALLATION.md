# 🚀 Installation Guide - ANA Platform

## Prérequis

- Node.js 18+ installé
- npm ou yarn ou pnpm

## Installation Rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

### 3. Ouvrir dans le navigateur

Ouvrir [http://localhost:3000](http://localhost:3000)

## 🎨 Personnalisation

### Couleurs

Modifier les couleurs dans [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  black: '#000000',
  white: '#FFFFFF',
  // Ajouter vos couleurs personnalisées
}
```

### Contenu

Modifier le contenu dans les composants dans [components/](components/)

### Animations

Les animations GSAP sont configurables dans chaque composant. Variables principales :

- `duration`: Durée de l'animation
- `ease`: Type d'easing
- `stagger`: Délai entre les éléments
- `scrollTrigger`: Configuration du déclenchement au scroll

## 📦 Build Production

```bash
npm run build
npm start
```

## 🐛 Dépannage

### Erreur "Module not found"

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Problème avec GSAP

Vérifier que GSAP et ses plugins sont bien installés:

```bash
npm list gsap
```

### Curseur custom ne s'affiche pas

Vérifier que JavaScript est activé dans le navigateur et que le composant CustomCursor est bien importé dans le layout.

## 🎯 Prochaines Étapes

1. **Personnaliser le contenu** - Remplacer le texte placeholder
2. **Ajouter vos images** - Placer dans le dossier `public/`
3. **Configurer les liens** - Mettre à jour les href dans Navigation et Footer
4. **Optimiser les animations** - Ajuster selon vos préférences
5. **Déployer** - Sur Vercel, Netlify, ou votre plateforme préférée

## 📝 Notes Importantes

- Le site utilise un **curseur custom** - désactivé sur mobile
- Le **smooth scroll** fonctionne mieux sur desktop
- Les **animations GSAP** sont optimisées pour 60 FPS
- Le site est **100% responsive**

Bon développement ! 🎉
