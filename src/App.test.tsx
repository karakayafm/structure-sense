import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

vi.mock('./components/MoleculeViewer', () => ({ MoleculeViewer: () => <div aria-label="mock viewer" /> }))

it('presents the guided distance lesson in Turkish', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'İki atom arasındaki boşluk' })).toBeInTheDocument()
  expect(screen.getByText('0/2 atom seçildi')).toBeInTheDocument()
  expect(screen.getByText('Ölçülen mesafe')).toBeInTheDocument()
})
