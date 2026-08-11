# Structure Sense

Gerçek bir protein yapısı üzerinde atom, mesafe, açı ve torsiyon kavramlarını öğreten, Türkçe öncelikli ve tamamen tarayıcıda çalışan öğrenme uygulaması.

![Structure Sense Faz 1 masaüstü görünümü](docs/screenshots/faz1-desktop.png)

## Yerel çalışma

```bash
npm install
npm run dev
```

Kalite komutları: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

İlk dikey dilim yerel **1CRN (crambin)** yapısını açar ve iki atom seçerek Å cinsinden mesafe ölçtürür. Koordinatlar [RCSB PDB 1CRN](https://www.rcsb.org/structure/1CRN) kaynağındandır.

## Atıf ve lisans

Görüntüleme için MIT lisanslı NGL 2.4.0 kullanılır. Bilimsel kullanımda Rose ve diğerleri, *Bioinformatics* (2018), bty419 ile Rose ve Hildebrand, *Nucleic Acids Research* (2015), gkv402 çalışmalarına atıf önerilir. Uygulama kodu MIT lisanslıdır; PDB verilerinin kullanımı RCSB PDB kullanım koşullarına tabidir.
