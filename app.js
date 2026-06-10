/* ==========================================================================
   架構定義與常數設定 (Levels & Configs)
   ========================================================================== */
const levels = {
    small: {
        label: 'Lv1 小公司：單台 VM',
        nodes: [
            ['user', 'User', 'client', 80, 520],
            ['vm1', 'GCP VM', 'vm', 390, 420],
            ['nginx', 'Nginx', 'nginx', 430, 315],
            ['pm2', 'PM2', 'pm2', 430, 455],
            ['app1', 'Node.js App', 'app', 430, 595],
            ['db', 'DB', 'db', 760, 595]
        ],
        edges: [
            ['user', 'nginx'], ['nginx', 'pm2'], ['pm2', 'app1'], ['app1', 'db']
        ]
    },
    smallNginx: {
        label: 'Lv2 小公司進階：獨立 Nginx VM',
        nodes: [
            ['user', 'User', 'client', 80, 520],
            ['nginxVm', 'Nginx VM Public IP', 'vm', 360, 420],
            ['nginx', 'Nginx', 'nginx', 400, 535],
            ['app1', 'App VM 1', 'app', 740, 350],
            ['app2', 'App VM 2', 'app', 740, 570],
            ['db', 'DB VM', 'db', 1080, 460]
        ],
        edges: [
            ['user', 'nginxVm'], ['nginxVm', 'nginx'], ['nginx', 'app1'], 
            ['nginx', 'app2'], ['app1', 'db'], ['app2', 'db']
        ]
    },
    midTraditional: {
        label: 'Lv3 中型公司：Nginx + Docker + PM2',
        nodes: [
            ['user', 'User', 'client', 80, 640],
            ['nginxVm', 'Nginx VM', 'vm', 360, 540],
            ['nginx', 'Nginx Reverse Proxy', 'nginx', 400, 655],
            ['appVm1', 'App VM 1', 'vm', 760, 230],
            ['docker1', 'Docker', 'container', 790, 340],
            ['pm21', 'PM2 Cluster', 'pm2', 790, 450],
            ['app1', 'Node.js App 1', 'app', 790, 560],
            ['appVm2', 'App VM 2', 'vm', 760, 750],
            ['docker2', 'Docker', 'container', 790, 860],
            ['pm22', 'PM2 Cluster', 'pm2', 790, 970],
            ['app2', 'Node.js App 2', 'app', 790, 1080],
            ['queue', 'Queue / Redis', 'queue', 1130, 640],
            ['worker1', 'Worker 1', 'app', 1430, 510],
            ['worker2', 'Worker 2', 'app', 1430, 770],
            ['db', 'MongoDB VM', 'db', 1760, 640]
        ],
        edges: [
            ['user', 'nginxVm'], ['nginxVm', 'nginx'], ['nginx', 'appVm1'], 
            ['nginx', 'appVm2'], ['appVm1', 'docker1'], ['docker1', 'pm21'], 
            ['pm21', 'app1'], ['appVm2', 'docker2'], ['docker2', 'pm22'], 
            ['pm22', 'app2'], ['app1', 'queue'], ['app2', 'queue'], 
            ['queue', 'worker1'], ['queue', 'worker2'], ['worker1', 'db'], 
            ['worker2', 'db']
        ]
    },
    midCloud: {
        label: 'Lv4 中型公司：GCP LB + 多台 VM',
        nodes: [
            ['user', 'User', 'client', 80, 540],
            ['gcpLb', 'GCP Load Balancer', 'gcp-lb', 390, 540],
            ['app1', 'App VM 1 Docker', 'app', 760, 320],
            ['app2', 'App VM 2 Docker', 'app', 760, 540],
            ['app3', 'App VM 3 Docker', 'app', 760, 760],
            ['queue', 'Queue / Redis', 'queue', 1090, 540],
            ['worker1', 'Worker A', 'app', 1390, 420],
            ['worker2', 'Worker B', 'app', 1390, 660],
            ['db', 'Cloud SQL / Mongo', 'db', 1700, 540]
        ],
        edges: [
            ['user', 'gcpLb'], ['gcpLb', 'app1'], ['gcpLb', 'app2'], 
            ['gcpLb', 'app3'], ['app1', 'queue'], ['app2', 'queue'], 
            ['app3', 'queue'], ['queue', 'worker1'], ['queue', 'worker2'], 
            ['worker1', 'db'], ['worker2', 'db']
        ]
    },
    big: {
        label: 'Lv5 大公司：GKE / K8s',
        nodes: [
            ['user', 'User', 'client', 80, 540],
            ['gcpLb', 'Global LB', 'gcp-lb', 360, 540],
            ['ingress', 'Nginx Ingress', 'nginx', 630, 540],
            ['svc', 'K8s Service', 'k8s-service', 910, 540],
            ['pod1', 'Pod User API', 'k8s', 1200, 300],
            ['pod2', 'Pod Order API', 'k8s', 1200, 540],
            ['pod3', 'Pod Payment API', 'k8s', 1200, 780],
            ['queue', 'Pub/Sub / Queue', 'queue', 1510, 540],
            ['worker1', 'Worker Pod 1', 'k8s', 1810, 420],
            ['worker2', 'Worker Pod 2', 'k8s', 1810, 660],
            ['db', 'Cloud SQL', 'db', 2110, 540]
        ],
        edges: [
            ['user', 'gcpLb'], ['gcpLb', 'ingress'], ['ingress', 'svc'], 
            ['svc', 'pod1'], ['svc', 'pod2'], ['svc', 'pod3'], 
            ['pod1', 'queue'], ['pod2', 'queue'], ['pod3', 'queue'], 
            ['queue', 'worker1'], ['queue', 'worker2'], ['worker1', 'db'], 
            ['worker2', 'db']
        ]
    },
    huge: {
        label: 'Lv6 超大專案：多 Cluster',
        nodes: [
            ['user', 'Global Users', 'client', 80, 560],
            ['cdn', 'CDN / WAF', 'gcp-lb', 330, 560],
            ['globalLb', 'Global LB', 'gcp-lb', 580, 560],
            ['clusterA', 'GKE Cluster A', 'k8s', 880, 300],
            ['clusterB', 'GKE Cluster B', 'k8s', 880, 560],
            ['clusterC', 'GKE Cluster C', 'k8s', 880, 820],
            ['queue', 'Kafka / PubSub', 'queue', 1210, 560],
            ['consumer1', 'Consumer Pool A', 'k8s', 1530, 430],
            ['consumer2', 'Consumer Pool B', 'k8s', 1530, 690],
            ['redis', 'Redis Cluster', 'db', 1840, 400],
            ['db', 'DB Cluster', 'db', 1840, 720]
        ],
        edges: [
            ['user', 'cdn'], ['cdn', 'globalLb'], ['globalLb', 'clusterA'], 
            ['globalLb', 'clusterB'], ['globalLb', 'clusterC'], 
            ['clusterA', 'queue'], ['clusterB', 'queue'], ['clusterC', 'queue'], 
            ['queue', 'consumer1'], ['queue', 'consumer2'], 
            ['consumer1', 'redis'], ['consumer1', 'db'], 
            ['consumer2', 'redis'], ['consumer2', 'db']
        ]
    },
    mega: {
        label: 'Lv7 超大複雜專案：Multi Region + Service Mesh',
        nodes: [
            ['user', 'Global Users', 'client', 80, 680],
            ['cdn', 'CDN / WAF', 'gcp-lb', 330, 680],
            ['dns', 'Geo DNS', 'gcp-lb', 580, 680],
            ['tw', 'Taiwan Region', 'k8s', 890, 260],
            ['jp', 'Japan Region', 'k8s', 890, 540],
            ['sg', 'Singapore Region', 'k8s', 890, 820],
            ['us', 'US Region', 'k8s', 890, 1100],
            ['mesh', 'Service Mesh', 'k8s', 1230, 680],
            ['kafka', 'Kafka Cluster', 'queue', 1550, 520],
            ['consumer', 'Consumer Fleet', 'k8s', 1550, 840],
            ['db', 'Global DB', 'db', 1880, 520],
            ['obs', 'Observability', 'db', 1880, 840]
        ],
        edges: [
            ['user', 'cdn'], ['cdn', 'dns'], ['dns', 'tw'], ['dns', 'jp'], 
            ['dns', 'sg'], ['dns', 'us'], ['tw', 'mesh'], ['jp', 'mesh'], 
            ['sg', 'mesh'], ['us', 'mesh'], ['mesh', 'kafka'], 
            ['mesh', 'consumer'], ['kafka', 'db'], ['consumer', 'db'], 
            ['consumer', 'obs']
        ]
    }
};

