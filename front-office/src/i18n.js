// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traductions globales
import translationFR from './locales/fr/translation.json';
import translationEN from './locales/en/translation.json';

// Traductions page "About"
import aboutFR from './locales/fr/about.json';
import aboutEN from './locales/en/about.json';

import membersFR from './locales/fr/members.json';
import membersEN from './locales/en/members.json';

import formMemberFR from './locales/fr/formMember.json';
import formMemberEN from './locales/en/formMember.json';

import galleryFR from './locales/fr/gallery.json';
import galleryEN from './locales/en/gallery.json';

import fonsejFR from './locales/fr/fonsej.json';
import fonsejEN from './locales/en/fonsej.json';

import formFR from './locales/fr/aideForm.json';
import formEN from './locales/en/aideForm.json';

const resources = {
      fr: {
            translation: {
                  ...translationFR,
                  about: aboutFR, // namespace interne "about"
                  members: membersFR,
                  formMember: formMemberFR,
                  gallery: galleryFR,
                  fonsej: fonsejFR,
                  form: formFR,
            },
      },
      en: {
            translation: {
                  ...translationEN,
                  about: aboutEN,
                  members: membersEN,
                  formMember: formMemberEN,
                  gallery: galleryEN,
                  fonsej: fonsejEN,
                  form: formEN,
            },
      },
};

i18n.use(LanguageDetector)
      .use(initReactI18next)
      .init({
            resources,
            fallbackLng: 'fr',
            interpolation: {
                  escapeValue: false,
            },
      });

export default i18n;
