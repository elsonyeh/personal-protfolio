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
                    behavior: 'smooth'
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
    const statNumbers = document.querySelectorAll('.stat-number');
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
    const form = document.querySelector('.contact-form form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 簡單的表單驗證和提交動畫
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 發送中...';
            submitBtn.disabled = true;

            // 模擬發送
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> 發送成功！';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 2000);
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
            description: '負責「TasteBuddies」WEB App的程式設計與前端開發，從前端介面設計規劃、使用者體驗優化到後端API串接，皆由我負責。此專案使用React Native + Firebase架構實現推薦制度與即時互動功能，並採用敏捷式開發，注重使用者體驗與技術整合。這個App致力於解決「不知道吃什麼」的選擇困難，幫助使用者提升日常用餐效率。',
            image: 'https://via.placeholder.com/600x400/667eea/ffffff?text=TasteBuddies+App',
            video: 'https://www.youtube.com/embed/lnz3dtOpI50',
            tech: ['React Native', 'Firebase', 'UI/UX設計', '敏捷開發', 'JavaScript', '即時互動'],
            demoLink: 'https://youtube.com/shorts/lnz3dtOpI50',
            codeLink: '#',
            presentationLink: '#'
        },
        aifinsys: {
            title: '中山永續金融科技',
            description: '作為中山永續金融科技的成員之一，我負責網站建置與ESG研討會規劃、企業推廣，實際參與產學整合與科技應用推動。團隊以AI演算法與風險場景為基礎，協助企業建立永續投資策略，提升風險韌性。未來將會持續增加永續規劃相關服務。',
            image: 'https://via.placeholder.com/600x400/4CAF50/ffffff?text=FinTech+ESG',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            tech: ['ESG', 'FinTech', 'AI演算法', '風險管理', '永續投資', '網站開發'],
            demoLink: 'https://aifinsys.com',
            codeLink: '#',
            presentationLink: '#'
        },
        leadership: {
            title: '學生自治與活動規劃',
            description: '曾任第十八屆學生議會副議長、選舉委員會主任委員、財務會主委、學生會活動部部長，曾經規劃多場大型校園活動，包括社團博覽會與社團展演等，最高曾吸引超過800人參與。負責舉辦心理健康推廣議題性活動，促進校園正向對話與關懷氛圍。同時我亦是學校多項正式會議的學生代表委員，實際參與校政研議與預算制度設計，累積豐富的議事經驗與跨單位溝通協調能力。',
            image: 'https://via.placeholder.com/600x400/f093fb/ffffff?text=Student+Leadership',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            tech: ['活動規劃', '團隊領導', '跨部門溝通', '議事經驗', '學生代表', '心理健康推廣'],
            demoLink: '#',
            codeLink: '#',
            presentationLink: '#'
        },
        skills: {
            title: '技術技能作品集',
            description: '展示我在程式開發領域的技術技能，包括前端開發（HTML/CSS、JavaScript）、後端開發（Python、SQL）、行動應用開發（React Native）、資料庫管理（Firebase、PostgreSQL）、版本控制（Git/GitHub）以及UI/UX設計（Figma）等多項專業技能。採用敏捷開發方法論，注重程式碼品質與使用者體驗。',
            image: 'https://via.placeholder.com/600x400/9C27B0/ffffff?text=Skills+Portfolio',
            video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            tech: ['HTML/CSS', 'JavaScript', 'Python', 'SQL', 'React Native', 'Firebase', 'Git/GitHub', 'Figma'],
            demoLink: '#',
            codeLink: '#',
            presentationLink: '#'
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
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalVideo').src = project.video;

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
        const links = modal.querySelectorAll('.project-links a');
        links[0].href = project.demoLink;
        links[1].href = project.codeLink;
        links[2].href = project.presentationLink;

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
            behavior: 'smooth'
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
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.textContent);
                animateCoursesCounter(stat, target);
            });
        }
    });

    const summarySection = document.querySelector('.courses-summary');
    if (summarySection) {
        observer.observe(summarySection);
    }
}

function animateCoursesCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const isDecimal = target.toString().includes('.');

    const timer = setInterval(() => {
        current += increment;

        if (isDecimal) {
            element.textContent = current.toFixed(2);
        } else {
            element.textContent = Math.floor(current);
        }

        if (current >= target) {
            if (isDecimal) {
                element.textContent = target.toFixed(2);
            } else {
                element.textContent = target;
            }
            clearInterval(timer);
        }
    }, 20);
}

// 初始化修課統計動畫
initCoursesStatsAnimation();

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

// 自動輪播功能（可選）
function initCarouselAutoplay() {
    const carousels = document.querySelectorAll('.activity-carousel');

    carousels.forEach(carousel => {
        setInterval(() => {
            const nextButton = carousel.querySelector('.carousel-next');
            if (nextButton && !carousel.matches(':hover')) {
                changeSlide(nextButton, 1);
            }
        }, 5000); // 每5秒自動切換
    });
}

// 在頁面載入後啟動自動輪播
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarouselAutoplay);
} else {
    initCarouselAutoplay();
}

