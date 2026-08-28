# Mimari

React arayüzü NGL nesnelerine doğrudan dokunmaz. `ViewerAdapter`, yükleme/picking/ölçüm/odak yaşam döngüsünü sınırlar; `NglViewerAdapter` NGL `Stage` kurar ve kapanışta sinyal ile Stage'i temizler. `ResizeObserver`, `handleResize` çağırır. NGL dinamik import ile ayrı pakete ayrılır.

`geometry/` saf ve NGL'den bağımsız tam hassasiyetli hesaplar; `structure/` protein atom çözümleme; `i18n/` iki dilli arayüz sözlükleri ve dil sağlayıcısı; `lessons/` iki dilli ders verisi; `state/` seçim ve ilerleme; `components/` erişilebilir React arayüzüdür. Faz 1 küçük olduğu için seçim durumu bileşende yereldir; kapsam büyüyünce reducer'a taşınacaktır.

NGL 2.4.0 resmi npm paketindeki güncel kararlı sürüm olarak tam sabitlenmiştir. Ayrı Three.js kurulmaz. Doğrulanan API'ler: `Stage`, `loadFile`, `StructureComponent.addRepresentation/autoView`, `stage.signals.clicked`, `handleResize`, `dispose`.
