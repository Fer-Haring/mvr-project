import { FC, ReactNode, createContext, useState } from 'react';

import { IntlProvider } from 'react-intl';

import englishTranslations from './en.json';
import spanishTranslations from './es.json';
import italianTranslations from './it.json';

export type AllowedLanguages = 'en' | 'es' | 'it';
interface Translations {
  ['en']: Record<string, string>;
  ['it']: Record<string, string>;
  ['es']: Record<string, string>;
}
interface TranslationsProviderProps {
  children: ReactNode;
}
export interface TranslationsContext {
  changeLanguage: (language: AllowedLanguages) => void;
  currentLanguage: AllowedLanguages;
}

const globalTranslations: Translations = {
  ['en']: englishTranslations,
  ['it']: italianTranslations,
  ['es']: spanishTranslations,
};
const defaultLanguage = localStorage.getItem('lang') || 'es';
const translationsContext = createContext<TranslationsContext | null>(null);

const TranslationsProvider: FC<TranslationsProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<AllowedLanguages>(defaultLanguage as AllowedLanguages);
  const [translations, setTranslations] = useState<Record<string, string>>(globalTranslations[currentLanguage]);

  const setLanguage = (lang: AllowedLanguages) => {
    localStorage.setItem('lang', lang);
    setTranslations(globalTranslations[lang]);
    setCurrentLanguage(lang);
  };

  const changeLanguage = (language: AllowedLanguages) => {
    switch (language) {
      case 'es':
        setLanguage('es');
        break;
      case 'it':
        setLanguage('it');
        break;
      default:
        setLanguage('en');
    }
  };

  return (
    <translationsContext.Provider value={{ changeLanguage, currentLanguage }}>
      <IntlProvider
        key={currentLanguage}
        locale={currentLanguage}
        messages={translations}
        defaultLocale={defaultLanguage}
      >
        {children}
      </IntlProvider>
    </translationsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { TranslationsProvider, globalTranslations, translationsContext };
