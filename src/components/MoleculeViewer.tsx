import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n/context'
import { NglViewerAdapter } from '../viewer/NglViewerAdapter'
import type { AtomInfo } from '../viewer/types'

interface Props { atoms: readonly AtomInfo[]; onPick(atom: AtomInfo): void; onReady(): void; onError(): void }

export function MoleculeViewer({ atoms, onPick, onReady, onError }: Props) {
  const { t } = useI18n()
  const hostRef = useRef<HTMLDivElement>(null)
  const adapterRef = useRef<NglViewerAdapter | null>(null)
  const pickRef = useRef(onPick)

  useEffect(() => { pickRef.current = onPick }, [onPick])

  useEffect(() => {
    if (!hostRef.current) return
    const adapter = new NglViewerAdapter(hostRef.current)
    adapterRef.current = adapter
    const unsubscribe = adapter.onAtomPicked((atom) => pickRef.current(atom))
    const observer = new ResizeObserver(() => adapter.resize())
    observer.observe(hostRef.current)
    adapter.loadExample(`${import.meta.env.BASE_URL}structures/1crn.pdb`).then(onReady).catch(onError)
    return () => { observer.disconnect(); unsubscribe(); adapter.dispose() }
  }, [onError, onReady])

  useEffect(() => { adapterRef.current?.showMeasurement(atoms) }, [atoms])

  return <div ref={hostRef} className="viewer" role="application" aria-label={t.viewer.ariaLabel} />
}