const typeBadge = {
    client: 'User', vm: 'VM', nginx: 'Nginx', pm2: 'PM2', 
    container: 'Docker', app: 'App', db: 'DB', queue: 'Queue', 
    k8s: 'Pod/Cluster', 'gcp-lb': 'LB', 'k8s-service': 'Service'
};

/* ==========================================================================
   全域狀態 (Global State)
   ========================================================================== */
let nodes = {};
let edges = [];
let selectedId = null;
let scale = 0.58;
let pan = { x: 25, y: 30 };
let rrIndex = 0;           // Round Robin 索引
let queueItems = 0;        // 佇列堆積數量
let dragNode = null;       // 正在拖曳的節點
let dragStage = false;     // 正在平移畫布
let lastPointer = null;    // 滑鼠前一次位置
let activePacketTimers = [];

/* DOM 元素參照 */
const stage = document.getElementById('stage');
const svg = document.getElementById('svg');
const nodesEl = document.getElementById('nodes');
const wrap = document.getElementById('canvasWrap');
const logEl = document.getElementById('log');

/* ==========================================================================
   初始化與事件綁定 (Initialization & Events)
   ========================================================================== */
function init() {
    const levelSel = document.getElementById('level');
    Object.entries(levels).forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value.label;
        levelSel.appendChild(option);
    });
    levelSel.value = 'midTraditional';
    levelSel.onchange = () => loadLevel(levelSel.value);
    
    bindEvents();
    loadLevel(levelSel.value);
    applyTransform();
    startCooldownTick(); // 啟動自動降溫機制
    
    log('完整驗證版已載入');
}

