import { createContext, useContext } from 'react'
import { copy, type Copy, type Language } from './strings'

export interface LanguageState {
  language: Language
  t: Copy
  setLanguage(language: Language): void
  toggleLanguage(): void
}

export const LanguageContext = createContext<LanguageState | null>(null)

export function useI18n(): LanguageState {
  const state = useContext(LanguageContext)
  if (!state) throw new Error('useI18n requires a LanguageProvider ancestor')
  return state
}

export const storageKey = 'structure-sense:language'

export function isLanguage(value: unknown): value is Language {
  return value === 'tr' || value === 'en'
}

export const defaultLanguage: Language = 'en'

export function resolveInitialLanguage(): Language {
  const stored = globalThis.localStorage?.getItem(storageKey)
  return isLanguage(stored) ? stored : defaultLanguage
}

export { copy }
