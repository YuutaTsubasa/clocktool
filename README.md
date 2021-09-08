# 時鐘實況小工具

![demo.gif](demo.gif)

一個可以用於實況中顯示時間的小工具。

## 下載頁面

可至[Release](https://github.com/YuutaTsubasa/clocktool/releases/)頁面根據自身的作業系統下載最新版本。

檔名 | 作業系統
--- | --- 
clocktool-electron-win32-x64-{version}.zip | Windows (64-bit)
clocktool-electron-{version}-1.x86_64.rpm | Linux (64-bit) .rpm
clocktool-electron_{version}_amd64.deb | Linux (64-bit) .deb
clocktool-electron-darwin-x64-{version}.zip | macOS (64-bit)

## 使用說明

### 基本使用方法
1. 打開程式(clocktool-electron.exe)。
2. 調整設定（關於各項設定說明可至下方了解）。
3. 按下「打開時鐘視窗」。
4. 於 OBS 介面擷取該時鐘視窗即可。（可利用濾鏡中的色度鍵去背景）

### 調整視窗與時鐘相關設定

項目 | 說明
--- | --- 
視窗背景 | 可設定整個視窗的背景顏色或是圖案
時鐘背景 | 可設定時鐘的背景顏色或是圖案（預設圖片放置於 `resources/app/src/image/clock.png`）
時鐘大小 | 可設定時鐘的大小
時鐘框長 | 可設定時鐘基本邊框長度
時鐘框色 | 可設定時鐘框框顏色
時鐘圓角距離 | 可設定時鐘圓角的程度

### 調整指針相關設定

項目 | 說明
--- | --- 
長度比例 | 可設定指針的長度為多少比例（全長為一半時鐘大小的值）
寬度 | 可設定指針的寬度
背景 | 可設定指針的背景顏色或是圖案
背後超出長度 | 可設定指針背後要超過圓心多長

### 調整自定義 CSS

項目 | 說明
--- | --- 
`body` | 視窗設定
`.clock` | 時鐘設定
`.clockHand` | 全部指針設定
`.clockHand[data-type=hour]` | 時針設定
`.clockHand[data-type=minute]` | 分針設定
`.clockHand[data-type=second]` | 秒針設定

## 使用技術
- [npm](https://www.electronjs.org/)
- [Electron](https://www.electronjs.org/)
- [js-yaml](https://github.com/nodeca/js-yaml)
- [Electron Forge](https://www.electronforge.io/)
- [RxJS](https://rxjs.dev/)

## 作者
- [悠太翼 @YuutaTsubasa](http://yutaii.run/twitter)
- 歡迎訂閱我的 [Youtube 頻道](http://yutaii.run/youtube)！
- 有任何想要修改的部分歡迎發 Pull Request、發 Issue 或是私訊唷！

## 貢獻者
- [Lucas 洛可 @ycs77_lucas_v](https://twitter.com/ycs77_lucas_v)