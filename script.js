// 全局變數
let isLoading = true;
let particles = [];
let canvas, ctx;

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function () {
    // 初始化載入動畫
    initLoader();

    // 初始化粒子效果
    initParticles();

    // 初始化導航
    initNavigation();

    // 初始化滾動動畫
    initScrollAnimations();

    // 初始化作品集過濾
    initPortfolioFilter();

    // 初始化統計動畫
    initStatsAnimation();

    // 初始化表單
    initContactForm();

    // 初始化打字動畫
    initTypingAnimation();

    // 初始化專案彈窗
    initProjectModals();

    // 初始化技能進度條動畫
    initSkillBars();

    // 初始化修課歷程過濾
    initCoursesFilter();

    // 初始化領導經歷彈窗
    initLeadershipModals();

    // 初始化證書彈窗
    initCertificateModals();

    // 初始化修課統計動畫
    initCoursesStatsAnimation();
});

// 載入動畫
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');

    // 模擬載入時間
    setTimeout(() => {
        loader.classList.add('loaded');
        isLoading = false;

        // 載入完成後開始其他動畫
        setTimeout(() => {
            document.body.style.overflow = 'visible';
            startHomeAnimations();
        }, 500);
    }, 2000);
}

// 粒子背景效果
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    particlesContainer.appendChild(canvas);

    // 設置 canvas 大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 創建粒子
    function createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    // 動畫粒子
    function animateParticles() {
        if (isLoading) {
            requestAnimationFrame(animateParticles);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            // 更新位置
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // 邊界檢測
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

            // 繪製粒子
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();

            // 連接線
            particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();
}

// 導航功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-item a');

    // 滾動時改變導航樣式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 高亮當前區域
        highlightCurrentSection();
    });

    // 漢堡選單
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 平滑滾動
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'auto'
                });
            }

            // 關閉手機選單
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// 高亮當前區域
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-item a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 滾動動畫（AOS 效果）
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                // 時間軸項目動畫
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }

                // 作品集項目動畫
                if (entry.target.classList.contains('portfolio-item')) {
                    animatePortfolioItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // 觀察所有需要動畫的元素
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// 時間軸動畫
function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');

    setTimeout(() => {
        marker.style.transform = 'scale(1.2)';
        marker.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';

        setTimeout(() => {
            marker.style.transform = 'scale(1)';
        }, 300);
    }, 100);

    content.style.animation = 'slideInUp 0.6s ease forwards';
}

// 作品集項目動畫
function animatePortfolioItem(item) {
    item.style.animation = 'fadeInUp 0.6s ease forwards';
}

// 作品集過濾功能
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活動狀態
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 統計數字動畫
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.about-stats .stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
        }
    });

    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.about-stats'));
    }
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// 聯絡表單
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const formStatus = document.getElementById('formStatus');
            const originalText = submitBtn.innerHTML;

            // 取得表單數據
            const userName = document.getElementById('userName').value;
            const userEmail = document.getElementById('userEmail').value;
            const userMessage = document.getElementById('userMessage').value;

            // 構建郵件內容
            const subject = encodeURIComponent(`個人網站聯絡表單 - ${userName} 的訊息`);
            const body = encodeURIComponent(
                `姓名：${userName}\n` +
                `Email：${userEmail}\n\n` +
                `訊息內容：\n${userMessage}\n\n` +
                `---\n發送時間：${new Date().toLocaleString('zh-TW')}`
            );

            // 使用 mailto 協議打開郵件客戶端
            const mailtoLink = `mailto:elson921121@gmail.com?subject=${subject}&body=${body}`;

            // 顯示處理中狀態
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 開啟郵件...';
            submitBtn.disabled = true;

            // 開啟郵件客戶端
            window.location.href = mailtoLink;

            // 顯示提示訊息
            setTimeout(() => {
                formStatus.innerHTML = '<p style="color: #667eea; font-weight: 500;"><i class="fas fa-info-circle"></i> 已為您開啟郵件客戶端，請在郵件應用中發送訊息。</p>';
                formStatus.style.display = 'block';

                submitBtn.innerHTML = '<i class="fas fa-check"></i> 已開啟郵件';
                submitBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';

                // 2秒後恢復按鈕狀態
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 3000);
            }, 500);
        });
    }
}

// 打字動畫
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const texts = ['你好，我是', 'Hello, I am', 'こんにちは、私は'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeAnimation() {
        if (isLoading) {
            setTimeout(typeAnimation, 100);
            return;
        }

        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeAnimation, speed);
    }

    setTimeout(typeAnimation, 1000);
}

