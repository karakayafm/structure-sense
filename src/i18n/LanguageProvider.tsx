import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, resolveInitialLanguage, storageKey } from './context'
import { copy, type Language } from './strings'

interface Props { children: ReactNode; initialLanguage?: Language }

export function LanguageProvider({ children, initialLanguage }: Props) {
  const [language, setLanguage] = useState<Language>(() => initialLanguage ?? resolveInitialLanguage())

  useEffect(() => {
    document.documentElement.lang = language
    try {
      globalThis.localStorage?.setItem(storageKey, language)
    } catch {
      // Storage may be unavailable in private mode; the choice then lasts for this session only.
    }
  }, [language])

  const toggleLanguage = useCallback(() => setLanguage((current) => (current === 'tr' ? 'en' : 'tr')), [])
  const value = useMemo(() => ({ language, t: copy[language], setLanguage, toggleLanguage }), [language, toggleLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
