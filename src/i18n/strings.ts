import type { AtomInfo } from '../viewer/types'

export type Language = 'tr' | 'en'

export const languages: readonly Language[] = ['tr', 'en']

export type StatusKey = 'loading' | 'ready' | 'loadError'

export interface Copy {
  languageName: string
  switchLabel: string
  switchAriaLabel: string
  brandAriaLabel: string
  structurePill: string
  nav: {
    ariaLabel: string
    eyebrow: string
    title: string
    steps: readonly string[]
    privacy: string
  }
  stage: {
    eyebrow: string
    title: string
    status: Record<StatusKey, string>
    progress(selected: number, total: number): string
    help: string
  }
  viewer: { ariaLabel: string }
  concept: {
    eyebrow: string
    title: string
    summary: string
    diagramAriaLabel: string
    instruction: string
    waiting: string
    measurementLabel: string
    unitNote: string
    undo: string
    clear: string
    deeperSummary: string
    deeperBody: string
  }
  atomLabel(atom: AtomInfo): string
}

const tr: Copy = {
  languageName: 'Türkçe',
  switchLabel: 'EN',
  switchAriaLabel: 'Dil: Türkçe. İngilizceye geç.',
  brandAriaLabel: 'Structure Sense ana içerik',
  structurePill: 'Örnek yapı · 1CRN',
  nav: {
    ariaLabel: 'Öğrenme adımları',
    eyebrow: 'REHBERLİ ÖĞRENME',
    title: 'Geometriyi hisset',
    steps: ['Protein nedir?', '2 atom: Mesafe', '3 atom: Açı', '4 atom: Dihedral'],
    privacy: 'Bu yapı cihazınızda işlenir. Sunucuya dosya yüklenmez.',
  },
  stage: {
    eyebrow: 'GÖSTER',
    title: 'İki atom arasındaki boşluk',
    status: {
      loading: '1CRN örnek yapısı yükleniyor…',
      ready: 'Yapı hazır. Bir atom seçin.',
      loadError: 'Örnek yapı yüklenemedi. Sayfayı yenileyin veya WebGL desteğini kontrol edin.',
    },
    progress: (selected, total) => `${selected}/${total} atom seçildi`,
    help: 'Döndürmek için sürükle · Yakınlaştırmak için kaydır · Seçmek için atoma dokun',
  },
  viewer: { ariaLabel: '1CRN proteininin etkileşimli üç boyutlu görünümü' },
  concept: {
    eyebrow: 'AÇIKLA & DENE',
    title: 'Mesafe',
    summary: 'Mesafe, iki atomun merkezleri arasındaki düz çizginin uzunluğudur.',
    diagramAriaLabel: 'İki atomlu mesafe şeması',
    instruction: 'Yapıdaki belirgin çubuk-küre atomlardan ikisini sırayla seç.',
    waiting: 'Atom bekleniyor',
    measurementLabel: 'Ölçülen mesafe',
    unitNote: 'Å, atom ölçeğinde kullanılan Ångström birimidir.',
    undo: 'Geri al',
    clear: 'Temizle',
    deeperSummary: 'Biraz daha derin',
    deeperBody: 'Koordinat dosyasındaki tam hassasiyetle hesaplarız; yalnız gösterilen sonucu iki ondalık basamağa yuvarlarız. “Yakın” sayılması etkileşimin türüne bağlıdır.',
  },
  atomLabel: (atom) => `${atom.atomName} · ${atom.residueName} ${atom.residueNumber} · zincir ${atom.chain}`,
}

const en: Copy = {
  languageName: 'English',
  switchLabel: 'TR',
  switchAriaLabel: 'Language: English. Switch to Turkish.',
  brandAriaLabel: 'Structure Sense main content',
  structurePill: 'Example structure · 1CRN',
  nav: {
    ariaLabel: 'Learning steps',
    eyebrow: 'GUIDED LEARNING',
    title: 'Get a feel for geometry',
    steps: ['What is a protein?', '2 atoms: Distance', '3 atoms: Angle', '4 atoms: Dihedral'],
    privacy: 'This structure is processed on your device. No file is uploaded to a server.',
  },
  stage: {
    eyebrow: 'SHOW',
    title: 'The gap between two atoms',
    status: {
      loading: 'Loading the 1CRN example structure…',
      ready: 'Structure ready. Pick an atom.',
      loadError: 'The example structure could not be loaded. Reload the page or check WebGL support.',
    },
    progress: (selected, total) => `${selected}/${total} atoms selected`,
    help: 'Drag to rotate · Scroll to zoom · Tap an atom to select it',
  },
  viewer: { ariaLabel: 'Interactive three-dimensional view of the 1CRN protein' },
  concept: {
    eyebrow: 'EXPLAIN & TRY',
    title: 'Distance',
    summary: 'Distance is the length of the straight line between the centres of two atoms.',
    diagramAriaLabel: 'Two-atom distance diagram',
    instruction: 'Pick two of the highlighted ball-and-stick atoms, one after the other.',
    waiting: 'Waiting for an atom',
    measurementLabel: 'Measured distance',
    unitNote: 'Å is the Ångström, the unit used at atomic scale.',
    undo: 'Undo',
    clear: 'Clear',
    deeperSummary: 'A little deeper',
    deeperBody: 'We compute with the full precision of the coordinate file and round only the displayed result to two decimals. What counts as “close” depends on the type of interaction.',
  },
  atomLabel: (atom) => `${atom.atomName} · ${atom.residueName} ${atom.residueNumber} · chain ${atom.chain}`,
}

export const copy: Record<Language, Copy> = { tr, en }
