# 葉昱辰個人作品集網站

這是一個現代化、響應式的個人作品集網站，專為國立中山大學人文暨科技跨領域學士學位學程學生打造，展示個人技能、經歷、作品與成就。

## 📁 文件結構

```
個人網站/
├── index.html              # 主要HTML文件 - 包含完整網頁結構
├── styles.css              # CSS樣式文件 - 現代化響應式設計
├── script.js               # JavaScript功能文件 - 互動功能與動畫
├── README.md               # 說明文件 - 詳細使用指南
├── SETUP.md                # 設置指南 - 個人化操作說明
├── assets/                 # 靜態資源資料夾
└── images/                 # 圖片資源資料夾
    ├── projects/           # 專案截圖
    │   ├── tastebuddies-screenshot.jpg    # TasteBuddies App截圖
    │   ├── fintech-website.jpg            # 金融科技網站截圖
    │   ├── leadership-activities.jpg      # 學生活動照片
    │   └── skills-demo.jpg                # 技能展示截圖
    ├── certificates/       # 證書圖片
    │   ├── react-native-cert.jpg          # React Native認證
    │   ├── firebase-cert.jpg              # Firebase認證
    │   ├── ui-ux-cert.jpg                 # UI/UX設計認證
    │   └── other-certificates/            # 其他證書
    ├── achievements/       # 成就相關圖片
    │   ├── student-leadership.jpg         # 學生領導獎項
    │   ├── academic-awards.jpg            # 學術獎項
    │   ├── event-photos/                  # 活動照片
    │   └── competition-awards.jpg         # 競賽獎項
    └── profile/           # 個人照片
        ├── profile-main.jpg               # 主要個人照片
        ├── profile-formal.jpg             # 正式照片
        └── profile-casual.jpg             # 休閒照片
```

## 📂 詳細文件說明

### 🏠 核心文件
- **index.html** (主頁面)
  - 完整的網頁結構
  - 包含首頁、關於我、經歷時間軸、修課歷程、作品集、證書成就、專業技能、聯絡等8個主要區域
  - 響應式設計，支援各種設備

- **styles.css** (樣式表)
  - 1500+ 行現代化CSS
  - 包含漸層背景、毛玻璃效果、動畫效果
  - 完整的響應式設計（支援手機、平板、桌面）
  - 自定義CSS變數，方便主題調整

- **script.js** (JavaScript功能)
  - 粒子背景動畫效果
  - 滾動視差與滑順動畫
  - 作品集過濾與彈窗功能
  - 技能進度條動畫
  - 統計數字動畫效果
  - 打字機效果
  - 表單互動功能

### 📚 說明文件
- **README.md** - 完整的使用說明與自定義指南
- **SETUP.md** - 快速設置與個人化操作指南

