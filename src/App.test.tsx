import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
import type { Language } from './i18n/strings'

vi.mock('./components/MoleculeViewer', () => ({ MoleculeViewer: () => <div aria-label="mock viewer" /> }))

const renderApp = (initialLanguage?: Language) =>
  render(<LanguageProvider initialLanguage={initialLanguage}><App /></LanguageProvider>)

beforeEach(() => localStorage.clear())

it('starts in English when the visitor has no stored preference', () => {
  renderApp()
  expect(screen.getByRole('heading', { name: 'The gap between two atoms' })).toBeInTheDocument()
  expect(document.documentElement.lang).toBe('en')
})

it('restores the language stored by an earlier visit', () => {
  localStorage.setItem('structure-sense:language', 'tr')
  renderApp()
  expect(screen.getByRole('heading', { name: 'İki atom arasındaki boşluk' })).toBeInTheDocument()
})

it('presents the guided distance lesson in Turkish', () => {
  renderApp('tr')
  expect(screen.getByRole('heading', { name: 'İki atom arasındaki boşluk' })).toBeInTheDocument()
  expect(screen.getByText('0/2 atom seçildi')).toBeInTheDocument()
  expect(screen.getByText('Ölçülen mesafe')).toBeInTheDocument()
})

it('presents the guided distance lesson in English', () => {
  renderApp('en')
  expect(screen.getByRole('heading', { name: 'The gap between two atoms' })).toBeInTheDocument()
  expect(screen.getByText('0/2 atoms selected')).toBeInTheDocument()
  expect(screen.getByText('Measured distance')).toBeInTheDocument()
})

it('switches the whole lesson between languages from the header button', () => {
  renderApp('tr')

  fireEvent.click(screen.getByRole('button', { name: 'Dil: Türkçe. İngilizceye geç.' }))
  expect(screen.getByRole('heading', { name: 'The gap between two atoms' })).toBeInTheDocument()
  expect(screen.getAllByText('Waiting for an atom')).toHaveLength(2)
  expect(document.documentElement.lang).toBe('en')

  fireEvent.click(screen.getByRole('button', { name: 'Language: English. Switch to Turkish.' }))
  expect(screen.getByRole('heading', { name: 'İki atom arasındaki boşluk' })).toBeInTheDocument()
  expect(document.documentElement.lang).toBe('tr')
})
