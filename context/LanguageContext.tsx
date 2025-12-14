'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.playNow': 'Play Now',

    // Menu
    'menu.open': 'Menu',
    'menu.close': 'Close',
    'menu.socials': 'Socials',
    'menu.home': 'Home',
    'menu.players': 'Players',
    'menu.courts': 'Courts',
    'menu.matches': 'Matches',
    'menu.contact': 'Contact',

    // Hero
    'hero.title1': 'FIND',
    'hero.title2': 'YOUR',
    'hero.title3': 'PADEL',
    'hero.title4': 'PARTNER',
    'hero.subtitle1': 'Find partners who match your level.',
    'hero.subtitle2': 'Challenge opponents near you.',
    'hero.subtitle3': 'Book courts in seconds.',
    'hero.subtitle4': 'Build your padel community.',
    'hero.findPlayers': 'Find Players',
    'hero.bookCourt': 'Book a Court',

    // Stats
    'stats.title': 'By The Numbers',
    'stats.subtitle': 'The padel community is growing every day',
    'stats.activePlayers': 'Active Players',
    'stats.matchesPlayed': 'Matches Played',
    'stats.successRate': 'Match Success Rate',
    'stats.partnerCourts': 'Partner Courts',

    // Features
    'features.title': 'Why Play With ANA',
    'features.smartMatching.title': 'Smart Matching',
    'features.smartMatching.description': 'Our algorithm finds players at your level. Whether beginner or pro, play with partners who match your style.',
    'features.smartMatching.keywords': 'Level-based,Intelligent,Fair',
    'features.groupFormation.title': 'Group Formation',
    'features.groupFormation.description': 'Missing a player? Create or join groups instantly. Never cancel a match because you are short one player.',
    'features.groupFormation.keywords': 'Flexible,Community,Quick',
    'features.courtBooking.title': 'Court Booking',
    'features.courtBooking.description': 'Find and reserve courts near you in seconds. Real-time availability across all partner locations.',
    'features.courtBooking.keywords': 'Easy,Instant,Nearby',
    'features.matchOrganization.title': 'Match Organization',
    'features.matchOrganization.description': 'Schedule matches, invite players, track scores, and build your padel reputation over time.',
    'features.matchOrganization.keywords': 'Organized,Social,Fun',

    // Testimonials
    'testimonials.title': 'Loved by Players',
    'testimonials.subtitle': 'See what our community says about playing with ANA',
    'testimonials.quote1': 'ANA changed how I play padel. Found my regular group in days. Now we play every week!',
    'testimonials.author1': 'Thomas Durand',
    'testimonials.role1': 'Intermediate Player',
    'testimonials.location1': 'Paris, France',
    'testimonials.quote2': 'No more cancelled matches. When someone drops out, I find a replacement in minutes.',
    'testimonials.author2': 'Sofia Martinez',
    'testimonials.role2': 'Advanced Player',
    'testimonials.location2': 'Barcelona, Spain',
    'testimonials.quote3': 'The court booking feature is a game-changer. I discover new clubs every month.',
    'testimonials.author3': 'Lucas Schmidt',
    'testimonials.role3': 'Padel Enthusiast',
    'testimonials.location3': 'Berlin, Germany',

    // CTA
    'cta.title': 'Ready to Play?',
    'cta.subtitle': 'Join thousands of players already using ANA',
    'cta.button': 'Get Started Free',
    'cta.noCard': 'No Credit Card Required',
    'cta.freeTrial': 'Free to Join',
    'cta.cancel': 'Leave Anytime',

    // Footer
    'footer.description': 'Connecting padel players to form the perfect team. Find your partner with ANA.',
    'footer.platform': 'Platform',
    'footer.findPlayers': 'Find Players',
    'footer.bookCourts': 'Book Courts',
    'footer.joinMatch': 'Join a Match',
    'footer.rankings': 'Rankings',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookies',
  },
  fr: {
    // Navigation
    'nav.playNow': 'Jouer',

    // Menu
    'menu.open': 'Menu',
    'menu.close': 'Fermer',
    'menu.socials': 'Réseaux',
    'menu.home': 'Accueil',
    'menu.players': 'Joueurs',
    'menu.courts': 'Terrains',
    'menu.matches': 'Matchs',
    'menu.contact': 'Contact',

    // Hero
    'hero.title1': 'TROUVE',
    'hero.title2': 'TON',
    'hero.title3': 'PARTENAIRE',
    'hero.title4': 'PADEL',
    'hero.subtitle1': 'Trouve des partenaires à ton niveau.',
    'hero.subtitle2': 'Défie des adversaires près de chez toi.',
    'hero.subtitle3': 'Réserve des terrains en quelques secondes.',
    'hero.subtitle4': 'Construis ta communauté padel.',
    'hero.findPlayers': 'Trouver des joueurs',
    'hero.bookCourt': 'Réserver un terrain',

    // Stats
    'stats.title': 'En Chiffres',
    'stats.subtitle': 'La communauté padel grandit chaque jour',
    'stats.activePlayers': 'Joueurs Actifs',
    'stats.matchesPlayed': 'Matchs Joués',
    'stats.successRate': 'Taux de Réussite',
    'stats.partnerCourts': 'Terrains Partenaires',

    // Features
    'features.title': 'Pourquoi Jouer Avec ANA',
    'features.smartMatching.title': 'Matching Intelligent',
    'features.smartMatching.description': 'Notre algorithme trouve des joueurs de ton niveau. Débutant ou pro, joue avec des partenaires qui correspondent à ton style.',
    'features.smartMatching.keywords': 'Par niveau,Intelligent,Équitable',
    'features.groupFormation.title': 'Formation de Groupes',
    'features.groupFormation.description': 'Il manque un joueur ? Crée ou rejoins des groupes instantanément. Plus jamais de match annulé.',
    'features.groupFormation.keywords': 'Flexible,Communauté,Rapide',
    'features.courtBooking.title': 'Réservation de Terrains',
    'features.courtBooking.description': 'Trouve et réserve des terrains près de chez toi en quelques secondes. Disponibilité en temps réel.',
    'features.courtBooking.keywords': 'Facile,Instantané,Proche',
    'features.matchOrganization.title': 'Organisation de Matchs',
    'features.matchOrganization.description': 'Planifie des matchs, invite des joueurs, suis les scores et construis ta réputation padel.',
    'features.matchOrganization.keywords': 'Organisé,Social,Fun',

    // Testimonials
    'testimonials.title': 'Adoré par les Joueurs',
    'testimonials.subtitle': 'Découvre ce que notre communauté dit d\'ANA',
    'testimonials.quote1': 'ANA a changé ma façon de jouer au padel. J\'ai trouvé mon groupe régulier en quelques jours. On joue chaque semaine !',
    'testimonials.author1': 'Thomas Durand',
    'testimonials.role1': 'Joueur Intermédiaire',
    'testimonials.location1': 'Paris, France',
    'testimonials.quote2': 'Plus de matchs annulés. Quand quelqu\'un se désiste, je trouve un remplaçant en minutes.',
    'testimonials.author2': 'Sofia Martinez',
    'testimonials.role2': 'Joueuse Avancée',
    'testimonials.location2': 'Barcelone, Espagne',
    'testimonials.quote3': 'La réservation de terrains est révolutionnaire. Je découvre de nouveaux clubs chaque mois.',
    'testimonials.author3': 'Lucas Schmidt',
    'testimonials.role3': 'Passionné de Padel',
    'testimonials.location3': 'Berlin, Allemagne',

    // CTA
    'cta.title': 'Prêt à Jouer ?',
    'cta.subtitle': 'Rejoins des milliers de joueurs qui utilisent déjà ANA',
    'cta.button': 'Commencer Gratuitement',
    'cta.noCard': 'Sans Carte Bancaire',
    'cta.freeTrial': 'Gratuit',
    'cta.cancel': 'Pars Quand Tu Veux',

    // Footer
    'footer.description': 'Connecte les joueurs de padel pour former l\'équipe parfaite. Trouve ton partenaire avec ANA.',
    'footer.platform': 'Plateforme',
    'footer.findPlayers': 'Trouver des Joueurs',
    'footer.bookCourts': 'Réserver des Terrains',
    'footer.joinMatch': 'Rejoindre un Match',
    'footer.rankings': 'Classements',
    'footer.company': 'Entreprise',
    'footer.about': 'À Propos',
    'footer.blog': 'Blog',
    'footer.careers': 'Carrières',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.cookies': 'Cookies',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'))
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