### 📁 資源資料夾結構
- **assets/** - 靜態資源（CSS/JS相關資源）
- **images/** - 圖片資源，已分類組織便於管理

## 🎨 主要特色

- ✨ **現代化設計**: 使用漸層色彩和毛玻璃效果
- 📱 **響應式布局**: 完美支援桌面和手機設備
- 🚀 **流暢動畫**: 滑順的滾動效果和互動動畫
- 🌟 **粒子背景**: 動態粒子連線效果
- ⚡ **高性能**: 優化的JavaScript和CSS
- 🎯 **互動功能**: 作品集過濾、彈窗展示等
- 🏆 **證書展示**: 專業證書與成就展示區域
- 📊 **技能視覺化**: 動態進度條展示技能水平
- 🎓 **學術成績**: GPA與學術獎項展示
- 👑 **領導經驗**: 學生自治與活動規劃成就
- 📚 **修課歷程**: 完整的課程學習軌跡展示
- 🔍 **智能過濾**: 按課程類別過濾展示功能

## 🛠️ 如何自定義

### 1. 修改個人資訊

在 `index.html` 文件中找到以下區域並修改：

```html
<!-- 修改姓名 -->
<span class="name-highlight">你的姓名</span>

<!-- 修改聯絡資訊 -->
<p>your.email@example.com</p>
<p>github.com/yourusername</p>
```

### 2. 更新經歷時間軸

在 `timeline-section` 中添加或修改你的經歷：

```html
<div class="timeline-item" data-aos="fade-up">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-date">年份</div>
        <h3>經歷標題</h3>
        <p>詳細描述</p>
        <div class="timeline-skills">
            <span class="skill-tag">技能標籤</span>
        </div>
    </div>
</div>
```

### 3. 添加作品項目

在 `portfolio-grid` 中添加新的作品：

```html
<div class="portfolio-item [類別]" data-aos="fade-up">
    <div class="portfolio-image">
        <img src="你的圖片連結" alt="專案名稱">
        <div class="portfolio-overlay">
            <div class="portfolio-actions">
                <button class="action-btn" onclick="openProjectModal('project-id')">
                    <i class="fas fa-eye"></i>
                </button>
                <!-- 其他按鈕 -->
            </div>
        </div>
    </div>
    <div class="portfolio-content">
        <h3>專案標題</h3>
        <p>專案描述</p>
        <div class="portfolio-tech">
            <span class="tech-tag">技術1</span>
            <span class="tech-tag">技術2</span>
        </div>
    </div>
</div>
```

### 4. 更新專案詳細資料

在 `script.js` 中修改 `projectData` 對象：

```javascript
const projectData = {
    'your-project-id': {
        title: '專案標題',
        description: '詳細描述',
        image: '專案截圖URL',
        video: 'YouTube影片嵌入URL',
        tech: ['技術1', '技術2', '技術3'],
        demoLink: '實際Demo連結',
        codeLink: 'GitHub連結',
        presentationLink: '簡報連結'
    }
};
```

## 🎨 自定義樣式

### 修改顏色主題

在 `styles.css` 的 `:root` 中修改CSS變數：

```css
:root {
    --primary-color: #你的主色;
    --secondary-color: #你的次要色;
    --accent-color: #你的強調色;
    /* 其他顏色變數... */
}
```

### 修改字體

更新Google Fonts連結並修改CSS中的字體系列：

```css
body {
    font-family: '你的字體', sans-serif;
}
```

## 📱 響應式設計

網站已針對以下螢幕尺寸進行最佳化：

- 🖥️ **桌面**: 1200px 以上
- 💻 **筆電**: 1024px - 1199px
- 📱 **平板**: 768px - 1023px
- 📲 **手機**: 480px - 767px
- 📱 **小手機**: 480px 以下

## ⚡ 性能優化功能

- 🎯 **懶加載**: 圖片和內容按需載入
- 🚀 **防抖**: 滾動事件優化
- 🔄 **頁面可見性**: 自動暫停/恢復動畫
- 💾 **GPU加速**: CSS transform和opacity動畫

## 🚀 部署建議

### GitHub Pages
1. 將文件上傳到GitHub儲存庫
2. 在Settings中啟用GitHub Pages
3. 選擇main分支作為來源

### Netlify
1. 將文件拖拽到Netlify部署區域
2. 自動部署完成

### Vercel
1. 使用Vercel CLI或網頁界面部署
2. 連接GitHub儲存庫自動部署

## 🛠️ 瀏覽器支援

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+

## 📞 技術支援

如果在使用過程中遇到問題，可以：

1. 檢查瀏覽器開發者工具的控制台
2. 確保所有文件路徑正確
3. 驗證HTML語法和CSS語法
4. 測試JavaScript功能是否正常

## 🎯 SEO 優化建議

1. 添加適當的meta標籤
2. 使用語義化的HTML標籤
3. 優化圖片alt屬性
4. 添加structured data
5. 確保快速載入時間

祝你打造出令人驚艷的個人作品集！🌟