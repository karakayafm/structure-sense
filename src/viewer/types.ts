import type { Point3 } from '../geometry/geometry'

export interface AtomInfo extends Point3 {
  index: number
  atomName: string
  element: string
  residueName: string
  residueNumber: number
  chain: string
  model: number
}

export interface ViewerAdapter {
  loadExample(url: string): Promise<void>
  onAtomPicked(listener: (atom: AtomInfo) => void): () => void
  showMeasurement(atoms: readonly AtomInfo[]): void
  focusAll(): void
  dispose(): void
}
