# System Architecture Visualization

> **Live Demo:** [https://steve-shih.github.io/SystemArchitectureVisualization/](https://steve-shih.github.io/SystemArchitectureVisualization/)

本專案為一系列架構設計與網路狀態之視覺化驗證紀錄。
主要探討並模擬大規模分散式系統中，流量進入各層級節點時的資源消耗、負載平衡策略，以及網路底層通訊的狀態轉變。全案採用純前端 (Vanilla JS) 實作動態拓撲演算與封包追蹤。

## 核心模組

1. **SRE 架構與流量演練 (`sre.html`)**
   - 模擬高併發環境下的負載平衡 (Load Balancing) 策略 (Round Robin, Least Connection, IP Hash)。
   - 動態拓撲演算：實作可視化連線路徑與封包生命週期。
   - 資源水位監控：即時反映 CPU、Memory 隨併發請求數 (Load) 的升降與冷卻曲線。
   - 擴展性驗證：透過水平擴容 (Horizontal Scaling) 與垂直升規 (Vertical Scaling) 驗證系統吞吐量瓶頸與容錯機制。

2. **網路傳輸與封包狀態解析 (`net.html`)**
   - 追蹤 Request 從 Client 端發出至 Database 寫入的 L2-L7 完整路徑。
   - 紀錄每一層 (DNS, TLS 1.3 Handshake, TCP Window, IP Routing, WAF Inspection) 的 Payload 狀態與封裝細節。
   - 安全機制探討：展示明文資料在 HTTPS 加密前後的邊界，以及 Middleware (CORS, Rate Limit) 的攔截機制。

3. **綜合監控儀表板 (`dashboard.html`)**
   - 雙視窗整合：同步檢視架構流量拓撲與底層封包狀態，提供除錯 (Troubleshooting) 時的立體對照視角。

4. **機器學習運算視覺化 (`ml.html`)**
   - 紀錄 AI 模型訓練階段的 Forward/Backward Propagation，以及參數更新時的運算延遲與資源消耗模型。

5. **演算法效能實驗 (`alg.html`)**
   - 經典資料結構與演算法之時間複雜度與空間複雜度的動態執行軌跡紀錄。

## 架構與技術選型

- **Static Site**：不依賴任何後端 Runtime，直接透過 GitHub Pages 進行託管。
- **Zero Dependencies**：無依賴大型前端框架，直接操作 DOM 與 CSS Transitions，以確保封包動畫在大量節點下的渲染效能。
- **Separation of Concerns**：邏輯腳本與樣式採高內聚低耦合設計，便於後續平行擴充新模組。
