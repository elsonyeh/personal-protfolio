# 網站設置與個人化指南

## 📁 完整檔案架構說明

```
個人網站/
├── 📄 index.html                   # 主頁面文件 (約700行)
│   ├── 🏠 首頁區域 (#home)
│   ├── 👤 關於我區域 (#about)
│   ├── 📅 經歷時間軸 (#timeline)
│   ├── 💼 作品集區域 (#portfolio)
│   ├── 🏆 證書成就區域 (#achievements)
│   ├── 🛠️ 專業技能區域 (#skills-tools)
│   └── 📧 聯絡區域 (#contact)
│
├── 🎨 styles.css                   # 樣式表文件 (約1580行)
│   ├── 🌈 全局變數與顏色主題
│   ├── 📱 響應式設計 (1024px, 768px, 480px 斷點)
│   ├── ✨ 動畫效果與過渡
│   ├── 🎯 各區域專屬樣式
│   └── 🎪 互動效果與懸停狀態
│
├── ⚡ script.js                    # JavaScript功能 (約670行)
│   ├── 🌟 粒子背景動畫系統
│   ├── 📜 滾動動畫與視差效果
│   ├── 🎭 載入畫面與轉場動畫
│   ├── 🔄 作品集過濾與彈窗系統
│   ├── 📊 技能進度條動畫
│   ├── ⌨️ 打字機效果
│   └── 📞 表單處理與互動
│
├── 📖 README.md                    # 完整說明文件
├── 📋 SETUP.md                     # 快速設置指南 (本文件)
├── 📦 assets/                      # 靜態資源資料夾
└── 🖼️ images/                      # 圖片資源資料夾
    ├── 💼 projects/                # 專案相關圖片
    │   ├── tastebuddies-screenshot.jpg
    │   ├── tastebuddies-demo.png
    │   ├── fintech-website.jpg
    │   ├── fintech-dashboard.png
    │   ├── leadership-activities.jpg
    │   ├── event-planning.jpg
    │   ├── skills-demo.jpg
    │   └── coding-showcase.png
    │
    ├── 🏆 certificates/            # 證書與認證
    │   ├── react-native-cert.jpg
    │   ├── firebase-cert.jpg
    │   ├── ui-ux-cert.jpg
    │   ├── javascript-cert.pdf
    │   ├── python-cert.pdf
    │   └── other-certificates/
    │       ├── agile-development.jpg
    │       ├── git-github.jpg
    │       └── figma-design.jpg
    │
    ├── 🎖️ achievements/             # 成就與獎項
    │   ├── student-leadership.jpg
    │   ├── academic-awards.jpg
    │   ├── dean-list.pdf
    │   ├── scholarship-award.jpg
    │   ├── event-photos/
    │   │   ├── student-council.jpg
    │   │   ├── event-800-people.jpg
    │   │   ├── mental-health-campaign.jpg
    │   │   └── club-expo.jpg
    │   └── competition-awards/
    │       ├── hackathon-winner.jpg
    │       ├── coding-competition.jpg
    │       └── presentation-award.jpg
    │
    └── 👤 profile/                 # 個人照片
        ├── profile-main.jpg        # 主要展示照片 (建議 400x400px)
        ├── profile-formal.jpg      # 正式場合照片
        ├── profile-casual.jpg      # 日常照片
        ├── profile-presentation.jpg # 簡報場合照片
        └── profile-team.jpg        # 團隊合作照片
```

## 📊 檔案大小與技術規格

### 核心文件統計
- **index.html**: 約 700 行，包含完整的語意化HTML結構
- **styles.css**: 約 1580 行，現代化CSS3特效與響應式設計
- **script.js**: 約 670 行，ES6+ JavaScript互動功能
- **總計代碼行數**: 約 2950 行

### 技術架構特色
- 🎨 **純CSS動畫**: 無需額外庫依賴的流暢動畫效果
- ⚡ **原生JavaScript**: 高效能的原生JS實作，載入速度快
- 📱 **響應式優先**: Mobile-first設計理念
- 🎯 **SEO友善**: 語意化HTML標籤與結構
- 🔧 **模組化設計**: 易於維護和擴展的程式碼結構

## 📸 如何添加個人照片

### 1. 準備照片
將你的照片放入對應資料夾：

**個人照片建議規格**
- `images/profile/profile-main.jpg` - 主要照片 (建議 400x400px, 正方形)
- `images/profile/profile-formal.jpg` - 正式照片 (建議 300x400px)
- `images/profile/profile-casual.jpg` - 休閒照片 (建議 300x400px)

**專案截圖建議規格**
- `images/projects/` - 專案截圖 (建議 800x600px 或 1200x800px)
- 支援格式：JPG, PNG, WebP
- 建議檔案大小：< 500KB

**證書照片建議規格**
- `images/certificates/` - 證書照片 (建議 600x400px)
- 建議使用高解析度掃描或照片
- 支援格式：JPG, PNG, PDF

**成就相關圖片**
- `images/achievements/` - 成就照片 (建議 400x300px)
- 活動照片建議 800x600px
- 獎狀證書可使用 PDF 格式

