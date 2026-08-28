import { copy, languages } from './strings'

const leaves = (value: unknown, prefix = ''): [string, unknown][] => {
  if (typeof value !== 'object' || value === null) return [[prefix, value]]
  return Object.entries(value).flatMap(([key, child]) => leaves(child, prefix ? `${prefix}.${key}` : key))
}

const atom = { index: 0, atomName: 'CA', element: 'C', residueName: 'THR', residueNumber: 1, chain: 'A', model: 0, x: 0, y: 0, z: 0 }

it('exposes the same content keys for every language', () => {
  const [reference, ...rest] = languages.map((language) => leaves(copy[language]).map(([key]) => key).sort())
  for (const other of rest) expect(other).toEqual(reference)
})

it('leaves no content string empty and formats values per language', () => {
  for (const language of languages) {
    const t = copy[language]
    for (const [key, value] of leaves(t)) {
      if (typeof value === 'string') expect(value.trim(), key).not.toBe('')
    }
    expect(t.stage.progress(1, 2)).toContain('1/2')
    expect(t.atomLabel(atom)).toContain('THR 1')
  }
})