function bindEvents() {
    // 流量模擬
    document.getElementById('startTraffic').onclick = () => simulateTraffic(toNumber('trafficCount', 1));
    document.getElementById('simulateBurst').onclick = () => simulateTraffic(toNumber('trafficCount', 1) * 3, true);
    
    // 資源與管理
    document.getElementById('applyResource').onclick = applyResource;
    document.getElementById('failSelected').onclick = () => {
        if (!selectedId) return;
        nodes[selectedId].failed = true;
        log('故障：' + nodes[selectedId].name);
        render();
    };
    document.getElementById('repairSelected').onclick = () => repair(selectedId);
    document.getElementById('repairAll').onclick = () => {
        Object.values(nodes).forEach(n => n.failed = false);
        log('全部節點已修復');
        render();
    };
    
    // 擴容與縮放
    document.getElementById('horizontalScale').onclick = horizontalScale;
    document.getElementById('verticalScale').onclick = verticalScale;
    document.getElementById('zoomIn').onclick = () => setZoom(scale * 1.15);
    document.getElementById('zoomOut').onclick = () => setZoom(scale / 1.15);
    document.getElementById('resetView').onclick = () => {
        scale = 0.58;
        pan = { x: 25, y: 30 };
        applyTransform();
    };
    document.getElementById('fitView').onclick = fitView;
    document.getElementById('clearPackets').onclick = clearPackets;
    
    // 畫布滾輪縮放
    wrap.onwheel = e => {
        e.preventDefault();
        const old = scale;
        const delta = e.deltaY < 0 ? 1.08 : 0.92;
        scale = Math.min(1.8, Math.max(0.25, scale * delta));
        
        const rect = wrap.getBoundingClientRect();
        const mx = e.clientX - rect.left, my = e.clientY - rect.top;
        pan.x = mx - (mx - pan.x) * (scale / old);
        pan.y = my - (my - pan.y) * (scale / old);
        applyTransform();
    };
    
    // 畫布拖曳平移
    stage.onpointerdown = e => {
        if (e.target === stage || e.target === svg) {
            dragStage = true;
            lastPointer = { x: e.clientX, y: e.clientY };
            stage.classList.add('grabbing');
        }
    };
    
    // 全域游標移動事件
    window.onpointermove = e => {
        if (dragNode) {
            moveNode(e);
        } else if (dragStage) {
            pan.x += e.clientX - lastPointer.x;
            pan.y += e.clientY - lastPointer.y;
            lastPointer = { x: e.clientX, y: e.clientY };
            applyTransform();
        }
    };
    
    // 拖曳釋放
    window.onpointerup = () => {
        dragNode = null;
        dragStage = false;
        stage.classList.remove('grabbing');
    };
}

