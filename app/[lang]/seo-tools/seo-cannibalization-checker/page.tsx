import { translate } from '@/lib/i18n/server';
import SEOCannibalizationChecker from './components/SEOCannibalizationChecker';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function SEOCannibalizationCheckerPage({ params }: Props) {
  const { lang } = await params;
  
  const translations = {
    title: translate(lang, 'seoCannibalizationChecker.title'),
    description: translate(lang, 'seoCannibalizationChecker.description'),
    domain: {
      label: translate(lang, 'seoCannibalizationChecker.domain.label'),
      placeholder: translate(lang, 'seoCannibalizationChecker.domain.placeholder'),
      help: translate(lang, 'seoCannibalizationChecker.domain.help')
    },
    keyword: {
      label: translate(lang, 'seoCannibalizationChecker.keyword.label'),
      placeholder: translate(lang, 'seoCannibalizationChecker.keyword.placeholder'),
      help: translate(lang, 'seoCannibalizationChecker.keyword.help')
    },
    button: {
      check: translate(lang, 'seoCannibalizationChecker.button.check'),
      processing: translate(lang, 'seoCannibalizationChecker.button.processing')
    },
    result: {
      title: translate(lang, 'seoCannibalizationChecker.result.title'),
      description: translate(lang, 'seoCannibalizationChecker.result.description'),
      openButton: translate(lang, 'seoCannibalizationChecker.result.openButton')
    },
    error: {
      emptyDomain: translate(lang, 'seoCannibalizationChecker.error.emptyDomain'),
      invalidDomain: translate(lang, 'seoCannibalizationChecker.error.invalidDomain'),
      emptyKeyword: translate(lang, 'seoCannibalizationChecker.error.emptyKeyword'),
      generic: translate(lang, 'seoCannibalizationChecker.error.generic')
    }
  };
  
  return <SEOCannibalizationChecker translations={translations} />;
} 