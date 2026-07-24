/* main.js - Web Portfolio Interactive Scripts, Localization & Diagram Enlarge Modals */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. Language Translation Dictionary (KO / EN)
    // ==========================================================================
    const translations = {
        ko: {
            nav_home: "Home",
            nav_about: "About",
            nav_competencies: "Competencies",
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_contact: "Contact",
            nav_resume: "이력서 다운로드",
            
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

            comp_tag: "Core Skillsets",
            comp_title: "핵심 기술 역량",
            comp1_title: "시스템 프로그래밍 (System Programming)",
            comp2_title: "네트워크 및 시뮬레이션 (Network & Simulation)",
            comp3_title: "분석 및 스크립팅 (Analysis & Scripting)",

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
            diag_zoom: "클릭하여 다이어그램 확대",

            p1_title: "NS-3 기반 무선 네트워크 라우팅 프로토콜 시뮬레이터",
            p1_summary: "대규모 무선 메시 네트워크 환경에서 멀티홉 라우팅 프로토콜의 패킷 전송 효율을 검증하기 위한 시뮬레이터 개발",
            p1_duration_role: "2024.10 - 2025.02 (연구원 / 시뮬레이션 개발, 기여도 100%)",
            p1_prob_title: "문제 상황 (Problem)",
            p1_prob_desc: "노드 밀도 증가 및 이동성에 따른 무선 채널 간섭으로 패킷 손실률(Packet Loss Rate)이 급격히 증가하고 전송 신뢰도가 떨어지는 성능 저하 병목 현상이 발생했습니다.",
            p1_sol_title: "해결 방안 (Solution)",
            p1_sol_desc: "노드 잔여 에너지량 및 실시간 SINR 채널 품질 가중치를 계산하여 혼잡도가 낮고 전송 능력이 보장된 경로로 다중 경로 우회(Detour)하는 신규 알고리즘(E-AODV)을 직접 C++ 설계하여 NS-3에 탑재했습니다.",
            p1_res_title: "수행 결과 (Result)",
            p1_res_desc: "네트워크 데이터 처리량(Throughput) 24% 향상, 패킷 전송 성공률(PDR) 15% 개선 및 전력 불균형 해소를 통한 개별 노드 전력 소모 가독 최적화로 전체 토폴로지 수명을 1.8배 개선했습니다.",
            p1_trouble_title: "기술적 난관 및 해결 과정 (Troubleshooting)",
            p1_trouble_desc: "<strong>메모리 릭 및 크래시:</strong> 100개 이상의 노드가 참여하는 장시간 대규모 시뮬레이션 시 패킷 포인터 해제 실패로 RAM 누수가 심화되며 약 12시간 실행 후 시뮬레이터가 갑자기 종료되는 현상 발생. Linux 환경에서 <strong>Valgrind(Memcheck)</strong> 프로파일링을 실행하여 C++ 스마트 포인터가 우회된 원형 버퍼 내 누수 트리거 지점을 정밀 포착. `std::shared_ptr` 스마트 포인터 도입 및 의존성 주입 시점 정리, 누수 버퍼의 명시적 `clear()` 메소드 추가 작업을 통해 120시간 연속 시뮬레이션에서도 메모리 점유율을 일정하게 유지하며 크래시 병목을 원천 해결함.",

            p2_title: "고성능 리눅스 TCP/IP 원시 패킷 캡처 및 아키텍처 분석 시스템",
            p2_summary: "리눅스 네트워크 카드 커널 수준에서 들어오는 원시 소켓(Raw Socket) 데이터를 손실 없이 수집하고 실시간 패킷 헤더 정밀 파싱 처리를 담당하는 분산형 분석기 개발",
            p2_duration_role: "2024.04 - 2024.08 (시스템 개발 / 메인 아키텍트, 기여도 100%)",
            p2_prob_title: "문제 상황 (Problem)",
            p2_prob_desc: "기가비트 이더넷 급 단일 버퍼 수신 환경에서 패킷 유입량이 초당 10만 개(100k pps) 수준으로 급증하자 파싱 처리 속도 지연으로 OS 소켓 링버퍼 오버플로우 및 패킷 유실 발생.",
            p2_sol_title: "해결 방안 (Solution)",
            p2_sol_desc: "패킷 수신(I/O 스레드)과 패킷 파싱(워커 스레드)을 완전히 분리하는 고속 무잠금 원형 큐(Lock-free Circular Queue) 동기화 아키텍처 및 POSIX 스레드 풀(Thread Pool) 최적화 도입.",
            p2_res_title: "수행 결과 (Result)",
            p2_res_desc: "극한의 트래픽 환경에서도 무손실 실시간 패킷 수집률 100% (유실률 0.00%) 달성, 기가비트 환경 대비 CPU 메모리 자원 소모율 18% 절감 및 실시간 PCAP 규격 연동 성공.",
            p2_trouble_title: "기술적 난관 및 해결 과정 (Troubleshooting)",
            p2_trouble_desc: "<strong>스레드 동기화 락 경합 병목:</strong> 멀티 스레드가 큐의 쓰기/읽기 인덱스 포인터에 동시다발적으로 쓰기를 시도하면서 뮤텍스 락(Mutex Lock) 점유 대기 시간이 누적되어 속도가 크게 떨어지는 병목 현상 발생. C++11의 `std::atomic` 라이브러리를 사용해 <strong>CAS (Compare-And-Swap)</strong> 연산 기반의 무잠금(Lock-free) 프로듀서-컨슈머 링버퍼 알고리즘으로 전면 리팩토링 진행. 결과적으로 임계 구역 락 대기 오버헤드를 완전히 제거함으로써 단일 코어 패킷 유입 한계를 기존 대비 420% 이상 끌어올리는 극적인 하드웨어 성능 개선 달성.",

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
            modal_caption: "클릭하면 원래 크기로 축소됩니다."
        },
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_competencies: "Competencies",
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_contact: "Contact",
            nav_resume: "Download Resume",
            
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

            comp_tag: "Core Skillsets",
            comp_title: "Core Competencies",
            comp1_title: "System Programming",
            comp2_title: "Network & Simulation",
            comp3_title: "Analysis & Scripting",

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
            diag_zoom: "Click to Enlarge Diagram",

            p1_title: "NS-3 Wireless Network Routing Protocol Simulator",
            p1_summary: "High-performance C++ simulator validating packet delivery efficiency of multi-hop routing protocols in large-scale wireless mesh networks.",
            p1_duration_role: "2024.10 - 2025.02 (Researcher / Simulation Lead, Contribution: 100%)",
            p1_prob_title: "Problem",
            p1_prob_desc: "Wireless channel interference caused by node density and high mobility led to massive packet loss rate and network delivery reliability degradation.",
            p1_sol_title: "Solution",
            p1_sol_desc: "Designed a dynamic multi-path detour routing algorithm (E-AODV) weighting node energy level and SINR channel quality, implemented into native C++ NS-3 simulation.",
            p1_res_title: "Result",
            p1_res_desc: "Improved network throughput by 24%, increased Packet Delivery Ratio (PDR) by 15%, and extended network lifetime by 1.8x via balanced node power consumption.",
            p1_trouble_title: "Troubleshooting & Key Challenge",
            p1_trouble_desc: "<strong>Memory Leak & Crash:</strong> During long-running 100+ node simulations, heap memory consumption kept increasing until the simulator crashed after 12 hours. Executed <strong>Valgrind Memcheck</strong> profiling on Linux and isolated packet pointer leak points within raw cyclic packet buffers. Replaced with C++11 smart pointers (`std::shared_ptr`), re-structured buffer clearing sequences, and added explicit `clear()` methods on simulation reset, maintaining flat memory usage and proving 120-hour simulation stability.",

            p2_title: "High-Performance Linux TCP/IP Packet Capturer & Analyzer",
            p2_summary: "High-speed Linux Raw Socket packet collector captures and parses network headers with zero drop rates, converting Ethernet/IP/TCP structures into analytical metrics.",
            p2_duration_role: "2024.04 - 2024.08 (System Engineer / Lead Architect, Contribution: 100%)",
            p2_prob_title: "Problem",
            p2_prob_desc: "When packet volume spiked to 100k+ packets per second (pps) on a Gigabit Ethernet line, slow parsing logic triggered ring buffer overflow, resulting in massive packet drops.",
            p2_sol_title: "Solution",
            p2_sol_desc: "Separated Network I/O from parsing tasks using a high-speed lock-free circular buffer and pre-allocated POSIX thread pool for parallel worker queue handling.",
            p2_res_title: "Result",
            p2_res_desc: "Achieved 100.00% packet ingestion rate (0% loss) under extreme load, decreased overall CPU utilization overhead by 18%, and verified live export compatible with Wireshark PCAP.",
            p2_trouble_title: "Troubleshooting & Key Challenge",
            p2_trouble_desc: "<strong>Lock Contention Bottleneck:</strong> Worker threads competing for ring buffer read/write head pointers triggered extensive Mutex wait times, slowing down packet ingestion rate. Refactored the architecture using C++11 atomic library (`std::atomic`) to implement a lock-free Ring Buffer utilizing CAS (Compare-And-Swap) memory models. Removed context-switching and locks completely, increasing throughput threshold by 420%+ and fully resolving real-time data flow starvation issues.",

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
            modal_caption: "Click anywhere to close or shrink diagram."
        }
    };

    // Track active language
    let currentLang = localStorage.getItem('portfolio_lang') || 'ko';

    // Helper function to apply translations to static elements
    function applyTranslations(lang) {
        // Translate elements with data-i18n attribute
        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Keep html tag integrity for certain styled blocks
                if (key === 'hero_title' || key.includes('title') || key.includes('desc') || key.includes('task') || key.includes('summary')) {
                    elem.innerHTML = translations[lang][key];
                } else {
                    elem.textContent = translations[lang][key];
                }
            }
        });

        // Translate placeholders with data-i18n-placeholder attribute
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(elem => {
            const key = elem.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                elem.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // Update Toggle button display text (shows opposite language to switch to)
        const langText = document.querySelector('.lang-text');
        if (langText) {
            langText.textContent = lang === 'ko' ? 'EN' : 'KO';
        }
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
    // 4. Click to Enlarge Diagram Modal
    // ==========================================================================
    const diagrams = document.querySelectorAll('.project-deep-diagram-container');
    const modal = document.getElementById('diagram-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    if (diagrams && modal && modalContent) {
        diagrams.forEach(diagram => {
            diagram.addEventListener('click', () => {
                const originalSvg = diagram.querySelector('svg');
                if (originalSvg) {
                    // Clone the SVG so it displays properly in the modal
                    const clonedSvg = originalSvg.cloneNode(true);
                    clonedSvg.removeAttribute('viewBox'); // Allow responsive resizing or adjust width
                    clonedSvg.setAttribute('width', '100%');
                    clonedSvg.setAttribute('height', 'auto');
                    
                    // Clear previous content and append cloned SVG
                    modalContent.innerHTML = '';
                    modalContent.appendChild(clonedSvg);
                    
                    // Display the modal
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock background scrolling
                }
            });
        });

        // Helper function to close modal
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore background scrolling
            setTimeout(() => {
                modalContent.innerHTML = ''; // Clean up content
            }, 300);
        };

        // Close when clicking Close (X) button
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Close when clicking background backdrop
        modal.addEventListener('click', (e) => {
            // Only close if clicking the backdrop, close button, or caption
            if (e.target === modal || e.target.classList.contains('modal-caption')) {
                closeModal();
            }
        });

        // Close when pressing Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
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
    applyTranslations(currentLang); // Apply saved/default language layout
});