// 專案彈窗
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');

    // 專案數據
    const projectData = {
        project1: {
            title: '響應式電商網站',
            description: '這是一個使用 React 和 Node.js 開發的全端電商平台，具備完整的購物車功能、用戶認證、訂單管理等功能。采用響應式設計，支援各種設備瀏覽。',
            image: 'https://via.placeholder.com/600x400/667eea/ffffff?text=E-Commerce+Website',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Stripe'],
            demoLink: '#',
            codeLink: '#',
            presentationLink: '#'
        },
        project2: {
            title: '待辦事項管理App',
            description: '跨平台的待辦事項管理應用，支援雲端同步、提醒通知、分類管理等功能。使用 React Native 開發，支援 iOS 和 Android 平台。',
            image: 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Todo+App',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            tech: ['React Native', 'Firebase', 'Redux', 'AsyncStorage', 'Push Notifications'],
            demoLink: '#',
            codeLink: '#',
            presentationLink: '#'
        },
        tastebuddies: {
            title: 'TasteBuddies 美食推薦App',
            description: '負責「TasteBuddies」WEB App的程式設計與前端開發，從前端介面設計規劃、使用者體驗優化到後端API串接，皆由我負責。此專案使用React Native + Supabase架構實現推薦制度與即時互動功能，並採用敏捷式開發，注重使用者體驗與技術整合。這個App致力於解決「不知道吃什麼」的選擇困難，幫助使用者提升日常用餐效率。',
            features: [
                'SwiftTaste 單人探索：透過趣味問題與滑動卡片，獲得個人化餐廳推薦。',
                'Buddies! 群組決策：建立房間，與朋友即時同步回答問題並投票選餐。',
                '地圖探索：整合 Google Maps，自動定位並顯示推薦與收藏餐廳。',
                '收藏清單：管理多個自訂的最愛餐廳清單，並可顯示於地圖上。',
                '使用者個人檔案：查看收藏清單、評論統計，並編輯個人資訊。',
                '社交互動：支援即時群組決策、房間連結與 QR Code 分享。',
                '管理員後台：整合餐廳資料、標籤與地點管理，並提供用戶互動與數據分析功能，確保平台內容更新與系統優化。'
            ],
            image: 'images/projects/tastebuddies-cover.jpg',
            video: 'https://www.youtube.com/embed/bDN5JXtNWnA',
            tech: ['React Native', 'Supabase', 'UI/UX設計', '敏捷開發', 'Node.js', '即時互動'],
            demoLink: 'https://senior-project-ruby.vercel.app/',
            codeLink: '#',
            presentationLink: '#'
        },
        aifinsys: {
            title: '中山永續金融科技',
            description: '作為中山永續金融科技的成員之一，我負責網站建置與ESG研討會規劃、企業推廣，實際參與產學整合與科技應用推動。團隊以AI演算法與風險場景為基礎，協助企業建立永續投資策略，提升風險韌性。此外，我也負責開發「GREENUP! 永續基礎發展能力測驗練習平台」，提供互動式學習工具，幫助使用者提升ESG知識與永續素養。未來將會持續增加永續規劃相關服務。',
            image: 'images/projects/aifinsys-cover.png',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            tech: ['ESG', 'FinTech', 'AI演算法', '風險管理', '永續投資', '網站開發'],
            demoLink: 'https://greenup-sustainability-exam-platfor-three.vercel.app/',
            codeLink: '#',
            presentationLink: '#'
        },
        leadership: {
            title: '學生自治與活動規劃',
            description: '曾任第十八屆學生議會副議長、選舉委員會主任委員、財務會主委、學生會活動部部長，曾經規劃多場大型校園活動，包括社團博覽會與社團展演等，最高曾吸引超過800人參與。負責舉辦心理健康推廣議題性活動，促進校園正向對話與關懷氛圍。同時我亦是學校多項正式會議的學生代表委員，實際參與校政研議與預算制度設計，累積豐富的議事經驗與跨單位溝通協調能力。',
            image: 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Student+Leadership',
            tech: ['活動規劃', '團隊領導', '跨部門溝通', '議事經驗', '學生代表', '心理健康推廣'],
            activityPhotos: [
                {
                    name: '【山海奇航】社團聯展',
                    participants: '1000+人',
                    photos: [
                        { src: '活動/【山海奇航】社團聯展/社團聯展_1.jpg', caption: '社團聯展海報' }
                    ]
                },
                {
                    name: '【時光迴旋】43週年校慶系列活動',
                    participants: '1000+人',
                    rating: '9.1/10分',
                    photos: [
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_0.jpg', caption: '43週年校慶活動回顧' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_1.jpg', caption: '校慶活動精彩瞬間' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_2.jpg', caption: '校慶活動現場' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_3.jpg', caption: '校慶活動花絮' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_4.jpg', caption: '校慶活動記錄' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_5.jpg', caption: '校慶團隊合影' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_6.jpg', caption: '校慶活動布置' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_7.jpg', caption: '校慶活動執行' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_8.jpg', caption: '校慶活動互動' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_9.jpg', caption: '校慶活動成果' },
                        { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_10.jpg', caption: '校慶活動精選' }
                    ]
                },
                {
                    name: '【心情急轉彎】心輔議題活動',
                    participants: '200+人',
                    rating: '9.03/10分',
                    photos: [
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_1.jpg', caption: '心理健康推廣活動' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_2.jpg', caption: '心輔活動互動環節' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_3.jpg', caption: '心輔活動參與者' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_4.jpg', caption: '心輔活動現場氛圍' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_5.jpg', caption: '心輔活動交流' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_6.jpg', caption: '心輔活動分享' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_7.jpg', caption: '心輔活動溫馨時刻' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_8.jpg', caption: '心輔活動宣傳' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_9.jpg', caption: '心輔活動佈置' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_10.jpg', caption: '心輔活動團隊' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_11.jpg', caption: '心輔活動回顧' },
                        { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_12.jpg', caption: '心輔活動精彩集錦' }
                    ]
                },
                {
                    name: '【有Bear來】聖誕Free Hug活動',
                    participants: '50+人',
                    photos: [
                        { src: '活動/【有Bear來】聖誕Free Hug活動/freehug.jpg', caption: '聖誕Free Hug活動現場' },
                        { src: '活動/【有Bear來】聖誕Free Hug活動/freehug2.jpg', caption: '聖誕節溫暖擁抱' }
                    ]
                }
            ]
        },
        greenup: {
            title: 'GREENUP! 永續測驗平台',
            description: '負責開發「GREENUP! 永續基礎發展能力測驗練習平台」，這是一個互動式線上學習平台，旨在提升使用者的ESG知識與永續素養。平台提供模擬測驗、即時回饋與學習分析功能，幫助使用者系統性地掌握永續發展相關概念。此專案為中山永續金融科技團隊的重要教育推廣工具，結合永續教育與數位科技，促進永續意識的普及化。',
            features: [
                '📚 題庫管理：PDF 自動解析與 OCR 文字識別、AI 自動生成詳細解答說明、管理員審核與編輯功能、主題分類管理(環境、社會、經濟、治理永續)',
                '🎯 練習功能：智慧練習推薦系統、多種練習模式(隨機、主題、錯題、收藏)、即時反饋與詳細解析、完整答題進度追蹤',
                '📊 數據分析：個人學習進度與成績分析、Recharts 視覺化圖表呈現、錯題分析與改進建議、學習目標設定與追蹤',
                '🏆 社交功能：每日/每週/每月排行榜、成就徽章系統、題目收藏與個人題庫',
                '👨‍💼 管理後台：用戶管理與權限控制、完整題庫管理功能、平台數據監控分析、系統配置與參數調整'
            ],
            image: 'https://via.placeholder.com/600x400/4CAF50/ffffff?text=GREENUP+Platform',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            tech: ['React', 'Next.js', 'ESG教育', '線上測驗', 'UI/UX設計', 'Vercel部署'],
            demoLink: 'https://greenup-sustainability-exam-platfor-three.vercel.app/',
            codeLink: '#',
            presentationLink: '#'
        },
        eatmove: {
            title: 'EatMove 線上訂餐外送平台',
            description: '期末專案製作「EatMove」線上訂餐外送平台，整合用戶、餐廳與外送員三方角色，提供從訂餐到配送的完整服務。透過本平台，我們成功實現用戶線上瀏覽餐廳與菜單、加入購物車、提交訂單、完成訂單後評分；餐廳即時接單、準備餐點、交付餐點；外送員取餐配送等完整流程。整體系統功能齊全、操作流程順暢，並創新性地加入了人臉辨識登入與AI以圖搜餐的進階功能。我在本專案內負責前期需求分析、ER-model與Schema部分繪製、大部分資料庫建構與前端串接的功能，以及兩大進階功能之建構。',
            features: [
                '👤 用戶端功能：線上瀏覽餐廳與菜單、加入購物車、提交訂單、用戶資料修改、我的最愛餐廳收藏、近期瀏覽記錄、搜尋與定位功能',
                '🚴 外送員端功能：註冊與人臉辨識登入、查看待配送訂單並接單、即時路線資訊顯示、外送員資料與工作狀態管理',
                '🏪 店家端功能：新增/刪除/修改商品、即時訂單管理與狀態更新、餐廳基本資訊與營業狀態修改',
                '🤖 AI人臉辨識登入：使用 face-api.js 擷取臉部特徵向量、雙重驗證機制(歐氏距離 + 餘弦相似度)、提升資訊安全性與登入便利性',
                '📸 AI以圖搜餐功能：上傳食物照片進行影像分析、自動判斷菜色類型並推薦相似餐廳、完全本地運算保護隱私',
                '⭐ 雙向評價機制：用戶可對餐點與外送員分開評分、建立信任機制促進服務品質提升、平均評分統計與展示'
            ],
            image: 'images/projects/eatmove-cover.jpg',
            video: 'https://www.youtube.com/embed/mN3CNEsDDeU',
            tech: ['資料庫管理', 'PostgreSQL', 'ER-Model設計', '人臉辨識', 'AI圖像搜尋', '前後端串接'],
            demoLink: 'https://youtu.be/mN3CNEsDDeU?si=Kv1Ro20gtZ8X1pYl',
            codeLink: '#',
            presentationLink: 'documents/presentations/eatmove-presentation.pdf'
        }
    };

    // 關閉彈窗
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 點擊背景關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 開啟專案彈窗函數（全局函數）
    window.openProjectModal = function (projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // 填入數據
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;

        // 影片區域顯示/隱藏
        const videoContainer = document.getElementById('projectVideoContainer');
        const videoIframe = document.getElementById('modalVideo');

        if (projectId === 'greenup' || projectId === 'aifinsys' || projectId === 'leadership') {
            // GREENUP、中山永續金融科技、學生自治與活動規劃 不顯示影片
            videoContainer.style.display = 'none';
            videoIframe.src = '';
        } else if (project.video) {
            // 其他有影片的專案顯示影片
            videoContainer.style.display = 'block';
            videoIframe.src = project.video;
        } else {
            videoContainer.style.display = 'none';
            videoIframe.src = '';
        }

        // 主要功能區域
        const featuresSection = document.getElementById('modalFeatures');
        const featuresList = document.getElementById('modalFeaturesList');

        if (project.features && project.features.length > 0) {
            featuresSection.style.display = 'block';
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        } else {
            featuresSection.style.display = 'none';
        }

        // 技術標籤
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        project.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });

        // 更新連結
        const linksContainer = modal.querySelector('.project-links');

        // 根據不同專案自訂按鈕文字和功能
        if (projectId === 'leadership') {
            // 學生自治與活動規劃：顯示活動照片carousels
            linksContainer.innerHTML = '<div class="activity-photos-section"></div>';
            const photosSection = linksContainer.querySelector('.activity-photos-section');

            if (project.activityPhotos && project.activityPhotos.length > 0) {
                project.activityPhotos.forEach((activity, activityIndex) => {
                    const activityDiv = document.createElement('div');
                    activityDiv.className = 'activity-group';

                    // 活動標題與metadata
                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'activity-group-header';
                    titleDiv.innerHTML = `
                        <h4 class="activity-group-title">${activity.name}</h4>
                        <div class="activity-meta-icons">
                            ${activity.participants ? `<span class="meta-icon"><i class="fas fa-users"></i> ${activity.participants}</span>` : ''}
                            ${activity.rating ? `<span class="meta-icon"><i class="fas fa-star"></i> ${activity.rating}</span>` : ''}
                        </div>
                    `;
                    activityDiv.appendChild(titleDiv);

                    // 如果只有一張照片,直接顯示
                    if (activity.photos.length === 1) {
                        const singlePhoto = activity.photos[0];
                        const singlePhotoDiv = document.createElement('div');
                        singlePhotoDiv.className = 'single-photo';
                        singlePhotoDiv.innerHTML = `
                            <img src="${singlePhoto.src}" alt="${singlePhoto.caption}" onclick="viewPhoto('${singlePhoto.src}', '${singlePhoto.caption}')">
                            <p class="photo-caption">${singlePhoto.caption}</p>
                        `;
                        activityDiv.appendChild(singlePhotoDiv);
                    } else {
                        // 多張照片創建carousel
                        const carouselId = `activity-carousel-${activityIndex}`;
                        const carouselDiv = document.createElement('div');
                        carouselDiv.className = 'activity-carousel';
                        carouselDiv.id = carouselId;
                        carouselDiv.setAttribute('data-carousel-id', carouselId);

                        carouselDiv.innerHTML = `
                            <div class="carousel-container">
                                ${activity.photos.map((photo, photoIndex) => `
                                    <div class="carousel-slide ${photoIndex === 0 ? 'active' : ''}">
                                        <img src="${photo.src}" alt="${photo.caption}">
                                        <p class="carousel-caption">${photo.caption}</p>
                                    </div>
                                `).join('')}
                            </div>
                            ${activity.photos.length > 1 ? `
                                <button class="carousel-btn prev" onclick="changeSlide(this, -1)">‹</button>
                                <button class="carousel-btn next" onclick="changeSlide(this, 1)">›</button>
                                <div class="carousel-indicators">
                                    ${activity.photos.map((_, i) => `
                                        <span class="dot ${i === 0 ? 'active' : ''}" onclick="currentSlide(this, ${i})"></span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        `;
                        activityDiv.appendChild(carouselDiv);
                    }

                    photosSection.appendChild(activityDiv);
                });
            }
        } else if (projectId === 'eatmove') {
            // EatMove 專案：查看Demo + 查看介紹
            linksContainer.innerHTML = `
                <a href="${project.demoLink}" class="btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i> 查看Demo
                </a>
                <a href="javascript:void(0)" class="btn-primary" onclick="viewPDF('${project.presentationLink}', '${project.title}')">
                    <i class="fas fa-file-pdf"></i> 查看介紹
                </a>
                <a href="${project.codeLink}" class="btn-secondary" target="_blank">
                    <i class="fab fa-github"></i> 源碼
                </a>
                <a href="javascript:void(0)" class="btn-secondary" onclick="viewPDF('${project.presentationLink}', '${project.title}')">
                    <i class="fas fa-presentation"></i> 簡報
                </a>
            `;
        } else if (projectId === 'tastebuddies' || projectId === 'greenup' || projectId === 'aifinsys') {
            // TasteBuddies, GREENUP, 中山永續金融科技：查看網站
            const links = linksContainer.querySelectorAll('a');
            links[0].href = project.demoLink;
            links[0].innerHTML = '<i class="fas fa-globe"></i> 查看網站';
            links[1].href = project.codeLink;

            // 如果簡報連結是PDF，改為點擊彈窗檢視，而非直接下載
            if (project.presentationLink && project.presentationLink.endsWith('.pdf')) {
                links[2].href = 'javascript:void(0)';
                links[2].onclick = () => viewPDF(project.presentationLink, project.title);
            } else {
                links[2].href = project.presentationLink;
                links[2].target = '_blank';
            }
        } else {
            // 其他專案使用原本的三個按鈕
            const links = linksContainer.querySelectorAll('a');
            links[0].href = project.demoLink;
            links[1].href = project.codeLink;

            // 如果簡報連結是PDF，改為點擊彈窗檢視，而非直接下載
            if (project.presentationLink && project.presentationLink.endsWith('.pdf')) {
                links[2].href = 'javascript:void(0)';
                links[2].onclick = () => viewPDF(project.presentationLink, project.title);
            } else {
                links[2].href = project.presentationLink;
                links[2].target = '_blank';
            }
        }

        // 顯示彈窗
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
}

// 滾動到指定區域的全局函數
window.scrollToSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'auto'
        });
    }
};

