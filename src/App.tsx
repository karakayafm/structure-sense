import { useCallback, useMemo, useState } from 'react'
import { MoleculeViewer } from './components/MoleculeViewer'
import { distance } from './geometry/geometry'
import { useI18n } from './i18n/context'
import type { StatusKey } from './i18n/strings'
import type { AtomInfo } from './viewer/types'

export default function App() {
  const { t, language, toggleLanguage } = useI18n()
  const [atoms, setAtoms] = useState<AtomInfo[]>([])
  const [status, setStatus] = useState<StatusKey>('loading')
  const value = useMemo(() => atoms.length === 2 ? distance(atoms[0], atoms[1]) : null, [atoms])
  const onPick = useCallback((atom: AtomInfo) => {
    setAtoms((current) => current.length >= 2 ? [atom] : [...current, atom])
  }, [])
  const ready = useCallback(() => setStatus('ready'), [])
  const error = useCallback(() => setStatus('loadError'), [])

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#main" aria-label={t.brandAriaLabel}>Structure <span>Sense</span></a>
      <div className="structure-pill"><span aria-hidden="true">●</span> {t.structurePill}</div>
      <button className="language" type="button" lang={language === 'tr' ? 'en' : 'tr'} onClick={toggleLanguage} aria-label={t.switchAriaLabel}>{t.switchLabel}</button>
    </header>
    <main id="main" className="workspace">
      <nav className="lesson-nav" aria-label={t.nav.ariaLabel}>
        <p className="eyebrow">{t.nav.eyebrow}</p>
        <h2>{t.nav.title}</h2>
        <ol>
          {t.nav.steps.map((step, index) => {
            const number = `0${index + 1}`
            return index === 1
              ? <li className="active" aria-current="step" key={number}><span>{number}</span><strong>{step}</strong></li>
              : <li aria-disabled={index > 1 || undefined} key={number}><span>{number}</span> {step}</li>
          })}
        </ol>
        <p className="privacy">{t.nav.privacy}</p>
      </nav>
      <section className="stage-panel" aria-labelledby="stage-title">
        <div className="stage-heading"><div><p className="eyebrow">{t.stage.eyebrow}</p><h1 id="stage-title">{t.stage.title}</h1></div><p className="status" aria-live="polite">{t.stage.status[status]}</p></div>
        <div className="viewer-frame">
          <MoleculeViewer atoms={atoms} onPick={onPick} onReady={ready} onError={error} />
          <div className="selection-progress">{t.stage.progress(atoms.length, 2)}</div>
        </div>
        <p className="viewer-help">{t.stage.help}</p>
      </section>
      <aside className="concept-card" aria-labelledby="concept-title">
        <p className="eyebrow">{t.concept.eyebrow}</p>
        <h2 id="concept-title">{t.concept.title}</h2>
        <p>{t.concept.summary}</p>
        <div className="atom-sequence" aria-label={t.concept.diagramAriaLabel}><span>1</span><i></i><span>2</span></div>
        <p className="instruction">{t.concept.instruction}</p>
        <div className="picked-list">
          {[0, 1].map((index) => <div className="picked" key={index}><b>{index + 1}</b><span>{atoms[index] ? t.atomLabel(atoms[index]) : t.concept.waiting}</span></div>)}
        </div>
        <div className="measurement" aria-live="polite">
          <span>{t.concept.measurementLabel}</span>
          <strong>{value === null ? '—' : `${value.toFixed(2)} Å`}</strong>
          <small>{t.concept.unitNote}</small>
        </div>
        <div className="actions">
          <button type="button" onClick={() => setAtoms((current) => current.slice(0, -1))} disabled={!atoms.length}>{t.concept.undo}</button>
          <button type="button" onClick={() => setAtoms([])} disabled={!atoms.length}>{t.concept.clear}</button>
        </div>
        <details><summary>{t.concept.deeperSummary}</summary><p>{t.concept.deeperBody}</p></details>
      </aside>
    </main>
  </div>
}