### 2. 更新照片路徑
在 `index.html` 中找到相應的 `<img>` 標籤，更新 `src` 屬性：

```html
<!-- 例如：證書圖片 -->
<img src="images/certificates/你的證書.jpg" alt="證書名稱">

<!-- 例如：專案截圖 -->
<img src="images/projects/你的專案截圖.png" alt="專案名稱">
```

## 🎯 快速個人化清單

### ✅ 基本資訊更新
- [ ] 姓名（已更新為：葉昱辰）
- [ ] 聯絡資訊（Email: elson921121@gmail.com, 電話: 0988-111203）
- [ ] GitHub 連結
- [ ] 學校資訊（已更新為：國立中山大學）

### ✅ 內容更新
- [ ] 個人介紹文字
- [ ] 技能列表與百分比
- [ ] 時間軸經歷
- [ ] 作品集項目
- [ ] 證書與成就
- [ ] 聯絡表單

## 📊 如何調整技能百分比

在 `index.html` 的技能區域找到：

```html
<div class="skill-bar">
    <div class="skill-info">
        <span class="skill-name">JavaScript</span>
        <span class="skill-percentage">85%</span>
    </div>
    <div class="skill-progress">
        <div class="progress-fill" data-width="85"></div>
    </div>
</div>
```

同時更新：
1. `skill-percentage` 中的百分比文字
2. `data-width` 屬性的數值

## 🏆 如何更新證書與成就

### 添加新證書：
```html
<div class="certificate-item">
    <div class="certificate-image">
        <img src="images/certificates/新證書.jpg" alt="證書名稱">
    </div>
    <div class="certificate-info">
        <h4>證書標題</h4>
        <p>證書描述</p>
        <span class="cert-date">年份</span>
    </div>
</div>
```

### 更新學術成績：
```html
<div class="gpa-item">
    <span class="gpa-label">主修GPA</span>
    <span class="gpa-value">你的GPA/4.0</span>
</div>
```

## 💼 如何添加新專案

在作品集區域添加新專案：

```html
<div class="portfolio-item [類別]" data-aos="fade-up" data-aos-delay="200">
    <div class="portfolio-image">
        <img src="images/projects/專案截圖.jpg" alt="專案名稱">
        <div class="portfolio-overlay">
            <div class="portfolio-actions">
                <button class="action-btn" onclick="openProjectModal('專案ID')">
                    <i class="fas fa-eye"></i>
                </button>
                <!-- 其他按鈕 -->
            </div>
        </div>
    </div>
    <div class="portfolio-content">
        <h3>專案標題</h3>
        <p>專案簡短描述</p>
        <div class="portfolio-tech">
            <span class="tech-tag">技術1</span>
            <span class="tech-tag">技術2</span>
        </div>
    </div>
</div>
```

然後在 `script.js` 的 `projectData` 中添加詳細資訊：

```javascript
'專案ID': {
    title: '專案標題',
    description: '詳細描述',
    image: 'images/projects/專案截圖.jpg',
    video: 'YouTube嵌入連結',
    tech: ['技術1', '技術2'],
    demoLink: '實際連結',
    codeLink: 'GitHub連結',
    presentationLink: '簡報連結'
}
```

## 🎨 如何自定義顏色主題

在 `styles.css` 的 `:root` 區域修改：

```css
:root {
    --primary-color: #你的主色;
    --secondary-color: #你的次要色;
    --accent-color: #你的強調色;
}
```

建議顏色搭配：
- 藍紫漸層：`#667eea` → `#764ba2`
- 粉紅漸層：`#f093fb` → `#f5576c`
- 綠色系：`#4CAF50` → `#45a049`

## 🌐 部署前檢查清單

- [ ] 所有圖片檔案都已正確放置
- [ ] 個人資訊已完全更新
- [ ] 連結都指向正確的目標
- [ ] 在不同設備上測試響應式設計
- [ ] 檢查所有動畫和互動功能
- [ ] 確認聯絡資訊正確無誤

## 📱 測試響應式設計

使用瀏覽器開發者工具測試以下尺寸：
- 📱 iPhone (375px)
- 📱 Android (360px)
- 📱 iPad (768px)
- 💻 筆電 (1024px)
- 🖥️ 桌機 (1200px+)

## 🚀 部署選項

### GitHub Pages（推薦）
1. 創建新的 GitHub 儲存庫
2. 上傳所有文件
3. 在 Settings > Pages 啟用 GitHub Pages
4. 選擇 main 分支作為源

### Netlify
1. 打開 [netlify.com](https://netlify.com)
2. 拖拽整個資料夾到部署區域
3. 等待自動部署完成

### Vercel
1. 打開 [vercel.com](https://vercel.com)
2. 連接 GitHub 儲存庫
3. 自動部署和 CI/CD

## 📞 需要幫助？

如果遇到問題：
1. 檢查瀏覽器開發者工具的 Console
2. 確認文件路徑正確
3. 驗證 HTML 和 CSS 語法
4. 測試在不同瀏覽器中的相容性