# DevOps / SRE 互動教學工具集 (Architecture Simulator)

這是一個專為 DevOps 工程師、SRE (網站可靠性工程師) 以及後端開發者設計的**全前端互動式教學模擬器**。
無需架設任何後端伺服器，只需開啟網頁，即可動態觀察並演練複雜的系統架構、流量乘載、以及網路封包的解析過程。

## 🛠️ 包含工具清單

1. **SRE 架構流量模擬器 (`sre.html`)**
   - 視覺化拖曳、平移與縮放的互動畫布。
   - 模擬單機到 K8s 跨區多叢集的複雜伺服器架構。
   - 動態設定不同負載平衡演算法 (Round Robin, Least Connection, IP Hash 等)。
   - 即時觀察 CPU、Memory 的資源消耗曲線，以及 Queue/Limit 的流量控制。
   - 實際操作「水平擴容」與「垂直升規」，並即時檢視故障與修復機制。

2. **網路封包解析狀態 (`net.html`)**
   - 從瀏覽器 (Browser) 到資料庫 (Database) 的每一層真實資料長相全解析。
   - 包含 DNS、TLS Handshake、TCP/IP、Mac Frame 到 LB 與 WAF 等 24 道關卡。
   - 深入了解 HTTPS 加密機制、Request/Response Headers，建立穩固的安全觀念。

3. **綜合除錯儀表板 (`dashboard.html`)**
   - 採用雙視窗整合設計。
   - 左側打擊突發流量、觀察架構變化；右側同步對照該層級的網路封包細節與常見除錯 (Troubleshooting) 方向。

4. **機器學習模型模擬 (`ml.html`)**
   - 互動式觀察 AI 模型訓練過程、參數更新與推論延遲。

5. **經典演算法視覺化 (`alg.html`)**
   - 動態展示各種資料結構與經典演算法的執行過程與時間複雜度。

## 🚀 如何運行

這是一個**純靜態網頁 (Static Website)** 專案，包含純 HTML、CSS 與原生的 Vanilla JavaScript。

**本機執行：**
直接點擊兩下 `index.html`，使用任何現代瀏覽器 (Chrome, Edge, Firefox, Safari) 即可完美執行。

**線上展示 (GitHub Pages)：**
本專案支援直接部署至 GitHub Pages：
1. 進入 Repository 的 **Settings** -> **Pages**。
2. Source 選擇 `Deploy from a branch`。
3. Branch 選擇 `main` 與 `/(root)` 並儲存。
4. 即可獲得專屬展示網址！

## 📂 專案結構

- `index.html`：整合入口主頁 (Portal)。
- `sre.html` / `app.js` / `style.css`：架構流量模擬器核心與樣式。
- `net.html` / `net.js` / `net.css`：封包狀態解析器。
- `ml.html`, `alg.html`：附屬演算法與 ML 視覺化。
- `dashboard.html`：雙視窗綜合儀表板。

---
*Developed with modern web technologies, specifically designed for SRE/DevOps visual training.*