// 首頁動畫
function startHomeAnimations() {
    const heroElements = document.querySelectorAll('.hero-text > *');

    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 50);
        }, index * 200);
    });

    // 程式碼動畫
    setTimeout(() => {
        const codeLines = document.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 300);
        });
    }, 1000);
}

// 滾動指示器
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// 添加 CSS 動畫關鍵幀
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.code-line {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.6s ease;
}

.aos-animate {
    animation: fadeInUp 0.8s ease forwards;
}

/* 滑鼠懸停效果 */
.portfolio-item:hover .tech-tag {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.skill-item:hover i {
    transform: scale(1.2);
    transition: transform 0.3s ease;
}

/* 按鈕點擊效果 */
.btn-primary:active,
.btn-secondary:active {
    transform: translateY(-1px) scale(0.98);
}

/* 手機漢堡選單動畫 */
.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}
`;

document.head.appendChild(style);

// 技能進度條動畫
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill');
    let skillsAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;

                // 延遲動畫讓用戶能看到動畫效果
                setTimeout(() => {
                    skillBars.forEach((bar, index) => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, index * 200);
                    });
                }, 300);
            }
        });
    }, {
        threshold: 0.5
    });

    const skillsSection = document.querySelector('.skills-tools-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// 修課歷程過濾功能
function initCoursesFilter() {
    const filterBtns = document.querySelectorAll('.semester-btn');
    const courseCards = document.querySelectorAll('.course-card');

    // 過濾函數
    function filterCourses(filter) {
        courseCards.forEach(card => {
            // 根據分類過濾
            const category = card.getAttribute('data-category');
            if (category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });

        // 更新統計數字
        updateCoursesStats(filter);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活動狀態
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-semester');
            filterCourses(filter);
        });
    });

    // 頁面載入時，根據預設active按鈕進行過濾
    const activeBtn = document.querySelector('.semester-btn.active');
    if (activeBtn) {
        const initialFilter = activeBtn.getAttribute('data-semester');
        filterCourses(initialFilter);
    }
}

// 更新修課統計
function updateCoursesStats(filter) {
    const courseCards = document.querySelectorAll('.course-card');
    let visibleCourses = 0;
    let totalCredits = 0;

    courseCards.forEach(card => {
        if (card.style.display !== 'none') {
            visibleCourses++;
            const creditsText = card.querySelector('.course-credits').textContent;
            const credits = parseInt(creditsText.match(/\d+/)[0]);
            totalCredits += credits;
        }
    });

    // 可以在這裡更新顯示的統計數字
}

// 統計動畫（修課歷程統計）
function initCoursesStatsAnimation() {
    const statNumbers = document.querySelectorAll('.courses-summary .stat-number');

    if (statNumbers.length === 0) {
        return;
    }

    // 提前保存每個stat-number的目標值並設置data-target屬性
    statNumbers.forEach(stat => {
        const originalText = stat.textContent.trim();
        const target = parseFloat(originalText);

        if (!isNaN(target)) {
            stat.setAttribute('data-target', originalText);
            stat.textContent = '0';
        }
    });

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;

            statNumbers.forEach(stat => {
                const targetStr = stat.getAttribute('data-target');
                const target = parseFloat(targetStr);

                if (!isNaN(target)) {
                    animateCoursesCounter(stat, target, targetStr);
                }
            });
        }
    });

    const summarySection = document.querySelector('.courses-summary');
    if (summarySection) {
        observer.observe(summarySection);
    }
}

function animateCoursesCounter(element, target, originalStr) {
    // 驗證 target 是否為有效數字
    if (isNaN(target) || target === null || target === undefined) {
        element.textContent = originalStr;
        return;
    }

    const isDecimal = originalStr.includes('.');
    const duration = 2000; // 2秒完成動畫
    const startTime = Date.now();

    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = progress * target;

        if (progress < 1) {
            if (isDecimal) {
                element.textContent = current.toFixed(2);
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            // 動畫結束，設置最終值
            element.textContent = originalStr;
        }
    }

    requestAnimationFrame(updateCounter);
}

// 領導經歷彈窗功能
function initLeadershipModals() {
    // 領導經歷數據
    const leadershipData = {
        'activity-director': {
            title: '學生會活動部部長',
            period: '2023年2月 - 2024年1月',
            overview: '負責規劃與執行校園大型活動，包括社團博覽會、社團展演等活動，最高曾吸引超過800人參與，致力於打造豐富多彩的校園生活。',
            projects: [
                {
                    name: '2023年社團博覽會',
                    description: '規劃全校最大規模的社團展示活動，協調60+社團參與，成功吸引800+學生參加',
                    results: ['參與社團數量: 60+', '活動參與人數: 800+', '活動滿意度: 95%'],
                    skills: ['活動規劃', '跨部門協調', '危機處理', '預算管理']
                },
                {
                    name: '社團聯合展演',
                    description: '策劃跨社團表演活動，整合表演類社團資源，提供學生展現才藝的平台',
                    results: ['參與社團: 15個', '觀眾人數: 500+', '媒體報導: 3篇'],
                    skills: ['節目策劃', '舞台設計', '媒體聯繫', '現場執行']
                },
                {
                    name: '新生迎新系列活動',
                    description: '設計新生融入校園生活的系列活動，包括校園導覽、社團介紹、學長姊經驗分享',
                    results: ['新生參與率: 85%', '活動場次: 10場', '志工招募: 50人'],
                    skills: ['活動設計', '志工管理', '新生輔導', '團隊建立']
                }
            ],
            achievements: [
                '成功提升校園活動參與度30%',
                '建立活動部標準作業流程',
                '培養15位活動企劃人才',
                '建立與校外廠商合作關係'
            ],
            skills: ['活動企劃與執行', '團隊領導與管理', '預算規劃與控制', '危機處理能力', '跨部門溝通協調', '創意發想與實現']
        },
        'vice-president': {
            title: '第十八屆學生議會副議長',
            period: '2022年9月 - 2023年8月',
            overview: '協助議長處理學生議會日常事務，參與校政會議，負責學生權益維護與校政監督，累積豐富的議事經驗與跨單位溝通協調能力。',
            projects: [
                {
                    name: '學生權益改革提案',
                    description: '針對學生關切議題提出改革方案，包括宿舍管理、課程安排、校園設施等面向',
                    results: ['提案通過率: 90%', '學生受益人數: 3000+', '政策改善項目: 8項'],
                    skills: ['政策分析', '提案撰寫', '議事主持', '利害關係人溝通']
                },
                {
                    name: '心理健康推廣活動',
                    description: '規劃校園心理健康宣導活動，促進學生心理健康意識，建立校園正向支持網絡',
                    results: ['活動參與: 1200人', '諮商轉介成功: 15案', '正向回饋率: 92%'],
                    skills: ['議題倡導', '活動企劃', '社會關懷', '資源整合']
                },
                {
                    name: '校政監督與建言',
                    description: '定期參與校務會議，監督校政執行，代表學生發聲並提出建設性建議',
                    results: ['參與會議: 24場', '提出建議: 15項', '獲採納建議: 12項'],
                    skills: ['會議參與', '政策監督', '建議提出', '代表發言']
                }
            ],
            achievements: [
                '成功推動8項學生權益改善政策',
                '建立學生議會標準議事流程',
                '促成校方與學生雙向溝通機制',
                '獲頒優秀學生幹部獎'
            ],
            skills: ['議事規則與流程', '政策分析與監督', '公共事務參與', '代表性發言', '跨單位協調溝通', '學生權益維護']
        }
    };

    // 綁定點擊事件
    window.openLeadershipModal = function (type) {
        const data = leadershipData[type];
        if (!data) return;

        const modal = document.getElementById('leadershipModal');

        // 填入基本資訊
        document.getElementById('leadershipTitle').textContent = data.title;
        document.getElementById('leadershipPeriod').textContent = data.period;
        document.getElementById('leadershipOverview').textContent = data.overview;

        // 填入專案內容
        const projectsContainer = document.getElementById('leadershipProjects');
        projectsContainer.innerHTML = '';
        data.projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-item';
            projectDiv.innerHTML = `
                <h4 class="project-name">${project.name}</h4>
                <p class="project-description">${project.description}</p>
                <div class="project-results">
                    <h5>具體成果：</h5>
                    <ul>
                        ${project.results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-skills">
                    <h5>運用技能：</h5>
                    <div class="skills-tags">
                        ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectDiv);
        });

        // 填入成就
        const achievementsContainer = document.getElementById('leadershipAchievements');
        achievementsContainer.innerHTML = '';
        data.achievements.forEach(achievement => {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = 'achievement-item';
            achievementDiv.innerHTML = `<i class="fas fa-trophy"></i>${achievement}`;
            achievementsContainer.appendChild(achievementDiv);
        });

        // 填入技能
        const skillsContainer = document.getElementById('leadershipSkills');
        skillsContainer.innerHTML = '';
        data.skills.forEach(skill => {
            const skillSpan = document.createElement('span');
            skillSpan.className = 'skill-tag';
            skillSpan.textContent = skill;
            skillsContainer.appendChild(skillSpan);
        });

        // 顯示彈窗
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closeLeadershipModal = function () {
        const modal = document.getElementById('leadershipModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // 點擊背景關閉
    const modal = document.getElementById('leadershipModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLeadershipModal();
            }
        });
    }
}

