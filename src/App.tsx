import { useCallback, useMemo, useState } from 'react'
import { MoleculeViewer } from './components/MoleculeViewer'
import { distance } from './geometry/geometry'
import type { AtomInfo } from './viewer/types'

const atomLabel = (atom: AtomInfo) => `${atom.atomName} · ${atom.residueName} ${atom.residueNumber} · zincir ${atom.chain}`

export default function App() {
  const [atoms, setAtoms] = useState<AtomInfo[]>([])
  const [status, setStatus] = useState('1CRN örnek yapısı yükleniyor…')
  const value = useMemo(() => atoms.length === 2 ? distance(atoms[0], atoms[1]) : null, [atoms])
  const onPick = useCallback((atom: AtomInfo) => {
    setAtoms((current) => current.length >= 2 ? [atom] : [...current, atom])
  }, [])
  const ready = useCallback(() => setStatus('Yapı hazır. Bir atom seçin.'), [])
  const error = useCallback((message: string) => setStatus(message), [])

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#main" aria-label="Structure Sense ana içerik">Structure <span>Sense</span></a>
      <div className="structure-pill"><span aria-hidden="true">●</span> Örnek yapı · 1CRN</div>
      <button className="language" type="button" disabled aria-label="Dil: Türkçe">TR</button>
    </header>
    <main id="main" className="workspace">
      <nav className="lesson-nav" aria-label="Öğrenme adımları">
        <p className="eyebrow">REHBERLİ ÖĞRENME</p>
        <h2>Geometriyi hisset</h2>
        <ol>
          <li><span>01</span> Protein nedir?</li>
          <li className="active" aria-current="step"><span>02</span><strong>2 atom: Mesafe</strong></li>
          <li aria-disabled="true"><span>03</span> 3 atom: Açı</li>
          <li aria-disabled="true"><span>04</span> 4 atom: Dihedral</li>
        </ol>
        <p className="privacy">Bu yapı cihazınızda işlenir. Sunucuya dosya yüklenmez.</p>
      </nav>
      <section className="stage-panel" aria-labelledby="stage-title">
        <div className="stage-heading"><div><p className="eyebrow">GÖSTER</p><h1 id="stage-title">İki atom arasındaki boşluk</h1></div><p className="status" aria-live="polite">{status}</p></div>
        <div className="viewer-frame">
          <MoleculeViewer atoms={atoms} onPick={onPick} onReady={ready} onError={error} />
          <div className="selection-progress">{atoms.length}/2 atom seçildi</div>
        </div>
        <p className="viewer-help">Döndürmek için sürükle · Yakınlaştırmak için kaydır · Seçmek için atoma dokun</p>
      </section>
      <aside className="concept-card" aria-labelledby="concept-title">
        <p className="eyebrow">AÇIKLA &amp; DENE</p>
        <h2 id="concept-title">Mesafe</h2>
        <p>Mesafe, iki atomun merkezleri arasındaki düz çizginin uzunluğudur.</p>
        <div className="atom-sequence" aria-label="İki atomlu mesafe şeması"><span>1</span><i></i><span>2</span></div>
        <p className="instruction">Yapıdaki belirgin çubuk-küre atomlardan ikisini sırayla seç.</p>
        <div className="picked-list">
          {[0, 1].map((index) => <div className="picked" key={index}><b>{index + 1}</b><span>{atoms[index] ? atomLabel(atoms[index]) : 'Atom bekleniyor'}</span></div>)}
        </div>
        <div className="measurement" aria-live="polite">
          <span>Ölçülen mesafe</span>
          <strong>{value === null ? '—' : `${value.toFixed(2)} Å`}</strong>
          <small>Å, atom ölçeğinde kullanılan Ångström birimidir.</small>
        </div>
        <div className="actions">
          <button type="button" onClick={() => setAtoms((current) => current.slice(0, -1))} disabled={!atoms.length}>Geri al</button>
          <button type="button" onClick={() => setAtoms([])} disabled={!atoms.length}>Temizle</button>
        </div>
        <details><summary>Biraz daha derin</summary><p>Koordinat dosyasındaki tam hassasiyetle hesaplarız; yalnız gösterilen sonucu iki ondalık basamağa yuvarlarız. “Yakın” sayılması etkileşimin türüne bağlıdır.</p></details>
      </aside>
    </main>
  </div>
}
