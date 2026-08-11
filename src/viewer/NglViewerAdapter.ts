import type { AtomInfo, ViewerAdapter } from './types'
import type { Component, PickingProxy, RepresentationElement } from 'ngl'

type NglModule = typeof import('ngl')
type NglStage = InstanceType<NglModule['Stage']>

export class NglViewerAdapter implements ViewerAdapter {
  private stage: NglStage | null = null
  private component: Component | null = null
  private measurement: RepresentationElement | null = null
  private callbacks = new Set<(atom: AtomInfo) => void>()
  private clickedHandler: ((proxy: PickingProxy) => void) | null = null

  constructor(private readonly element: HTMLElement) {}

  async loadExample(url: string): Promise<void> {
    const ngl = await import('ngl')
    this.stage = new ngl.Stage(this.element, { backgroundColor: '#f8f6f0' })
    const component = await this.stage.loadFile(url, { ext: 'pdb' })
    if (!component) throw new Error('NGL did not return a structure component')
    this.component = component
    this.component.addRepresentation('cartoon', { colorScheme: 'residueindex' })
    this.component.addRepresentation('ball+stick', { sele: '1-5', opacity: 0.9 })
    this.component.autoView()
    this.clickedHandler = (proxy: PickingProxy) => {
      const atom = proxy?.atom ?? proxy?.closestBondAtom
      if (!atom) return
      const info: AtomInfo = {
        index: atom.index,
        atomName: atom.atomname,
        element: atom.element,
        residueName: atom.resname,
        residueNumber: atom.resno,
        chain: atom.chainname || atom.chainid || '—',
        model: (atom.modelIndex ?? 0) + 1,
        x: atom.x, y: atom.y, z: atom.z,
      }
      this.callbacks.forEach((callback) => callback(info))
    }
    this.stage.signals.clicked.add(this.clickedHandler)
  }

  onAtomPicked(listener: (atom: AtomInfo) => void): () => void {
    this.callbacks.add(listener)
    return () => this.callbacks.delete(listener)
  }

  showMeasurement(atoms: readonly AtomInfo[]): void {
    if (!this.component || atoms.length !== 2) return
    if (this.measurement) this.component.removeRepresentation(this.measurement)
    this.measurement = this.component.addRepresentation('distance', {
      name: 'learning-distance',
      atomPair: [[atoms[0].index, atoms[1].index]],
      color: '#d85c41',
      labelColor: '#172a3a',
      labelSize: 1.2,
    })
  }

  focusAll(): void { this.component?.autoView() }

  resize(): void { this.stage?.handleResize() }

  dispose(): void {
    if (this.clickedHandler) this.stage?.signals.clicked.remove(this.clickedHandler)
    this.callbacks.clear()
    this.stage?.dispose()
    this.stage = null
    this.component = null
    this.measurement = null
  }
}