// 經歷詳情資料庫
const timelineData = {
    'high-school': {
        title: '國立台灣師範大學附屬高級中學',
        period: '2019 - 2022',
        position: '學生會活動長、畢聯會活動長',
        description: '高中階段就讀師大附中，培養多元興趣與學習基礎，並參與學生自治擔任學生會活動長與畢聯會活動長，累積活動規劃經驗。透過參與學生會活動，學習如何組織大型校園活動、與不同部門溝通協調，以及預算規劃與執行。',
        activities: [
            { name: '學生會活動規劃', description: '擔任學生會活動長，規劃並執行多場校園活動', participants: '全校師生參與' },
            { name: '畢業舞會籌備', description: '擔任畢聯會活動長，負責畢業相關活動籌備', participants: '應屆畢業生' }
        ],
        certificates: []
    },
    'nsysu': {
        title: '國立中山大學',
        period: '2022 - 現在',
        position: '人文暨科技跨領域學士學位學程、輔系資訊管理學系',
        description: '就讀人文暨科技跨領域學士學位學程，輔系資訊管理學系。一至三年級在校學業成績總平均GPA 4.06，系排名4/44(9.09%)，連續三年下學期榮獲國立中山大學書香獎。擔任第十七屆學生會活動部長、第十八屆學生議會副議長、秘書長及財務稽核委員會召集委員，同時擔任第十八屆學生會選舉委員會主任委員，積極參與校園事務與學生自治。',
        activities: [
            { name: '學業表現', description: 'GPA 4.06，系排名 4/44 (9.09%)，連續三年榮獲書香獎', participants: '個人成就' },
            { name: 'Google數位人才探索計畫', description: '完成Google數位行銷與Google Cloud學程，學習數位廣告投放、AI應用、雲端運算與機器學習', participants: '2025年暑期' },
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
        ]
    },
    'aifinsys': {
        title: '中山永續金融科技股份有限公司',
        period: 'Feb 2025 - 現在',
        position: '業務經理 & 共同創辦人',
        description: '與同學高虂葳共同創辦中山永續金融科技股份有限公司(AI FinTech Corp.)，擔任業務經理一職。公司致力於開發AI氣候演算避險解決方案，擁有Ai+ESG金融科技避險的專利技術(專利申請中)。',
        activities: [
            { name: '官網建置與維護', description: '負責公司官網開發與維護', link: 'https://aifinsys.com' },
            { name: '永續金融論壇籌備', description: '籌備2025年10月21日永續金融論壇', participants: '業界專家與學者' },
            { name: 'GREENUP!平台開發', description: '開發永續基礎發展能力測驗練習平台', link: 'https://greenup-sustainability-exam-platfor-three.vercel.app/', participants: '學習者' },
            { name: '進駐金融科技園區', description: '獲選進駐高雄金融科技創新園區', participants: '產學合作' }
        ],
        certificates: [
            { name: '第五屆2035青年人生活情境競賽佳作獎', image: 'images/certificates/2035-award.jpg', portrait: true },
            { name: '第20屆貨櫃團隊最佳進步獎', image: 'images/certificates/container-award.jpg', portrait: true }
        ],
        photos: [
            { src: 'images/aifinsys/fintech-hub.jpg', caption: '進駐金融科技園區' },
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
            { name: '專題Demo影片', description: 'TasteBuddies APP功能展示影片', video: 'https://youtube.com/shorts/lnz3dtOpI50' },
            { name: '中原大學100K創業競賽', description: '參加創新創業募資競賽', status: '已參賽' },
            { name: 'Design For Taiwan', description: '第十屆社會創新挑戰賽', status: '進入複賽' }
        ],
        certificates: [
            { name: '100K創業競賽參賽證明', image: 'images/certificates/100k-cert.jpg', portrait: true }
        ],
        photos: [
            { src: 'images/tastebuddies/app-demo.jpg', caption: 'APP介面展示' },
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

    // 生成照片圖庫（高中和中山大學不顯示照片區）
    const photosGallery = document.getElementById('timelinePhotosGallery');
    const photosSection = photosGallery.closest('.timeline-modal-section');

    if (experienceId === 'high-school' || experienceId === 'nsysu') {
        // 隱藏整個照片區域
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
            data.photos.forEach(photo => {
                const photoCard = document.createElement('div');
                photoCard.className = 'photo-card';
                photoCard.innerHTML = `
                    <img src="${photo.src}" alt="${photo.caption}" onclick="viewPhoto('${photo.src}', '${photo.caption}')">
                    <p>${photo.caption}</p>
                `;
                photosGallery.appendChild(photoCard);
            });
        } else {
            photosGallery.innerHTML = '<p class="no-content">暫無活動照片</p>';
        }
    }

    modal.style.display = 'block';
}

// 關閉經歷詳情彈窗
function closeTimelineModal() {
    document.getElementById('timelineModal').style.display = 'none';
}

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

// 點擊彈窗外部關閉
window.onclick = function (event) {
    const timelineModal = document.getElementById('timelineModal');
    if (event.target == timelineModal) {
        closeTimelineModal();
    }
}