// 證書彈窗功能
function initCertificateModals() {
    // 證書數據
    const certificateData = {
        'react-native-cert': {
            title: 'React Native開發認證',
            issuer: '國際程式開發認證機構',
            date: '2024年6月',
            description: '完成React Native跨平台開發課程，掌握iOS和Android應用程式開發技能',
            skills: ['React Native', 'JavaScript', 'Mobile Development', 'Cross-platform'],
            image: 'https://via.placeholder.com/800x600/667eea/ffffff?text=React+Native+Certificate'
        },
        'firebase-cert': {
            title: 'Firebase後端服務認證',
            issuer: 'Google Firebase',
            date: '2024年5月',
            description: '熟練運用Firebase各項服務，包括資料庫、身份驗證、雲端存儲等功能',
            skills: ['Firebase', 'NoSQL Database', 'Authentication', 'Cloud Services'],
            image: 'https://via.placeholder.com/800x600/FFA726/ffffff?text=Firebase+Certificate'
        },
        'uiux-cert': {
            title: 'UI/UX設計專業認證',
            issuer: '設計師協會',
            date: '2024年3月',
            description: '完成使用者介面與使用者體驗設計專業課程，具備完整設計思維與實作能力',
            skills: ['UI Design', 'UX Research', 'Figma', 'Design Thinking'],
            image: 'https://via.placeholder.com/800x600/E91E63/ffffff?text=UI+UX+Certificate'
        },
        'academic-award': {
            title: '學業優秀獎',
            issuer: '國立中山大學',
            date: '2024年6月',
            description: '學年GPA 4.06，獲得學業優秀表現獎勵',
            skills: ['學術研究', '跨領域學習', '時間管理', '學習能力'],
            image: 'https://via.placeholder.com/600x800/4CAF50/ffffff?text=Academic+Excellence+Award'
        },
        'leadership-award': {
            title: '學生領導獎',
            issuer: '國立中山大學學生事務處',
            date: '2023年12月',
            description: '擔任學生議會副議長期間表現優異，獲得學生領導獎項肯定',
            skills: ['領導能力', '團隊管理', '公共服務', '溝通協調'],
            image: 'https://via.placeholder.com/600x800/9C27B0/ffffff?text=Student+Leadership+Award'
        }
    };

    // 綁定點擊事件
    window.openCertificateModal = function (certId) {
        const data = certificateData[certId];
        if (!data) return;

        const modal = document.getElementById('certificateModal');

        // 填入證書資訊
        document.getElementById('certificateTitle').textContent = data.title;
        document.getElementById('certificateIssuer').textContent = data.issuer;
        document.getElementById('certificateDate').textContent = data.date;
        document.getElementById('certificateDescription').textContent = data.description;
        document.getElementById('certificateImage').src = data.image;

        // 填入技能標籤
        const skillsContainer = document.getElementById('certificateSkills');
        skillsContainer.innerHTML = '';
        data.skills.forEach(skill => {
            const skillSpan = document.createElement('span');
            skillSpan.className = 'skill-tag';
            skillSpan.textContent = skill;
            skillsContainer.appendChild(skillSpan);
        });

        // 顯示彈窗
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closeCertificateModal = function () {
        const modal = document.getElementById('certificateModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // 點擊背景關閉
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCertificateModal();
            }
        });
    }
}

