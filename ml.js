/**
 * @file ml.js
 * @description 核心邏輯與動畫狀態管理腳本
 * @author 資深工程師
 */

const rand = (min, max) => Math.random() * (max - min) + min;
        const clear = el => el.innerHTML = '';
        function dot(parent, x, y, color = '#38bdf8', size = 10) {
            const d = document.createElement('div'); d.className = 'dot'; d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.background = color; d.style.width = size + 'px'; d.style.height = size + 'px'; parent.appendChild(d); return d;
        }
        function bar(parent, x, h, color) { const b = document.createElement('div'); b.className = 'bar'; b.style.left = x + 'px'; b.style.height = h + 'px'; if (color) b.style.background = color; parent.appendChild(b); return b; }
        function text(parent, s, x, y, cls = 'token') { const t = document.createElement('div'); t.className = cls; t.textContent = s; t.style.left = x + 'px'; t.style.top = y + 'px'; parent.appendChild(t); return t; }
        function line(parent, x, y, len, angle, color = 'rgba(255,255,255,.55)') { const l = document.createElement('div'); l.className = 'line-seg'; l.style.left = x + 'px'; l.style.top = y + 'px'; l.style.width = len + 'px'; l.style.transform = `rotate(${angle}deg)`; l.style.background = color; parent.appendChild(l); return l; }
        function matrix(parent, val, x, y, w = 42, h = 34) { const c = document.createElement('div'); c.className = 'matrix-cell'; c.textContent = val; c.style.left = x + 'px'; c.style.top = y + 'px'; c.style.width = w + 'px'; c.style.height = h + 'px'; parent.appendChild(c); return c; }
        function getCanvas(card) { return card.querySelector('.canvas'); }
        function getOutput(card) { return card.querySelector('.output'); }
        function animate(card) {
            const kind = card.dataset.kind; const canvas = getCanvas(card); const output = getOutput(card); clear(canvas); if (output) output.textContent = '';
            const w = canvas.clientWidth, h = canvas.clientHeight;
            if (kind === 'missing') {
                const vals = [50, 90, null, 130, 70, null, 115, 95]; const strategy = +card.querySelector('input')?.value || 1; const fill = [65, 95, 100][strategy];
                vals.forEach((v, i) => { const x = 28 + i * (w - 60) / 7; if (v === null) { text(canvas, '?', x, 120); setTimeout(() => text(canvas, fill, x, 60), 500 + i * 80); } else bar(canvas, x, v); });
                output.textContent = ['平均數', '中位數', '模型預測'][strategy] + '補值';
            }
            if (kind === 'outlier') {
                const threshold = +card.querySelector('input')?.value || 2;
                for (let i = 0; i < 34; i++) dot(canvas, rand(50, w - 80), rand(70, 155), '#38bdf8', 9);
                const count = 5 - threshold; for (let i = 0; i < count; i++) dot(canvas, rand(w - 110, w - 40), rand(25, 65), '#fb7185', 13);
                line(canvas, 40, 60, w - 80, 0, 'rgba(251,113,133,.5)'); line(canvas, 40, 175, w - 80, 0, 'rgba(251,113,133,.5)');
                output.textContent = '門檻越嚴，標記的 outlier 越多';
            }
            if (kind === 'onehot') {
                ['Taipei', 'Tokyo', 'Seoul'].forEach((c, i) => text(canvas, c, 30, 35 + i * 50));['Taipei', 'Tokyo', 'Seoul'].forEach((c, i) => matrix(canvas, c, 180 + i * 70, 20, 62, 30));
                ['Taipei', 'Tokyo', 'Seoul'].forEach((c, r) => { for (let col = 0; col < 3; col++) { setTimeout(() => matrix(canvas, r === col ? '1' : '0', 180 + col * 70, 70 + r * 38, 62, 30), 300 + r * 200 + col * 80); } });
                output.textContent = '類別 → 多欄 0/1';
            }
            if (kind === 'embedding') {
                const dim = +card.querySelector('input')?.value || 4;['user_17', 'user_91', 'user_203'].forEach((u, i) => text(canvas, u, 25, 35 + i * 55));
                for (let r = 0; r < 3; r++) { for (let c = 0; c < dim; c++) { setTimeout(() => matrix(canvas, (Math.random() * 2 - 1).toFixed(1), 160 + c * 48, 30 + r * 55, 42, 32), 200 + r * 160 + c * 40); } }
                output.textContent = 'Embedding 維度：' + dim;
            }
            if (kind === 'standard' || kind === 'minmax') {
                const data = [30, 120, 60, 180, 90, 150, 70]; data.forEach((v, i) => bar(canvas, 35 + i * 45, v));
                setTimeout(() => { clear(canvas); data.forEach((v, i) => bar(canvas, 35 + i * 45, kind === 'standard' ? rand(55, 140) : (v / 180) * 160)); line(canvas, 20, 150, w - 40, 0, 'rgba(52,211,153,.55)'); }, 750);
                output.textContent = kind === 'standard' ? '中心化 + 標準差縮放' : '壓縮到 0～1';
            }
            if (kind === 'split') {
                const ratio = +card.querySelector('input')?.value || 70; const n = 24; for (let i = 0; i < n; i++) { const color = i < n * ratio / 100 ? '#34d399' : (i < n * .9 ? '#fbbf24' : '#fb7185'); dot(canvas, 30 + i * (w - 60) / n, 105, color, 14); }
                text(canvas, 'Train', 35, 35); text(canvas, 'Validation', w * 0.63, 35); text(canvas, 'Test', w * 0.83, 35); output.textContent = `Train ${ratio}% / 其餘驗證測試`;
            }
            if (kind === 'kfold') {
                const k = +card.querySelector('input')?.value || 5; for (let row = 0; row < k; row++) { for (let col = 0; col < k; col++) { matrix(canvas, col === row ? 'Valid' : 'Train', 30 + col * (w - 70) / k, 25 + row * 32, (w - 90) / k, 24); } } output.textContent = 'K = ' + k;
            }
            if (kind === 'pca') {
                const angle = +card.querySelector('input')?.value || 35; for (let i = 0; i < 38; i++) { const x = rand(70, w - 90), y = 120 + (x - w / 2) * .35 + rand(-28, 28); dot(canvas, x, y, '#38bdf8', 8); } line(canvas, w / 2 - 110, h / 2, 220, angle, '#34d399'); output.textContent = '投影到最大變異方向';
            }
            if (kind === 'poly') {
                const degree = +card.querySelector('input')?.value || 2; for (let i = 0; i < 20; i++) { const x = 30 + i * (w - 60) / 20; const y = h - 40 - Math.pow(i / 20, degree) * 150; dot(canvas, x, y, '#38bdf8', 8); } output.textContent = 'degree = ' + degree;
            }
            if (kind === 'smote') {
                const synthetic = +card.querySelector('input')?.value || 6; for (let i = 0; i < 30; i++) dot(canvas, rand(40, w - 80), rand(45, 170), '#38bdf8', 8); for (let i = 0; i < 5; i++) dot(canvas, rand(w - 130, w - 70), rand(70, 140), '#fb7185', 12); for (let i = 0; i < synthetic; i++) setTimeout(() => dot(canvas, rand(w - 150, w - 50), rand(65, 155), '#fbbf24', 10), i * 120); output.textContent = '合成少數類：' + synthetic + ' 筆';
            }
            if (kind === 'classweight') {
                const weight = +card.querySelector('input')?.value || 5; bar(canvas, 70, 70, 'linear-gradient(#38bdf8,#1d4ed8)'); bar(canvas, 180, 25 * weight, 'linear-gradient(#fb7185,#be123c)'); text(canvas, '多數類', 55, 175); text(canvas, '少數類權重 x' + weight, 150, 175); output.textContent = '提高少數類錯誤成本';
            }
            if (kind === 'token') {
                const sentence = text(canvas, '我喜歡機器學習', 40, 35); const tokens = ['我', '喜歡', '機器', '學習']; tokens.forEach((t, i) => setTimeout(() => text(canvas, t, 60 + i * 80, 125), 400 + i * 160)); output.textContent = 'Sentence → Tokens → IDs';
            }
            if (kind === 'tfidf') {
                ['貓', '狗', 'AI', '學習', '資料'].forEach((t, i) => text(canvas, t, 35 + i * 70, 40));[35, 80, 150, 110, 95].forEach((v, i) => setTimeout(() => bar(canvas, 45 + i * 70, v), 300 + i * 100)); output.textContent = '詞頻 × 逆文件頻率';
            }
            if (kind === 'imageaug') {
                const angle = +card.querySelector('input')?.value || 15; const img = document.createElement('div'); img.className = 'image-cell'; img.style.width = '120px'; img.style.height = '120px'; img.style.left = '55px'; img.style.top = '45px'; img.style.background = 'linear-gradient(135deg,#38bdf8,#a78bfa)'; canvas.appendChild(img); setTimeout(() => { img.style.left = '230px'; img.style.transform = `rotate(${angle}deg) scaleX(-1)`; }, 400); output.textContent = 'Flip + Rotate ' + angle + '°';
            }
            if (kind === 'normalizeimg') {
                for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const v = Math.floor(rand(0, 255)); const cell = matrix(canvas, v, 35 + c * 48, 25 + r * 42, 42, 34); setTimeout(() => cell.textContent = (v / 255).toFixed(2), 700); } output.textContent = '0～255 → 0～1';
            }
            if (kind === 'window') {
                const size = +card.querySelector('input')?.value || 5; const values = Array.from({ length: 13 }, (_, i) => 90 + Math.sin(i * .8) * 45 + rand(-10, 10)); values.forEach((v, i) => dot(canvas, 25 + i * (w - 60) / 12, h - v, '#38bdf8', 8)); for (let i = 0; i < values.length - 1; i++) line(canvas, 25 + i * (w - 60) / 12, h - values[i] + 4, (w - 60) / 12, Math.atan2(values[i] - values[i + 1], (w - 60) / 12) * 180 / Math.PI, 'rgba(56,189,248,.55)'); const box = document.createElement('div'); box.style.position = 'absolute'; box.style.left = '20px'; box.style.top = '35px'; box.style.width = (size * (w - 60) / 12) + 'px'; box.style.height = '150px'; box.style.border = '2px solid #34d399'; box.style.borderRadius = '12px'; box.style.transition = '.8s ease'; canvas.appendChild(box); setTimeout(() => box.style.left = (w / 2) + 'px', 700); output.textContent = 'Window size = ' + size;
            }
            if (kind === 'rolling') {
                const days = +card.querySelector('input')?.value || 4; const values = [70, 100, 60, 130, 90, 140, 110, 160, 120]; values.forEach((v, i) => bar(canvas, 25 + i * 42, v)); setTimeout(() => { for (let i = days - 1; i < values.length; i++) { const avg = values.slice(i - days + 1, i + 1).reduce((a, b) => a + b) / days; dot(canvas, 25 + i * 42, h - 18 - avg, '#34d399', 10); } }, 500); output.textContent = 'Rolling window = ' + days + ' 天';
            }
        }
        document.querySelectorAll('.algo').forEach(card => {
            card.querySelector('button')?.addEventListener('click', () => animate(card));
            card.querySelector('input')?.addEventListener('input', () => animate(card));
            animate(card);
        });