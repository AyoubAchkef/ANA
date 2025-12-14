'use client'

import StaggeredMenu from './StaggeredMenu'
import { useLanguage } from '@/context/LanguageContext'

export default function TranslatedMenu() {
  const { t } = useLanguage()

  const items = [
    { label: t('menu.home'), ariaLabel: t('menu.home'), link: '#' },
    { label: t('menu.players'), ariaLabel: t('menu.players'), link: '#players' },
    { label: t('menu.courts'), ariaLabel: t('menu.courts'), link: '#courts' },
    { label: t('menu.matches'), ariaLabel: t('menu.matches'), link: '#matches' },
    { label: t('menu.contact'), ariaLabel: t('menu.contact'), link: '#contact' }
  ]

  const socialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Email', link: 'mailto:contact@ana.com' }
  ]

  return (
    <StaggeredMenu
      position="right"
      items={items}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#fff"
      openMenuButtonColor="#000"
      changeMenuColorOnOpen={true}
      colors={['#1a1a1a', '#2a2a2a']}
      logoUrl="/logo_ANA.svg"
      accentColor="#fff"
      isFixed={true}
      menuLabel={t('menu.open')}
      closeLabel={t('menu.close')}
      socialsLabel={t('menu.socials')}
    />
  )
}
