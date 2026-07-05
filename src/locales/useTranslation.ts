import en from './en';
import th from './th';
import { usePortfolio } from '../store/PortfolioContext';

const locales = { en, th };

export type LocaleKey = keyof typeof en;

export function useTranslation() {
  const { settings } = usePortfolio();
  const lang = settings.language || 'en';
  const t = (key: LocaleKey): string => {
    return locales[lang][key] || locales['en'][key] || key;
  };
  return { t, lang };
}
