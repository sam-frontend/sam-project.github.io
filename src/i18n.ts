import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const commonTranslation = {
  nav: {
    home: 'Home',
    about: 'About',
    gallery: 'Gallery',
    projects: 'Projects',
    contact: 'Contact',
  },
  eyebrow: 'Available for both remote and freelance work',
  hero: {
    line1: 'Creative',
    line2: 'Developer',
    line3: '& Designer.',
    sub: 'I build thoughtful interfaces and performant web experiences — where sharp engineering meets considered design.',
    ctaWork: 'View My Work',
    ctaContact: 'Get in Touch',
    scroll: 'scroll'
  },
  selectedWork: 'Selected Work',
  allProjects: 'All Projects',
  cta: {
    title: "Let's build something",
    subtitle: 'remarkable together.',
    start: 'Start a Conversation'
  },
  about: {
    eyebrow: 'About Me',
    titleLine1: 'Designer,',
    titleLine2: 'engineer,',
    titleLine3: 'obsessive.',
  },
  contact: {
    eyebrow: 'Get in Touch',
    heroTitleLine1: "Let's work",
    heroTitleLine2: 'together.'
  },
  projects: {
    eyebrow: 'Portfolio',
    title: 'Projects',
  }
}

const resources = {
  en: { translation: commonTranslation },
  fr: { translation: commonTranslation },
  de: { translation: commonTranslation },
  ig: { translation: commonTranslation },
  ha: { translation: commonTranslation },
  yo: { translation: commonTranslation },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        about: 'Acerca de',
        gallery: 'Galería',
        projects: 'Proyectos',
        contact: 'Contacto',
      },
      eyebrow: 'Disponible para trabajo remoto y freelance',
      hero: {
        line1: 'Creativo',
        line2: 'Desarrollador',
        line3: '& Diseñador.',
        sub: 'Construyo interfaces cuidadosas y experiencias web con alto rendimiento — donde la ingeniería aguda se encuentra con el diseño considerado.',
        ctaWork: 'Ver mi trabajo',
        ctaContact: 'Contactar',
        scroll: 'desplazar'
      },
      selectedWork: 'Trabajo seleccionado',
      allProjects: 'Todos los proyectos',
      cta: {
        title: 'Construyamos algo',
        subtitle: 'notable juntos.',
        start: 'Iniciar conversación'
      },
      about: {
        eyebrow: 'Sobre mí',
        titleLine1: 'Diseñador,',
        titleLine2: 'ingeniero,',
        titleLine3: 'obsesivo.',
      },
      contact: {
        eyebrow: 'Ponte en contacto',
        heroTitleLine1: 'Trabajemos',
        heroTitleLine2: 'juntos.'
      },
      projects: {
        eyebrow: 'Portafolio',
        title: 'Proyectos',
      }
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  })

export default i18n