/* ==========================================================================
   節點資料建構 (Data Constructors)
   ========================================================================== */
function makeNode(raw) {
    const [id, name, type, x, y] = raw;
    return {
        id, name, type, x, y,
        cpuLimit: 2, memoryLimit: 4,
        cpuUsage: 0,
        memoryUsage: 0,
        warnThreshold: 80, nodeLimit: 80,
        failed: false,
        weight: id.includes('1') ? 3 : id.includes('2') ? 2 : 1,
        load: 0, bytes: 0
    };
}

function loadLevel(key) {
    clearPackets();
    nodes = {};
    edges = levels[key].edges.map(([from, to]) => ({ from, to }));
    levels[key].nodes.forEach(raw => nodes[raw[0]] = makeNode(raw));
    
    selectedId = null;
    rrIndex = 0;
    queueItems = 0;
    
    // 清空現有 DOM 強制重繪
    nodesEl.innerHTML = '';
    render();
    log('載入架構：' + levels[key].label);
}

/* ==========================================================================
   畫面渲染與更新 (Rendering)
   ========================================================================== */
function render() {
    // 為了不影響正在拖曳的節點，只有當數量不對時才重建 DOM，否則只更新屬性
    if (nodesEl.children.length !== Object.keys(nodes).length) {
        nodesEl.innerHTML = '';
        Object.values(nodes).forEach(n => {
            const el = document.createElement('div');
            el.id = 'node-' + n.id;
            el.onpointerdown = e => startNodeDrag(e, n.id);
            el.onclick = e => { e.stopPropagation(); selectNode(n.id); };
            nodesEl.appendChild(el);
        });
        drawEdges();
    }
    
    updateUI();
}

/** 僅更新介面文字與狀態，不摧毀 DOM 節點 */
function updateUI() {
    Object.values(nodes).forEach(n => {
        const el = document.getElementById('node-' + n.id);
        if (el) {
            el.className = 'node ' + (n.failed ? 'failed ' : '') + (isWarn(n) ? 'warning ' : '') + (selectedId === n.id ? 'selected ' : '');
            el.style.left = n.x + 'px';
            el.style.top = n.y + 'px';
            el.innerHTML = `
                <div class="title">
                    <span>${escapeHtml(n.name)}</span>
                    <span class="badge ${n.type}">${typeBadge[n.type] || n.type}</span>
                </div>
                <div class="sub">CPU ${n.cpuLimit} Core｜MEM ${n.memoryLimit} GB｜Limit ${n.nodeLimit}</div>
                <div class="metric">CPU ${Math.round(n.cpuUsage)}%</div>
                <div class="bar"><i style="width:${Math.min(n.cpuUsage, 100)}%"></i></div>
                <div class="metric">Memory ${Math.round(n.memoryUsage)}%</div>
                <div class="bar"><i style="width:${Math.min(n.memoryUsage, 100)}%"></i></div>
                <div class="sub">Load ${n.load}｜Data ${Math.round(n.bytes)} KB</div>
            `;
        }
    });
    updateInspector();
    updateStats();
}