// 性能優化：防抖函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 優化滾動事件
const debouncedScroll = debounce(() => {
    highlightCurrentSection();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// 頁面可見性 API - 優化性能
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 頁面隱藏時暫停動畫
        particles.forEach(particle => {
            particle.speedX = 0;
            particle.speedY = 0;
        });
    } else {
        // 頁面可見時恢復動畫
        particles.forEach(particle => {
            particle.speedX = (Math.random() - 0.5) * 0.5;
            particle.speedY = (Math.random() - 0.5) * 0.5;
        });
    }
});

// Carousel 輪播功能
function changeSlide(button, direction) {
    const carousel = button.closest('.activity-carousel');
    const container = carousel.querySelector('.carousel-container');
    const slides = container.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');

    let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + direction + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function currentSlide(dot, index) {
    const carousel = dot.closest('.activity-carousel');
    const container = carousel.querySelector('.carousel-container');
    const slides = container.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// 自動輪播功能已停用 - 避免頁面跳動
// 用戶可以使用手動控制按鈕來切換照片

// 經歷詳情資料庫
const timelineData = {
    'high-school': {
        title: '國立台灣師範大學附屬高級中學',
        period: '2019 - 2022',
        position: '學生會活動長、畢聯會活動長',
        description: '高中階段就讀師大附中，培養多元興趣與學習基礎，並參與學生自治擔任學生會活動長與畢聯會活動長，累積活動規劃經驗。透過參與學生會活動，學習如何組織大型校園活動、與不同部門溝通協調，以及預算規劃與執行。',
        activities: [],
        certificates: []
    },
    'nsysu': {
        title: '國立中山大學',
        period: '2022 - 現在',
        position: '人文暨科技跨領域學士學位學程、輔系資訊管理學系',
        description: '就讀人文暨科技跨領域學士學位學程，輔系資訊管理學系。一至三年級在校學業成績總平均GPA 4.06，系排名4/44(9.09%)，連續三年下學期榮獲國立中山大學書香獎。擔任第十七、十八屆學生議員、第十七屆學生會活動部長、第十八屆學生議會副議長、秘書長及財務稽核委員會召集委員，同時擔任第十八屆學生會選舉委員會主任委員，積極參與校園事務與學生自治。',
        activities: [
            { name: '學業表現', description: 'GPA 4.06，系排名 4/44 (9.09%)，連續三年榮獲書香獎', participants: '個人成就' },
            { name: 'Google數位人才探索計畫', description: '完成Google數位行銷與Google Cloud學程，學習數位廣告投放、AI應用、雲端運算與機器學習', participants: '2025年暑期' },
            { name: '第十七、十八屆學生議員', description: '擔任學生議會議員，代表學生發聲並監督學生會運作', participants: '全校學生代表' },
            { name: '學生會活動部長', description: '規劃執行大型校園活動，包括社團聯展、校慶活動等', participants: '2000+人參與' },
            { name: '學生議會副議長', description: '主持議會會議，推動校園民主參與', participants: '全校學生代表' },
            { name: '選舉委員會主委', description: '負責學生會選舉事務，確保選舉公正透明', participants: '全校選民' }
        ],
        certificates: [
            { name: '111學年書香獎', image: 'images/certificates/scholarship-award-111.jpg' },
            { name: '112學年書香獎', image: 'images/certificates/scholarship-award-112.jpg' },
            { name: '112學生會幹部當選證明', image: 'images/certificates/student-union-elected-112.jpg' },
            { name: '112學生會幹部聘書', image: 'images/certificates/student-union-appointment-112.jpg' },
            { name: '112社團幹部服務證書', image: 'images/certificates/club-service-112.jpg' },
            { name: '名次證明書', image: 'images/certificates/rank-certificate.jpg', portrait: true },
            { name: '2025年Google數位行銷學程結業證書', image: 'images/certificates/google-digital-marketing-cert.jpg' },
            { name: '2025年Google Cloud學程結業證書', image: 'images/certificates/google-cloud-cert.jpg' }
        ],
        photos: [
            {
                name: '【山海奇航】社團聯展',
                participants: '1000+人',
                photos: [
                    { src: '活動/【山海奇航】社團聯展/社團聯展_1.jpg', caption: '社團聯展現場' }
                ]
            },
            {
                name: '【時光迴旋】43周年校慶系列活動',
                participants: '1000+人',
                rating: '9.1/10分',
                photos: [
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_0.jpg', caption: '43週年校慶活動回顧' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_1.jpg', caption: '校慶活動精彩瞬間' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_2.jpg', caption: '校慶活動現場' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_3.jpg', caption: '校慶活動花絮' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_4.jpg', caption: '校慶活動記錄' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_5.jpg', caption: '校慶團隊合影' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_6.jpg', caption: '校慶活動布置' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_7.jpg', caption: '校慶活動執行' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_8.jpg', caption: '校慶活動互動' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_9.jpg', caption: '校慶活動成果' },
                    { src: '活動/【時光迴旋】43周年校慶系列活動/校慶_10.jpg', caption: '校慶活動精選' }
                ]
            },
            {
                name: '【心情急轉彎】心輔議題活動',
                participants: '200+人',
                rating: '9.03/10分',
                photos: [
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_1.jpg', caption: '心理健康推廣活動' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_2.jpg', caption: '心輔活動互動環節' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_3.jpg', caption: '心輔活動參與者' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_4.jpg', caption: '心輔活動現場氛圍' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_5.jpg', caption: '心輔活動交流' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_6.jpg', caption: '心輔活動分享' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_7.jpg', caption: '心輔活動溫馨時刻' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_8.jpg', caption: '心輔活動宣傳' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_9.jpg', caption: '心輔活動佈置' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_10.jpg', caption: '心輔活動團隊' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_11.jpg', caption: '心輔活動回顧' },
                    { src: '活動/【心情急轉彎】心輔議題活動/心輔活動_12.jpg', caption: '心輔活動精彩集錦' }
                ]
            },
            {
                name: '【有Bear來】聖誕Free Hug活動',
                participants: '50+人',
                photos: [
                    { src: '活動/【有Bear來】聖誕Free Hug活動/freehug.jpg', caption: '聖誕Free Hug活動現場' },
                    { src: '活動/【有Bear來】聖誕Free Hug活動/freehug2.jpg', caption: '聖誕節溫暖擁抱' }
                ]
            }
        ]
    },
    'aifinsys': {
        title: '中山永續金融科技股份有限公司',
        period: 'Feb 2025 - 現在',
        position: '業務經理 & 共同創辦人',
        description: '與同學高虂葳共同創辦中山永續金融科技股份有限公司(AI FinTech Corp.)，擔任業務經理一職。公司致力於開發AI氣候演算避險解決方案，擁有Ai+ESG金融科技避險的專利技術(專利申請中)。',
        activities: [
            { name: '官網建置與維護', description: '負責公司官網開發與維護', link: 'https://aifinsys.com' },
            {
                name: '2025永續金融科技創新投資國際論壇',
                description: '主辦永續金融科技創新投資國際論壇，邀請國立中山大學李捷教授、國泰綜合證券數位資產部簡煒伶墾理與邱冠鈞講師，以及中山大學國際資產管理研究所王昭文所長擔任講師。論壇議題涵蓋綠色永續威脅智慧製造、傳統金融與區塊鏈的融合、STO實務案例等前沿主題。',
                date: '2025年10月21日（星期二）9:00-12:00',
                location: '高雄金融科技創新園區（高雄市前鎮區復興四路1號宏泰高雄創大樓2樓）',
                speakers: [
                    { name: '李捷教授', affiliation: '國立中山大學資訊管理學系', topic: '綠色永續威脅智慧製造', time: '9:10-10:10' },
                    { name: '簡煒伶墾理', affiliation: '國泰綜合證券數位資產部', topic: '傳統金融與區塊鏈的融合', time: '10:10-11:10' },
                    { name: '邱冠鈞講師', affiliation: '國泰綜合證券數位資產部', topic: 'STO之實務案例', time: '11:10-12:10' },
                    { name: '王昭文所長', affiliation: '國立中山大學國際資產管理研究所', topic: '論壇專家諮詢時間', time: '12:10-12:30' }
                ],
                organizers: ['中山永續金融科技股份有限公司', '國立中山大學投資交易研究社'],
                advisors: ['高雄市政府青年局', '國立中山大學管理學院'],
                sponsor: '元大證券股份有限公司',
                participants: '業界專家、學者與學生'
            },
            { name: 'GREENUP!平台開發', description: '開發永續基礎發展能力測驗練習平台', link: 'https://greenup-sustainability-exam-platfor-three.vercel.app/', participants: '學習者' },
            { name: '進駐金融科技園區', description: '獲選進駐高雄金融科技創新園區', participants: '產學合作' }
        ],
        certificates: [
            { name: '第五屆2035青年人生活情境競賽佳作獎', image: 'images/certificates/2035-award.jpg', portrait: true },
            { name: '第20屆貨櫃團隊最佳進步獎', image: 'images/certificates/container-award.jpg', portrait: true }
        ],
        photos: [
            { src: 'images/aifinsys/2025-forum-poster.jpg', caption: '2025永續金融科技創新投資國際論壇海報' },
            {
                group: [
                    { src: 'images/aifinsys/fintech-hub.png', caption: '進駐金融科技園區' },
                    { src: 'images/aifinsys/tea-party.jpg', caption: '高雄金融科技創新園區 Open House 交流茶會' }
                ],
                caption: '進駐金融科技園區'
            },
            { src: 'images/aifinsys/hk-roadshow.jpg', caption: '2025香港科技園路演' }
        ]
    },
    'tastebuddies': {
        title: 'TasteBuddies美食配對交友APP開發',
        period: '2023/下 - 現在',
        position: '專題研究員 & 全端開發者',
        description: '在教授宋世祥老師的指導下，進行專題「TasteBuddies美食配對交友APP開發」之研究。TasteBuddies是一款協助選擇餐廳的APP，致力於解決人們在面臨眾多食物選擇時的困擾。負責所有程式開發與系統建置，包括前端介面設計(React Native)、後端架構串接(Node.js)、推薦演算法的實作，以及與資料庫的整合(Supabase)。',
        activities: [
            { name: 'APP功能開發', description: 'SwiftTaste單人探索、Buddies!群組決策、地圖探索等功能', tech: 'React Native + Supabase', link: 'https://senior-project-ruby.vercel.app/' },
            { name: '配對演算法設計', description: '開發餐廳推薦配對演算法，整合個人與群組偏好', tech: 'Algorithm Design' },
            { name: '2025鹽夏不夜埕地方創生', description: '參與《鹽夏不夜埕-鹽來遮好呷》地方創生活動，運用自行蒐集及製作的鹽埕地區美食資料庫進行美食推薦，該推薦系統置於活動LINE官方帳號網頁中供消費者使用', tech: 'TasteBuddies + LINE平台', participants: '150人使用' },
            { name: '2025鹽埕奶茶節數據分析', description: '參與《鹽埕奶茶節》地方創生活動，針對參與奶茶節的餐廳及飲料店提供消費者美食推薦，並於TasteBuddies後台進行流量數據分析與成效評估', tech: '數據分析 + 後台系統', role: '技術支援與數據分析' },
            { name: '專題Demo影片', description: 'TasteBuddies APP功能展示影片', video: 'https://youtube.com/shorts/bDN5JXtNWnA' },
            { name: '中原大學100K創業競賽', description: '參加創新創業募資競賽', status: '已參賽' },
            { name: 'Design For Taiwan', description: '第十屆社會創新挑戰賽', status: '進入複賽' }
        ],
        certificates: [
            { name: '100K創業競賽參賽證明', image: 'images/certificates/100k-cert.jpg', portrait: true }
        ],
        photos: [
            { src: 'images/tastebuddies/team-work.jpg', caption: '團隊開發過程' }
        ]
    },
    'local-creation': {
        title: '地方創生活動 - 鹽夏不夜埕系列',
        period: '2023 - 2025',
        position: '策展團隊成員 & 技術開發者',
        description: '在宋世祥教授帶領下，連續三年參與鹽夏不夜埕夜間街區創作展。從平面設計、裝置藝術到數據應用，展現多元能力與地方創生實踐。',
        activities: [
            { name: '2023 平面設計部', description: '負責邀請函、活動DM、海報等視覺設計', role: '平面設計師' },
            { name: '2024 裝置藝術', description: '負責裝置藝術作品製作與發表', role: '藝術創作者' },
            { name: '2025 美食推薦系統', description: '結合TasteBuddies專題，建立鹽埕地區美食資料庫', users: '150人使用' },
            { name: '2025 鹽埕奶茶節', description: '參與地方創生活動，提供美食推薦服務', role: '技術支援' }
        ],
        certificates: [
            { name: '2023鹽夏不夜埕參展證明', image: 'images/certificates/yancheng-2023-cert.jpg' },
            { name: '2024鹽夏不夜埕參展證明', image: 'images/certificates/yancheng-2024-cert.jpg' }
        ],
        photos: [
            { src: 'images/local-creation/yancheng-2023.jpg', caption: '2023鹽夏不夜埕活動現場' },
            { src: 'images/local-creation/yancheng-2024.jpg', caption: '2024鹽夏不夜埕裝置藝術' },
            { src: 'images/local-creation/yancheng-2025.jpg', caption: '2025鹽夏不夜埕美食推薦' }
        ]
    }
};

// 開啟經歷詳情彈窗
function openTimelineModal(experienceId) {
    const modal = document.getElementById('timelineModal');
    const data = timelineData[experienceId];

    if (!data) return;

    // 設定標題和基本資訊
    document.getElementById('timelineModalTitle').textContent = data.title;
    document.getElementById('timelinePeriod').textContent = data.period;
    document.getElementById('timelinePosition').textContent = data.position;
    document.getElementById('timelineDescription').textContent = data.description;

    // 生成活動卡片
    const activitiesGrid = document.getElementById('timelineActivitiesGrid');
    activitiesGrid.innerHTML = '';
    data.activities.forEach(activity => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> ${activity.name}</h4>
            <p>${activity.description}</p>
            ${activity.participants ? `<span class="activity-meta"><i class="fas fa-users"></i> ${activity.participants}</span>` : ''}
            ${activity.tech ? `<span class="activity-meta"><i class="fas fa-code"></i> ${activity.tech}</span>` : ''}
            ${activity.link ? `<a href="${activity.link}" target="_blank" class="activity-link"><i class="fas fa-external-link-alt"></i> 查看網站</a>` : ''}
            ${activity.video ? `<a href="${activity.video}" target="_blank" class="activity-link"><i class="fab fa-youtube"></i> 觀看影片</a>` : ''}
            ${activity.status ? `<span class="activity-status">${activity.status}</span>` : ''}
        `;
        activitiesGrid.appendChild(card);
    });

    // 生成證書卡片
    const certificatesGrid = document.getElementById('timelineCertificatesGrid');
    certificatesGrid.innerHTML = '';
    if (data.certificates && data.certificates.length > 0) {
        data.certificates.forEach(cert => {
            const certCard = document.createElement('div');
            certCard.className = 'cert-card';
            const portraitClass = cert.portrait ? ' portrait-cert' : '';
            const rotateClass = cert.rotate ? ' rotate-cert' : '';
            certCard.innerHTML = `
                <img src="${cert.image}" alt="${cert.name}" class="${portraitClass}${rotateClass}" onclick="viewCertificate('${cert.image}', '${cert.name}', ${cert.portrait || false}, ${cert.rotate || false})">
                <p>${cert.name}</p>
            `;
            certificatesGrid.appendChild(certCard);
        });
    } else {
        certificatesGrid.innerHTML = '<p class="no-content">暫無相關證書</p>';
    }

    // 生成照片圖庫（只有高中不顯示照片區）
    const photosGallery = document.getElementById('timelinePhotosGallery');
    const photosSection = photosGallery.closest('.timeline-modal-section');

    if (experienceId === 'high-school') {
        // 隱藏整個照片區域(僅高中)
        if (photosSection) {
            photosSection.style.display = 'none';
        }
    } else {
        // 顯示照片區域
        if (photosSection) {
            photosSection.style.display = 'block';
        }

        photosGallery.innerHTML = '';
        if (data.photos && data.photos.length > 0) {
            // 檢查是否為新的活動群組結構（有name和photos陣列）
            const isActivityStructure = data.photos[0].name && data.photos[0].photos;

            if (isActivityStructure) {
                // 新的活動群組結構 - 添加專用class以覆蓋grid佈局
                photosGallery.className = 'photos-gallery activity-photos-section';

                data.photos.forEach((activity, activityIndex) => {
                    const activityDiv = document.createElement('div');
                    activityDiv.className = 'activity-group';

                    // 活動標題與metadata
                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'activity-group-header';
                    titleDiv.innerHTML = `
                        <h4 class="activity-group-title">${activity.name}</h4>
                        <div class="activity-meta-icons">
                            ${activity.participants ? `<span class="meta-icon"><i class="fas fa-users"></i> ${activity.participants}</span>` : ''}
                            ${activity.rating ? `<span class="meta-icon"><i class="fas fa-star"></i> ${activity.rating}</span>` : ''}
                        </div>
                    `;
                    activityDiv.appendChild(titleDiv);

                    // 如果只有一張照片,直接顯示
                    if (activity.photos.length === 1) {
                        const singlePhoto = activity.photos[0];
                        const singlePhotoDiv = document.createElement('div');
                        singlePhotoDiv.className = 'single-photo';
                        singlePhotoDiv.innerHTML = `
                            <img src="${singlePhoto.src}" alt="${singlePhoto.caption}" onclick="viewPhoto('${singlePhoto.src}', '${singlePhoto.caption}')">
                            <p class="photo-caption">${singlePhoto.caption}</p>
                        `;
                        activityDiv.appendChild(singlePhotoDiv);
                    } else {
                        // 多張照片創建carousel
                        const carouselId = `timeline-activity-carousel-${activityIndex}`;
                        const carouselDiv = document.createElement('div');
                        carouselDiv.className = 'activity-carousel';
                        carouselDiv.id = carouselId;
                        carouselDiv.setAttribute('data-carousel-id', carouselId);

                        carouselDiv.innerHTML = `
                            <div class="carousel-container">
                                ${activity.photos.map((photo, photoIndex) => `
                                    <div class="carousel-slide ${photoIndex === 0 ? 'active' : ''}">
                                        <img src="${photo.src}" alt="${photo.caption}">
                                        <p class="carousel-caption">${photo.caption}</p>
                                    </div>
                                `).join('')}
                            </div>
                            ${activity.photos.length > 1 ? `
                                <button class="carousel-btn prev" onclick="changeSlide(this, -1)">‹</button>
                                <button class="carousel-btn next" onclick="changeSlide(this, 1)">›</button>
                                <div class="carousel-indicators">
                                    ${activity.photos.map((_, i) => `
                                        <span class="dot ${i === 0 ? 'active' : ''}" onclick="currentSlide(this, ${i})"></span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        `;
                        activityDiv.appendChild(carouselDiv);
                    }

                    photosGallery.appendChild(activityDiv);
                });
            } else {
                // 舊的簡單照片結構（兼容性） - 恢復grid佈局
                photosGallery.className = 'photos-gallery';

                data.photos.forEach((photo, index) => {
                    const photoCard = document.createElement('div');
                    photoCard.className = 'photo-card';

                    // 檢查是否為群組照片
                    if (photo.group && photo.group.length > 0) {
                        // 在gallery只顯示第一張照片,點擊後打開carousel
                        const firstPhoto = photo.group[0];
                        const groupJson = JSON.stringify(photo.group).replace(/"/g, '&quot;');
                        photoCard.innerHTML = `
                            <img src="${firstPhoto.src}" alt="${photo.caption}" onclick="viewPhotoGroup('${groupJson}', 0)">
                            <p>${photo.caption}</p>
                        `;
                    } else {
                        // 單張照片
                        photoCard.innerHTML = `
                            <img src="${photo.src}" alt="${photo.caption}" onclick="viewPhoto('${photo.src}', '${photo.caption}')">
                            <p>${photo.caption}</p>
                        `;
                    }

                    photosGallery.appendChild(photoCard);
                });
            }
        } else {
            photosGallery.innerHTML = '<p class="no-content">暫無活動照片</p>';
        }
    }

    modal.style.display = 'block';
}

// 關閉經歷詳情彈窗
function closeTimelineModal() {
    document.getElementById('timelineModal').style.display = 'none';
    // 停止所有自動輪播
    stopAllCarousels();
}

// Carousel控制函數
let carouselIntervals = {};

function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));

    slides[currentIndex].classList.remove('active');
    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + direction + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

function jumpToSlide(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

function startAutoCarousel(carouselId, interval = 3000) {
    // 停止現有輪播
    if (carouselIntervals[carouselId]) {
        clearInterval(carouselIntervals[carouselId]);
    }

    // 啟動新輪播
    carouselIntervals[carouselId] = setInterval(() => {
        moveCarousel(carouselId, 1);
    }, interval);
}

function stopAllCarousels() {
    Object.keys(carouselIntervals).forEach(id => {
        clearInterval(carouselIntervals[id]);
    });
    carouselIntervals = {};
}

// 全局函數
window.moveCarousel = moveCarousel;
window.jumpToSlide = jumpToSlide;
window.startAutoCarousel = startAutoCarousel;

// 查看證書
function viewCertificate(imageSrc, title, isPortrait = false, shouldRotate = false) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateModalImage');
    const modalTitle = document.getElementById('certificateModalTitle');
    const modalDescription = document.getElementById('certificateModalDescription');
    const modalDate = document.getElementById('certificateModalDate');

    // 清空舊內容
    modalImage.src = '';
    modalTitle.textContent = '';
    modalDescription.textContent = '';
    modalDate.textContent = '';

    // 移除之前的class
    modalImage.classList.remove('portrait-certificate');
    modalImage.classList.remove('rotate-certificate');

    // 顯示彈窗
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // 添加載入動畫
    modalImage.style.opacity = '0';
    modalTitle.textContent = '載入中...';

    // 載入圖片
    const img = new Image();
    img.onload = function () {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modalImage.style.opacity = '1';
        modalImage.style.transition = 'opacity 0.3s ease';

        // 如果是直向證書，添加class
        if (isPortrait) {
            modalImage.classList.add('portrait-certificate');
        }

        // 如果需要旋轉，添加class
        if (shouldRotate) {
            modalImage.classList.add('rotate-certificate');
        }
    };
    img.onerror = function () {
        modalTitle.textContent = title;
        modalDescription.textContent = '圖片載入失敗';
        modalImage.style.opacity = '1';
    };
    img.src = imageSrc;
}

// 查看照片
function viewPhoto(imageSrc, caption) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateModalImage');
    const modalTitle = document.getElementById('certificateModalTitle');
    const modalDescription = document.getElementById('certificateModalDescription');
    const modalDate = document.getElementById('certificateModalDate');

    // 清空舊內容
    modalImage.src = '';
    modalTitle.textContent = '';
    modalDescription.textContent = '';
    modalDate.textContent = '';

    // 顯示彈窗
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // 添加載入動畫
    modalImage.style.opacity = '0';
    modalTitle.textContent = '載入中...';

    // 載入圖片
    const img = new Image();
    img.onload = function () {
        modalImage.src = imageSrc;
        modalTitle.textContent = caption;
        modalImage.style.opacity = '1';
        modalImage.style.transition = 'opacity 0.3s ease';
    };
    img.onerror = function () {
        modalTitle.textContent = caption;
        modalDescription.textContent = '圖片載入失敗';
        modalImage.style.opacity = '1';
    };
    img.src = imageSrc;
}

// 查看照片群組(帶carousel)
function viewPhotoGroup(groupJson, startIndex = 0) {
    const photos = JSON.parse(groupJson.replace(/&quot;/g, '"'));
    const modal = document.getElementById('certificateModal');
    const modalContent = modal.querySelector('.certificate-modal-content');

    // 清空並重建modal內容為carousel
    modalContent.innerHTML = `
        <span class="close-modal" onclick="closeCertificateModal()">&times;</span>
        <div class="photo-group-carousel" id="photoGroupCarousel">
            <div class="carousel-track">
                ${photos.map((photo, index) => `
                    <div class="carousel-slide ${index === startIndex ? 'active' : ''}">
                        <img src="${photo.src}" alt="${photo.caption}">
                        <p class="carousel-caption-large">${photo.caption}</p>
                    </div>
                `).join('')}
            </div>
            ${photos.length > 1 ? `
                <button class="carousel-btn prev" onclick="moveCarousel('photoGroupCarousel', -1)">‹</button>
                <button class="carousel-btn next" onclick="moveCarousel('photoGroupCarousel', 1)">›</button>
                <div class="carousel-indicators">
                    ${photos.map((_, i) => `<span class="dot ${i === startIndex ? 'active' : ''}" onclick="jumpToSlide('photoGroupCarousel', ${i})"></span>`).join('')}
                </div>
            ` : ''}
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // 啟動自動輪播
    if (photos.length > 1) {
        setTimeout(() => startAutoCarousel('photoGroupCarousel', 4000), 100);
    }
}

// 關閉證書彈窗
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    stopAllCarousels();

    // 恢復原始modal結構
    const modalContent = modal.querySelector('.certificate-modal-content');
    modalContent.innerHTML = `
        <span class="close-modal" onclick="closeCertificateModal()">&times;</span>
        <h2 id="certificateModalTitle"></h2>
        <img id="certificateModalImage" src="" alt="證書">
        <p id="certificateModalDescription"></p>
        <p id="certificateModalDate"></p>
    `;
}

// 查看 PDF 簡報
function viewPDF(pdfUrl, title) {
    const modal = document.getElementById('certificateModal');
    const modalContent = modal.querySelector('.certificate-modal-content');

    // 重建modal內容為PDF檢視器
    modalContent.innerHTML = `
        <span class="close-modal" onclick="closeCertificateModal()">&times;</span>
        <h2 style="color: white; margin-bottom: 20px;">${title} - 簡報</h2>
        <div class="pdf-viewer-container">
            <iframe src="${pdfUrl}" style="width: 100%; height: 80vh; border: none; border-radius: 8px;"></iframe>
        </div>
        <div style="margin-top: 15px; text-align: center;">
            <a href="${pdfUrl}" download class="btn-primary" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 5px;">
                <i class="fas fa-download"></i> 下載簡報
            </a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 全局函數
window.viewPDF = viewPDF;

// 全局函數
window.viewPhoto = viewPhoto;
window.viewPhotoGroup = viewPhotoGroup;
window.closeCertificateModal = closeCertificateModal;

// 點擊彈窗外部關閉
window.onclick = function (event) {
    const timelineModal = document.getElementById('timelineModal');
    if (event.target == timelineModal) {
        closeTimelineModal();
    }
}