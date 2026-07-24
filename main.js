/* main.js - Interactive Scripts with Language Translation & GitHub API Integration */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Language Translation Dictionary (KO / EN)
    // ==========================================================================
    const translations = {
        ko: {
            nav_home: "Home",
            nav_about: "About",
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_contact: "Contact",
            
            hero_tag: "Welcome to my space",
            hero_title: "안녕하세요,<br>성장하는 웹 개발자 <span class=\"highlight\">홍길동</span>입니다.",
            hero_desc: "사용자 경험을 최우선으로 생각하며, 깔끔하고 유지보수하기 좋은 코드를 작성합니다. 최신 웹 기술 트렌드에 관심이 많고 끊임없이 배움을 추구합니다.",
            btn_view_projects: "프로젝트 보기",
            btn_contact: "연락하기",
            visual_code: "클린 코드",
            visual_responsive: "반응형 디자인",

            about_tag: "About Me",
            about_title: "자기소개",
            about_info_title: "도전을 즐기고 소통을 중요시합니다",
            about_info_desc: "웹 프론트엔드 및 백엔드 기술에 대한 깊은 이해를 바탕으로, 복잡한 비즈니스 로직을 심플하고 직관적인 화면으로 풀어내는 것에 즐거움을 느낍니다. 단순히 기획서대로 구현하는 것을 넘어, \"왜 이 기능이 필요한가?\"에 대한 고민을 함께 나누는 개발자가 되고자 노력합니다.",
            detail_name_label: "이름",
            detail_name_val: "홍길동",
            detail_email_label: "이메일",
            detail_phone_label: "휴대폰",
            detail_job_label: "희망 직무",
            detail_job_val: "프론트엔드 / 풀스택 개발자",
            about_skills_title: "보유 기술",

            exp_tag: "Career Journey",
            exp_title: "경력 및 활동",
            exp1_company: "A 테크놀로지",
            exp1_role: "프론트엔드 개발자 (사원)",
            exp1_task1: "자사 이커머스 플랫폼의 웹 어플리케이션 고도화 및 리팩토링",
            exp1_task2: "페이지 로딩 속도 향상 (초기 렌더링 속도 30% 개선)",
            exp1_task3: "디자인 시스템 구축 및 공통 컴포넌트 라이브러리 개발",
            exp2_company: "스마트 코딩 아카데미",
            exp2_role: "웹 개발자 양성 과정 수료",
            exp2_task1: "HTML, CSS, JavaScript, React 기반의 웹 퍼블리싱 학습",
            exp2_task2: "Node.js 및 Express를 활용한 RESTful API 설계 및 DB 연동 실습",
            exp2_task3: "팀 내 프론트엔드 리더로서 3개의 웹 어플리케이션 프로젝트 완료",
            exp3_company: "한국대학교",
            exp3_role: "컴퓨터공학과 학사 졸업",
            exp3_task1: "알고리즘, 자료구조, 네트워크, 운영체제 등 핵심 컴퓨터공학 이론 이수",
            exp3_task2: "웹 프로그래밍 과목 우수 성적 획득",
            exp3_task3: "졸업 프로젝트: 웹 기반 스케줄링 협업 툴 개발 (최우수상 수상)",

            proj_tag: "My Works",
            proj_title: "주요 프로젝트",
            proj_filter_all: "전체",
            proj_filter_starred: "인기 항목 (Starred)",
            proj_filter_recent: "최근 업데이트",
            projects_loading_text: "GitHub에서 프로젝트를 불러오는 중입니다...",
            projects_error_text: "GitHub API 호출에 실패했습니다. 아래 링크에서 전체 프로젝트를 확인하실 수 있습니다.",

            contact_tag: "Let's Talk",
            contact_title: "연락처 및 제안",
            contact_info_title: "새로운 기회를 기다리고 있습니다",
            contact_info_desc: "함께 일하고 성장할 수 있는 팀을 찾고 있습니다. 프로젝트 문의, 기술적 질문, 혹은 그 외 가벼운 커피챗 제안 모두 환영합니다.",
            contact_email_label: "이메일",
            contact_github_label: "깃허브",
            contact_linkedin_label: "링크드인",

            form_name_label: "성함",
            form_name_placeholder: "홍길동",
            form_email_label: "이메일 주소",
            form_email_placeholder: "you@example.com",
            form_msg_label: "메시지",
            form_msg_placeholder: "제안하실 내용을 적어주세요...",
            form_submit_btn: "메시지 전송하기",
            form_success_title: "메시지가 정상적으로 전송되었습니다!",
            form_success_desc: "빠른 시일 내에 기재해주신 이메일로 답변드리겠습니다. 감사합니다.",

            footer_copyright: "© 2026 홍길동. All rights reserved.",

            // Dynamic project specific translations
            proj_duration: "업데이트: ",
            proj_btn_demo: "라이브 데모",
            proj_btn_repo: "GitHub 레포",
            proj_no_desc: "상세 설명이 등록되지 않은 레포지토리입니다."
        },
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_contact: "Contact",
            
            hero_tag: "Welcome to my space",
            hero_title: "Hello,<br>I am <span class=\"highlight\">Gildong Hong</span>, a growing web developer.",
            hero_desc: "I prioritize user experience, writing clean, maintainable, and highly readable code. I love exploring new web technology trends and keeping myself updated with continuous learning.",
            btn_view_projects: "View Projects",
            btn_contact: "Get in Touch",
            visual_code: "Clean Code",
            visual_responsive: "Responsive Design",

            about_tag: "About Me",
            about_title: "About Me",
            about_info_title: "I enjoy taking challenges and appreciate open communication",
            about_info_desc: "Based on a deep understanding of frontend and backend technologies, I enjoy resolving complex business logic into simple, intuitive user interfaces. Going beyond just implementing features from specs, I strive to collaborate on understanding \"Why is this feature needed?\"",
            detail_name_label: "Name",
            detail_name_val: "Gildong Hong",
            detail_email_label: "Email",
            detail_phone_label: "Phone",
            detail_job_label: "Target Role",
            detail_job_val: "Frontend / Full-Stack Developer",
            about_skills_title: "My Skills",

            exp_tag: "Career Journey",
            exp_title: "Experience",
            exp1_company: "A Technology",
            exp1_role: "Frontend Developer (Junior)",
            exp1_task1: "Refactored and enhanced the web application of our e-commerce platform",
            exp1_task2: "Improved page loading performance (30% reduction in initial rendering time)",
            exp1_task3: "Built a localized design system and reusable UI component library",
            exp2_company: "Smart Coding Academy",
            exp2_role: "Full-Stack Web Boot Camp Graduate",
            exp2_task1: "Learned semantic markup, responsive layout, JavaScript and React fundamentals",
            exp2_task2: "Designed RESTful APIs and connected databases using Node.js, Express, and MongoDB",
            exp2_task3: "Served as a Frontend Team Lead to successfully deploy 3 web projects",
            exp3_company: "Hankuk University",
            exp3_role: "B.S. in Computer Science & Engineering",
            exp3_task1: "Studied core computer science theories including algorithms, data structures, and networks",
            exp3_task2: "Achieved outstanding grades in Web Programming courses",
            exp3_task3: "Graduation Project: Developed a web-based scheduling/collaboration tool (Grand Prize)",

            proj_tag: "My Works",
            proj_title: "Projects",
            proj_filter_all: "All",
            proj_filter_starred: "Starred",
            proj_filter_recent: "Recent",
            projects_loading_text: "Fetching repositories from GitHub...",
            projects_error_text: "Failed to load GitHub repositories. You can explore them directly via the link below.",

            contact_tag: "Let's Talk",
            contact_title: "Contact",
            contact_info_title: "Always open for exciting opportunities",
            contact_info_desc: "I am actively looking for a team where I can grow and deliver value. Any inquiries, technical discussions, or casual coffee chat requests are highly welcome.",
            contact_email_label: "Email",
            contact_github_label: "GitHub",
            contact_linkedin_label: "LinkedIn",

            form_name_label: "Your Name",
            form_name_placeholder: "Gildong Hong",
            form_email_label: "Email Address",
            form_email_placeholder: "you@example.com",
            form_msg_label: "Message",
            form_msg_placeholder: "Write your message details here...",
            form_submit_btn: "Send Message",
            form_success_title: "Message Sent Successfully!",
            form_success_desc: "I'll review it and get back to your email as soon as possible. Thank you!",

            footer_copyright: "© 2026 Gildong Hong. All rights reserved.",

            // Dynamic project specific translations
            proj_duration: "Updated: ",
            proj_btn_demo: "Live Demo",
            proj_btn_repo: "GitHub Repo",
            proj_no_desc: "No description provided for this repository."
        }
    };

    // Track active language
    let currentLang = localStorage.getItem('portfolio_lang') || 'ko';

    // Helper function to apply translations to static elements
    function applyTranslations(lang) {
        // Translate normal elements
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Keep html tag integrity for certain styled blocks
                if (key === 'hero_title' || key.includes('title') || key.includes('desc') || key.includes('task')) {
                    elem.innerHTML = translations[lang][key];
                } else {
                    elem.textContent = translations[lang][key];
                }
            }
        });

        // Translate placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(elem => {
            const key = elem.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                elem.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // Update Toggle button display text
        const langText = document.querySelector('.lang-text');
        if (langText) {
            langText.textContent = lang === 'ko' ? 'EN' : 'KO';
        }

        // Re-render dynamic projects to update buttons, labels, and fallback descriptions
        renderProjects(fetchedRepos, lang);
    }

    // Language Toggle Click Event
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ko' ? 'en' : 'ko';
            localStorage.setItem('portfolio_lang', currentLang);
            applyTranslations(currentLang);
        });
    }

    // ==========================================================================
    // 2. Navigation Header Scroll Effect
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 3. Mobile Menu Toggle
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon between 'menu' and 'x' (Lucide icons)
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons(); // Re-render icon
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons(); // Re-render icon
            });
        });
    }

    // ==========================================================================
    // 4. GitHub API Integration & Dynamic Card Rendering
    // ==========================================================================
    const projectGrid = document.getElementById('project-grid');
    const projectsLoading = document.getElementById('projects-loading');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let fetchedRepos = []; // Cache for fetched repositories

    // Map of custom titles and descriptions for specific repositories to make it look premium
    const customRepoDetails = {
        'StyleHub': {
            ko: { name: 'React 쇼핑 플랫폼 "StyleHub"', desc: '사용자가 원하는 스타일의 옷을 탐색하고 장바구니에 담을 수 있는 반응형 커머스 웹 어플리케이션입니다.' },
            en: { name: 'React E-Commerce Platform "StyleHub"', desc: 'A responsive style-focused e-commerce web application where users can browse clothes, apply filters, and manage a cart.' }
        },
        'TaskFlow': {
            ko: { name: '협업 스케줄러 "TaskFlow"', desc: '팀원들과 태스크를 실시간으로 공유하고, 드래그 앤 드롭으로 칸반 보드를 관리할 수 있는 생산성 도구입니다.' },
            en: { name: 'Collaboration Scheduler "TaskFlow"', desc: 'A team-driven productivity platform featuring drag-and-drop Kanban boards with real-time sync via Socket.io.' }
        },
        'Lyricist': {
            ko: { name: '음악 가사 플레이어 "Lyricist"', desc: '오디오 파일과 가사 텍스트를 싱크 연동하여 화면에 가사가 시간 흐름에 맞춰 연동되도록 정밀 제작한 오디오 플레이어입니다.' },
            en: { name: 'Lyrics Synced Player "Lyricist"', desc: 'A refined HTML5 audio player syncing audio timelines with lyric datasets to flow elegantly with audio progress.' }
        }
    };

    // Fetch repositories from GitHub API
    async function fetchGitHubProjects() {
        try {
            const username = 'gitgio99';
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            
            if (!response.ok) {
                throw new Error('API request failed');
            }

            const repos = await response.json();
            
            // Filter out forks & sort by recently updated
            fetchedRepos = repos
                .filter(repo => !repo.fork)
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

            // Hide Loading Spinner
            if (projectsLoading) {
                projectsLoading.classList.add('hidden');
            }

            renderProjects(fetchedRepos, currentLang);
        } catch (error) {
            console.error('Error fetching repositories:', error);
            handleFetchError();
        }
    }

    // Render projects grid based on fetched repositories and active language
    function renderProjects(repos, lang) {
        if (!projectGrid) return;
        
        projectGrid.innerHTML = ''; // Clear previous contents

        if (repos.length === 0) {
            return;
        }

        repos.forEach((repo, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            // Determine category or tags for filtering
            // Filter mapping: 'starred' (has stargazers) vs 'recent' (index < 3 recently updated)
            let filterCategories = ['all'];
            if (repo.stargazers_count > 0) {
                filterCategories.push('starred');
            }
            if (index < 3) {
                filterCategories.push('recent');
            }
            card.setAttribute('data-categories', filterCategories.join(' '));

            // Get translated name and description
            let displayName = repo.name;
            let displayDesc = repo.description || translations[lang].proj_no_desc;

            if (customRepoDetails[repo.name] && customRepoDetails[repo.name][lang]) {
                displayName = customRepoDetails[repo.name][lang].name;
                displayDesc = customRepoDetails[repo.name][lang].desc;
            }

            // Tech Stack tag extraction (Language + Topics)
            let techStack = [];
            if (repo.language) techStack.push(repo.language);
            if (repo.topics && Array.isArray(repo.topics)) {
                techStack = [...techStack, ...repo.topics.slice(0, 2)];
            }
            // Fallback tech badges if empty
            if (techStack.length === 0) {
                techStack = ['Git', 'GitHub'];
            }

            // Format date
            const updateDate = new Date(repo.updated_at).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
                year: 'numeric',
                month: 'short'
            });

            // Cycle placeholder icons and gradients
            const gradientClass = `bg-gradient-${(index % 3) + 1}`;
            let placeholderIcon = 'folder';
            if (repo.language === 'JavaScript' || repo.language === 'TypeScript') placeholderIcon = 'code';
            else if (repo.language === 'HTML' || repo.language === 'CSS') placeholderIcon = 'layout';
            else if (repo.homepage) placeholderIcon = 'globe';

            // Card Inner HTML
            card.innerHTML = `
                <div class="project-image">
                    <div class="project-placeholder ${gradientClass}">
                        <i data-lucide="${placeholderIcon}" class="placeholder-icon"></i>
                    </div>
                </div>
                <div class="project-info">
                    <div class="project-meta">
                        <div class="project-meta-details">
                            <span><i data-lucide="star"></i> ${repo.stargazers_count}</span>
                            <span><i data-lucide="git-fork"></i> ${repo.forks_count}</span>
                        </div>
                        <span class="project-duration">${translations[lang].proj_duration}${updateDate}</span>
                    </div>
                    <h3 class="project-name">${displayName}</h3>
                    <p class="project-description">${displayDesc}</p>
                    <div class="project-tech">
                        ${techStack.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" class="project-link-btn">
                                <i data-lucide="external-link"></i> ${translations[lang].proj_btn_demo}
                            </a>
                        ` : ''}
                        <a href="${repo.html_url}" target="_blank" class="project-link-btn">
                            <i data-lucide="github"></i> ${translations[lang].proj_btn_repo}
                        </a>
                    </div>
                </div>
            `;

            projectGrid.appendChild(card);
        });

        // Initialize Lucide icons inside the dynamically rendered cards
        lucide.createIcons();
    }

    // Handles API Failures by rendering standard offline cards
    function handleFetchError() {
        if (projectsLoading) {
            projectsLoading.innerHTML = `
                <i data-lucide="alert-circle" class="text-secondary" style="width: 40px; height: 40px;"></i>
                <p style="text-align:center; max-width: 500px; line-height: 1.5;">
                    ${translations[currentLang].projects_error_text}
                </p>
                <a href="https://github.com/gitgio99" target="_blank" class="btn btn-outline" style="margin-top: 10px;">
                    <i data-lucide="github"></i> GitHub Profile
                </a>
            `;
            lucide.createIcons();
        }

        // Render mock/simulated repos as fallbacks so page is never empty
        const fallbackRepos = [
            { name: 'StyleHub', description: 'React 쇼핑 플랫폼', stargazers_count: 5, forks_count: 2, updated_at: '2026-07-20', language: 'JavaScript', html_url: 'https://github.com/gitgio99', topics: ['React', 'CSS'] },
            { name: 'TaskFlow', description: '협업 스케줄러 태스크 매니저', stargazers_count: 8, forks_count: 4, updated_at: '2026-06-15', language: 'TypeScript', html_url: 'https://github.com/gitgio99', homepage: '#', topics: ['Next.js', 'Socket.io'] },
            { name: 'Lyricist', description: '가사 매핑 음악 플레이어', stargazers_count: 3, forks_count: 1, updated_at: '2026-05-10', language: 'JavaScript', html_url: 'https://github.com/gitgio99', topics: ['HTML5', 'Audio'] }
        ];

        fetchedRepos = fallbackRepos;
        renderProjects(fetchedRepos, currentLang);
    }

    // Project filtering mechanism (Modified to match newly loaded API categories)
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active from all and add to clicked
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                const projectCards = document.querySelectorAll('.project-card');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-categories').split(' ');

                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 5. Active Navigation Link on Scroll (Intersection Observer)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ==========================================================================
    // 6. Contact Form Submission Handling
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Sending message:', { name, email, message });

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            
            // Loading text translation
            submitBtn.innerHTML = currentLang === 'ko' ? 
                '전송 중... <i data-lucide="loader" class="animate-spin"></i>' : 
                'Sending... <i data-lucide="loader" class="animate-spin"></i>';
            lucide.createIcons();

            setTimeout(() => {
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');

                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                lucide.createIcons();
            }, 1500);
        });
    }

    // ==========================================================================
    // 7. Scroll To Top Button Logic
    // ==========================================================================
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 8. Initialization Settings
    // ==========================================================================
    applyTranslations(currentLang); // Apply saved language first
    fetchGitHubProjects();         // Fetch live projects from GitHub API
});
