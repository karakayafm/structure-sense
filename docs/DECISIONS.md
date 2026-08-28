# Kararlar

## ADR-001 — Statik React/Vite ve NGL adaptörü

İlk sürüm sunucusuzdur. Vite + React + strict TypeScript seçildi. NGL 2.4.0 dinamik yüklenir ve dar adaptör arkasındadır. Böylece içerik/testler görüntüleyici iç tiplerine bağlanmaz ve ilk JavaScript yükü küçülebilir.

## ADR-002 — Çevrimdışı 1CRN

Crambin 46 rezidülü, küçük ve öğretim için hızlıdır. RCSB kaynağından yerel PDB fixture sağlanır; ağ kesilse de ilk ders çalışır.

## ADR-003 — Sözlük tabanlı iki dillilik

Arayüz metni `src/i18n/strings.ts` içinde dile göre iki sözlükte tutulur; İngilizce sözlük Türkçe sözlükten türeyen `Copy` tipiyle yazılır, böylece eksik anahtar derleme hatası olur. Kütüphane eklenmez: `LanguageProvider` seçimi `localStorage` içinde saklar ve `<html lang>` değerini günceller. Uluslararası erişim öncelikli olduğu için kayıtlı tercih yoksa varsayılan dil İngilizcedir; tarayıcı dili okunmaz, böylece ilk boyama ile React sonrası aynı dili gösterir.
