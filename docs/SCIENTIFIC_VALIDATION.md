# Bilimsel doğrulama

## Tanımlar

| Büyüklük | Sıralı atomlar | Aralık |
|---|---|---|
| Mesafe | A–B merkezleri | ≥ 0 Å |
| Bağ açısı | A–B–C, köşe B | 0–180° |
| Dihedral | A–B–C–D | −180–+180° |
| φᵢ | C(i−1)–N(i)–CA(i)–C(i) | periyodik |
| ψᵢ | N(i)–CA(i)–C(i)–N(i+1) | periyodik |
| ωᵢ | CA(i)–C(i)–N(i+1)–CA(i+1) | periyodik |

Mesafe Öklid normudur. Açı hesabında `acos` girdisi sayısal güvenlik için `[-1,1]` aralığına sıkıştırılır. Sıfır uzunluklu kol tanımsızdır.

## Dihedral konvansiyonu

`b0=A−B`, `b1=C−B`, `b2=D−C`; `n1=b0×b1`, `n2=b1×b2`. İşaretli açı `atan2((n1×n2)·normalize(b1), n1·n2)` ile hesaplanır ve `[-180,+180]` aralığına normalize edilir. +180° ve −180° aynı periyodik yönelimdir; karşılaştırma dairesel farkla yapılır. Atom sırası ve yazılım konvansiyonu işareti etkileyebilir.

## Yan zincirler ve sınırlar

χ1 `N–CA–CB–Xγ`, χ2 `CA–CB–Xγ–Xδ` olarak, açık ve testli bir rezidü sözlüğüyle Faz 4'te eklenecektir. Gly/Ala için χ1 yoktur. Eksik/alternatif atomlardan değer uydurulmaz. Omega çoğunlukla trans çevresinde 180°, cis çevresinde 0° olabilir; “her zaman 180°” değildir. Ramachandran alanları mutlak yasalar değil gözlemsel tercih bölgeleridir.

## Fixture ve tolerans

Yerel 1CRN dosyası RCSB PDB'den 11 Ağustos 2026 tarihinde alınmıştır. Faz 3'te en az iki yapının φ/ψ/ω değerleri bağımsız bir yöntemle sabit fixture olarak doğrulanacaktır. Geometri birim testlerinde tolerans `1e-10`; yapısal açı karşılaştırmalarında hedef tolerans `0,1°` olacaktır. PDB/mmCIF bir koordinat modelidir; canlı molekülün sabit olduğunu göstermez ve hidrojenler eksik olabilir.