function drawEdges() {
    [...svg.querySelectorAll('path.edge')].forEach(el => el.remove());
    edges.forEach(edge => {
        if (!nodes[edge.from] || !nodes[edge.to]) return;
        const a = center(nodes[edge.from]), b = center(nodes[edge.to]);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${a.x} ${a.y} L ${b.x} ${b.y}`);
        path.setAttribute('class', 'edge ' + ((nodes[edge.from].failed || nodes[edge.to].failed) ? 'dead' : ''));
        path.setAttribute('marker-end', 'url(#arrow)');
        svg.appendChild(path);
    });
}

function updateInspector() {
    const n = nodes[selectedId];
    const info = document.getElementById('selectedInfo');
    if (!n) {
        info.innerHTML = '<p>尚未選取節點。</p>';
        ['cpuLimit', 'memoryLimit', 'cpuUsage', 'memoryUsage', 'warnThreshold', 'nodeLimit'].forEach(id => document.getElementById(id).value = '');
        return;
    }
    info.innerHTML = `
        <div class="stat"><span>名稱</span><b>${escapeHtml(n.name)}</b></div>
        <div class="stat"><span>類型</span><b>${typeBadge[n.type]}</b></div>
        <div class="stat"><span>狀態</span><b>${n.failed ? '故障' : '正常'}</b></div>
        <div class="stat"><span>累積資料</span><b>${Math.round(n.bytes)} KB</b></div>
    `;
    document.getElementById('cpuLimit').value = n.cpuLimit;
    document.getElementById('memoryLimit').value = n.memoryLimit;
    document.getElementById('cpuUsage').value = Math.round(n.cpuUsage);
    document.getElementById('memoryUsage').value = Math.round(n.memoryUsage);
    document.getElementById('warnThreshold').value = n.warnThreshold;
    document.getElementById('nodeLimit').value = n.nodeLimit;
    showGuide();
}

function updateStats() {
    const html = Object.values(nodes)
        .filter(n => n.type !== 'client')
        .map(n => `<div class="stat"><span>${escapeHtml(n.name)}</span><b>${n.failed ? '故障' : n.load + ' req'} / ${Math.round(n.bytes)} KB</b></div>`)
        .join('');
    document.getElementById('stats').innerHTML = html + `<div class="stat"><span>Queue 目前排隊</span><b>${queueItems}</b></div>`;
}

function showGuide() {
    const n = nodes[selectedId];
    const guide = document.getElementById('repairGuide');
    if (!n) {
        guide.innerHTML = '<p>選取節點後會顯示對應修復方向。</p>';
        return;
    }
    const cmd = {
        nginx: 'sudo nginx -t\nsudo systemctl status nginx\nsudo systemctl restart nginx',
        pm2: 'pm2 status\npm2 restart all\npm2 logs --lines 100',
        container: 'docker ps -a\ndocker logs <container> --tail 100\ndocker restart <container>',
        app: '檢查 app log / health check\npm2 restart app 或 docker restart app',
        vm: 'gcloud compute instances describe <vm>\ngcloud compute instances reset <vm>',
        queue: '檢查 queue depth / consumer lag\n增加 consumer 數量\n提高 queue capacity 或處理速率',
        db: '檢查連線數、慢查詢、磁碟、replica 狀態\n必要時垂直升規或讀寫分離',
        k8s: 'kubectl get pods -o wide\nkubectl describe pod <pod>\nkubectl rollout restart deploy/<name>',
        'gcp-lb': '檢查 Backend Health Check / Firewall / Instance Group\n確認 unhealthy backend',
        'k8s-service': 'kubectl describe svc <service>\nkubectl get endpoints'
    }[n.type] || '檢查 log、資源限制、網路與健康檢查。';
    
    guide.innerHTML = `
        <p><b>${escapeHtml(n.name)}</b> 修復方向：</p>
        <div class="code">${escapeHtml(cmd)}</div>
        <p>按「修復 / 重啟」會讓節點恢復、紅光消失，後續流量會重新納入分配。</p>
    `;
}

/* ==========================================================================
   節點操作與擴容機制 (Node Operations & Scaling)
   ========================================================================== */
function applyResource() {
    const n = nodes[selectedId];
    if (!n) return;
    n.cpuLimit = toNumber('cpuLimit', n.cpuLimit);
    n.memoryLimit = toNumber('memoryLimit', n.memoryLimit);
    n.cpuUsage = toNumber('cpuUsage', n.cpuUsage);
    n.memoryUsage = toNumber('memoryUsage', n.memoryUsage);
    n.warnThreshold = toNumber('warnThreshold', n.warnThreshold);
    n.nodeLimit = toNumber('nodeLimit', n.nodeLimit);
    log('套用資源設定：' + n.name);
    updateUI();
}

function repair(id) {
    const n = nodes[id];
    if (!n) return;
    n.failed = false;
    n.cpuUsage = Math.max(8, Math.round(n.cpuUsage * 0.55));
    n.memoryUsage = Math.max(8, Math.round(n.memoryUsage * 0.65));
    log('修復 / 重啟完成：' + n.name);
    render();
}

function verticalScale() {
    const n = nodes[selectedId];
    if (!n) return;
    n.cpuLimit = +(n.cpuLimit * 2).toFixed(1);
    n.memoryLimit = +(n.memoryLimit * 2).toFixed(1);
    n.nodeLimit = Math.ceil(n.nodeLimit * 1.6);
    n.cpuUsage = Math.max(5, Math.round(n.cpuUsage * 0.55));
    n.memoryUsage = Math.max(5, Math.round(n.memoryUsage * 0.65));
    log('垂直升規：' + n.name);
    updateUI();
}

function horizontalScale() {
    const bal = findBalanceNode();
    if (!bal) { log('找不到可水平擴容的位置'); return; }
    
    const siblings = outgoing(bal.id).filter(n => ['app', 'k8s', 'vm'].includes(n.type));
    const base = siblings[siblings.length - 1] || bal;
    const id = 'scale' + Date.now().toString().slice(-5);
    const type = (base.type === 'k8s') ? 'k8s' : 'app';
    
    nodes[id] = makeNode([id, '新增 ' + (type === 'k8s' ? 'Pod' : 'App VM'), type, base.x, base.y + 180]);
    edges.push({ from: bal.id, to: id });
    
    const downstream = findDownstream(base.id);
    if (downstream) edges.push({ from: id, to: downstream.id });
    
    log('水平擴容：在 ' + bal.name + ' 後方新增 ' + nodes[id].name);
    render();
}

/* 自動降溫機制 (Auto Cooldown) */
function startCooldownTick() {
    setInterval(() => {
        let needsUpdate = false;
        Object.values(nodes).forEach(n => {
            if (n.type === 'client' || n.failed) return;
            
            // 每秒緩降 CPU/Memory 模擬閒置資源回收
            if (n.cpuUsage > 0) {
                n.cpuUsage = Math.max(0, n.cpuUsage - 2.5);
                needsUpdate = true;
            }
            if (n.memoryUsage > 0) {
                n.memoryUsage = Math.max(0, n.memoryUsage - 1.5);
                needsUpdate = true;
            }
        });
        
        if (needsUpdate) {
            updateUI();
        }
    }, 1000);
}

/* ==========================================================================
   路由與網路模擬邏輯 (Routing & Simulation)
   ========================================================================== */
function chooseTarget(from, requestIndex) {
    let targets = outgoing(from.id).filter(n => !n.failed);
    if (!targets.length) return null;
    if (targets.length === 1) return targets[0];
    
    const mode = document.getElementById('balanceAt').value;
    const shouldBalance = mode === 'auto' || 
                          (mode === 'first' && from.id === findBalanceNode()?.id) || 
                          (mode !== 'first' && mode !== 'auto' && from.type === mode);
                          
    if (!shouldBalance) return targets[0];
    
    const alg = document.getElementById('algorithm').value;
    if (alg === 'random') return targets[Math.floor(Math.random() * targets.length)];
    if (alg === 'leastConnection') return targets.slice().sort((a, b) => (a.load || 0) - (b.load || 0))[0];
    if (alg === 'weighted') {
        const bag = [];
        targets.forEach(t => { for (let i = 0; i < (t.weight || 1); i++) bag.push(t); });
        return bag[Math.floor(Math.random() * bag.length)];
    }
    if (alg === 'ipHash') {
        const clientCount = Math.max(1, toNumber('clientCount', 1));
        const clientId = requestIndex % clientCount;
        let hash = 0;
        const key = '192.168.1.' + (clientId + 1);
        for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
        return targets[hash % targets.length];
    }
    
    // Default: Round Robin
    const target = targets[rrIndex % targets.length];
    rrIndex++;
    return target;
}

function buildPath(requestIndex) {
    const start = nodes.user || Object.values(nodes)[0];
    const path = [start];
    let current = start;
    let guard = 0;
    while (guard++ < 30) {
        if (current.failed) break;
        const next = chooseTarget(current, requestIndex);
        if (!next) break;
        path.push(next);
        current = next;
        if (current.type === 'db') break;
    }
    return path;
}

function simulateTraffic(count, burst = false) {
    // 不在此重設 load/bytes，讓降溫機制或累加歷史來處理，比較符合現實。
    // 但是為了突發動畫不要卡住，還是重設一下 rrIndex。
    rrIndex = 0;
    const cap = toNumber('queueCapacity', 0);
    const rate = Math.max(1, toNumber('queueRate', 1));
    const overflow = document.getElementById('overflowMode').value;
    const packetSize = toNumber('packetSize', 1);
    
    let delay = 0;
    let dropped = 0;
    
    for (let i = 0; i < count; i++) {
        const path = buildPath(i);
        if (path.length < 2) {
            dropped++;
            log('無可用路徑：可能入口或關鍵節點故障');
            continue;
        }
        
        const qIndex = path.findIndex(n => n.type === 'queue');
        if (qIndex >= 0) {
            if (queueItems >= cap && overflow !== 'wait') {
                animatePath(path.slice(0, qIndex + 1), 'drop', delay, packetSize);
                dropped++;
                log((overflow === 'reject' ? '429 拒絕' : 'Drop 丟棄') + '：Queue 超過 limit');
                delay += burst ? 45 : 90;
                continue;
            }
            queueItems++;
            const processDelay = Math.floor(queueItems / rate) * 700;
            setTimeout(() => {
                queueItems = Math.max(0, queueItems - 1);
                updateStats();
            }, delay + processDelay + 1000);
            animatePath(path, 'normal', delay + processDelay, packetSize);
        } else {
            animatePath(path, 'normal', delay, packetSize);
        }
        delay += burst ? 65 : 130;
    }
    
    log(`送出 ${count} 筆流量，Drop/Reject ${dropped} 筆，演算法：${document.getElementById('algorithm').selectedOptions[0].textContent}`);
    updateUI();
}

function animatePath(path, mode, delay, packetSize) {
    const validPath = [];
    for (const n of path) {
        validPath.push(n);
        if (n.failed) break;
    }
    
    // 即時提升資源使用率 (CPU 與 Memory 增加量根據 packetSize)
    validPath.forEach(n => {
        n.load = (n.load || 0) + 1;
        n.bytes = (n.bytes || 0) + packetSize;
        n.cpuUsage = Math.min(300, n.cpuUsage + Math.max(1.5, packetSize / 256));
        n.memoryUsage = Math.min(300, n.memoryUsage + Math.max(1.0, packetSize / 512));
    });
    
    const duration = toNumber('speed', 2600);
    const segments = [];
    for (let i = 0; i < validPath.length - 1; i++) {
        segments.push([center(validPath[i]), center(validPath[i + 1])]);
    }
    if (!segments.length) return;
    
    const timer = setTimeout(() => {
        updateUI(); // 開始走動畫時更新一下 UI
        const packet = document.createElement('div');
        packet.className = 'packet ' + (mode === 'drop' ? 'drop' : 'req');
        stage.appendChild(packet);
        
        moveAlongSegments(packet, segments, duration, () => {
            if (mode === 'drop') {
                packet.remove();
                // 丟棄時，釋放佔用的連線數
                validPath.forEach(n => n.load = Math.max(0, n.load - 1));
                return;
            }
            packet.className = 'packet res';
            const reverse = segments.slice().reverse().map(([a, b]) => [b, a]);
            moveAlongSegments(packet, reverse, duration, () => {
                packet.remove();
                // 正常回傳結束，釋放佔用的連線數
                validPath.forEach(n => n.load = Math.max(0, n.load - 1));
            });
        });
    }, delay);
    activePacketTimers.push(timer);
}

function moveAlongSegments(el, segments, duration, done) {
    let total = segments.reduce((sum, [a, b]) => sum + Math.hypot(b.x - a.x, b.y - a.y), 0);
    if (total <= 0) { done && done(); return; }
    
    const start = performance.now();
    function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        let dist = t * total, acc = 0;
        for (let i = 0; i < segments.length; i++) {
            const [a, b] = segments[i];
            const len = Math.hypot(b.x - a.x, b.y - a.y);
            if (dist <= acc + len || i === segments.length - 1) {
                const local = len === 0 ? 1 : Math.max(0, Math.min(1, (dist - acc) / len));
                el.style.left = (a.x + (b.x - a.x) * local) + 'px';
                el.style.top = (a.y + (b.y - a.y) * local) + 'px';
                break;
            }
            acc += len;
        }
        if (t < 1) requestAnimationFrame(frame);
        else done && done();
    }
    requestAnimationFrame(frame);
}

/* ==========================================================================
   實用工具與畫布管理 (Utils & Helpers)
   ========================================================================== */
function center(n) { return { x: n.x + 92, y: n.y + 50 }; }

function isWarn(n) {
    return !n.failed && (n.cpuUsage >= n.warnThreshold || n.memoryUsage >= n.warnThreshold || n.load > n.nodeLimit);
}

function findDownstream(id) {
    return outgoing(id).find(n => n.type === 'queue' || n.type === 'db' || n.type === 'k8s-service' || n.type === 'app' || n.type === 'k8s');
}

function findBalanceNode() {
    const mode = document.getElementById('balanceAt').value;
    if (mode === 'first' || mode === 'auto') return Object.values(nodes).find(n => outgoing(n.id).length > 1 && !n.failed);
    const candidates = Object.values(nodes).filter(n => n.type === mode && !n.failed && outgoing(n.id).length > 1);
    return candidates[0] || Object.values(nodes).find(n => outgoing(n.id).length > 1 && !n.failed);
}

function outgoing(id) {
    return edges.filter(e => e.from === id).map(e => nodes[e.to]).filter(Boolean);
}

function setZoom(value) {
    scale = Math.min(1.8, Math.max(0.25, value));
    applyTransform();
}

function applyTransform() {
    stage.style.transform = `translate(${pan.x}px,${pan.y}px) scale(${scale})`;
}

function fitView() {
    scale = 0.48;
    pan = { x: 35, y: 45 };
    applyTransform();
}

function startNodeDrag(e, id) {
    e.stopPropagation();
    selectNode(id);
    const n = nodes[id];
    dragNode = { id, dx: (e.clientX - pan.x) / scale - n.x, dy: (e.clientY - pan.y) / scale - n.y };
}

function moveNode(e) {
    const n = nodes[dragNode.id];
    n.x = (e.clientX - pan.x) / scale - dragNode.dx;
    n.y = (e.clientY - pan.y) / scale - dragNode.dy;
    const el = document.getElementById('node-' + n.id);
    if (el) {
        el.style.left = n.x + 'px';
        el.style.top = n.y + 'px';
    }
    drawEdges();
}

function selectNode(id) {
    selectedId = id;
    updateUI();
}

function clearPackets() {
    activePacketTimers.forEach(t => clearTimeout(t));
    activePacketTimers = [];
    document.querySelectorAll('.packet').forEach(el => el.remove());
}

function toNumber(id, fallback) {
    const value = Number(document.getElementById(id).value);
    return Number.isFinite(value) ? value : fallback;
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}

function log(message) {
    const time = new Date().toLocaleTimeString('zh-TW', { hour12: false });
    logEl.innerHTML = `<div>[${time}] ${escapeHtml(message)}</div>` + logEl.innerHTML;
}

// 啟動應用程式
init();
