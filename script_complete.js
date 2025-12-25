// ==============================================
// 충남RISE 스마트모빌리티 - 완전 최적화 JavaScript
// iOS + Android + 모든 브라우저 대응
// ==============================================

'use strict';

console.log('🚀 Smart Mobility Website Loaded - Complete Version');

/* ========================================
   1. 초기화 및 전역 변수
   ======================================== */
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

console.log(`📱 Device Info: Mobile=${isMobile}, iOS=${isIOS}, Safari=${isSafari}`);

/* ========================================
   2. DOM 로드 완료 후 실행
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Content Loaded');
    
    initMobileMenu();
    initScrollIndicators();
    initSmoothScroll();
    initIntersectionObserver();
    initLazyLoading();
    initTouchOptimization();
    initIOSFixes();
    initCTATracking();
    initPerformanceOptimization();
    
    console.log('✅ All scripts initialized successfully');
});

/* ========================================
   3. 모바일 메뉴 토글
   ======================================== */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    // 메뉴 토글
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // 접근성: ARIA 속성 업데이트
        menuToggle.setAttribute('aria-expanded', isActive);
        menuToggle.setAttribute('aria-label', isActive ? '메뉴 닫기' : '메뉴 열기');
        
        // iOS: body 스크롤 제어
        if (isIOS) {
            document.body.style.overflow = isActive ? 'hidden' : '';
        }
        
        console.log(`📱 Menu ${isActive ? 'opened' : 'closed'}`);
    });

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
            closeMenu();
        }
    });

    // ESC 키로 메뉴 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // 메뉴 링크 클릭 시 자동 닫기
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    function closeMenu() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', '메뉴 열기');
        if (isIOS) {
            document.body.style.overflow = '';
        }
    }
}

/* ========================================
   4. 스크롤 인디케이터 (Dots)
   ======================================== */
function initScrollIndicators() {
    const grids = [
        { grid: document.querySelector('.recruit-premium-grid'), id: 'recruit' },
        { grid: document.querySelector('.track-grid'), id: 'track' },
        { grid: document.querySelector('.reviews-grid'), id: 'reviews' },
        { grid: document.querySelector('.extra-grid'), id: 'extra' },
        { grid: document.querySelector('.success-points-grid'), id: 'success' }
    ];

    grids.forEach(item => {
        if (!item.grid) return;
        
        const grid = item.grid;
        const indicators = grid.nextElementSibling;
        
        if (!indicators || !indicators.classList.contains('scroll-indicators')) return;
        
        const cards = grid.children;
        const cardCount = cards.length;
        
        if (cardCount <= 1) return;

        // Dot 생성
        for (let i = 0; i < cardCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('scroll-dot');
            if (i === 0) dot.classList.add('active');
            
            // 접근성
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `${i + 1}번째 항목으로 이동`);
            dot.setAttribute('tabindex', '0');
            
            // 클릭으로 스크롤
            dot.addEventListener('click', () => scrollToCard(grid, cards, i));
            
            // 키보드 네비게이션
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToCard(grid, cards, i);
                }
            });
            
            indicators.appendChild(dot);
        }

        // 스크롤 리스너 (디바운스)
        let scrollTimeout;
        grid.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateActiveDot(grid, cards, indicators);
            }, 100);
        }, { passive: true });
    });
}

function scrollToCard(grid, cards, index) {
    const cardWidth = cards[0].offsetWidth + 16; // 16px gap
    grid.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
    });
}

function updateActiveDot(grid, cards, indicators) {
    const scrollLeft = grid.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 16;
    const index = Math.round(scrollLeft / cardWidth);
    
    const dots = indicators.querySelectorAll('.scroll-dot');
    dots.forEach((dot, idx) => {
        if (idx === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/* ========================================
   5. 부드러운 스크롤
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   6. Intersection Observer - 페이드인 애니메이션
   ======================================== */
function initIntersectionObserver() {
    const fadeElements = document.querySelectorAll('.id-card, .detail-item, .target-item');
    
    if (fadeElements.length === 0) return;
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                // 애니메이션 적용
                requestAnimationFrame(() => {
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
                
                fadeObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
}

/* ========================================
   7. 이미지 Lazy Loading
   ======================================== */
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // 네이티브 lazy loading 지원
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // 폴백: Intersection Observer 사용
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/* ========================================
   8. 터치 최적화
   ======================================== */
function initTouchOptimization() {
    if (!isMobile) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // 가로 스와이프가 세로보다 크면
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                console.log('👈 Swiped left');
            } else {
                console.log('👉 Swiped right');
            }
        }
    }

    // iOS: 더블 탭 줌 방지 (필요시)
    if (isIOS) {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }
}

/* ========================================
   9. iOS 전용 수정
   ======================================== */
function initIOSFixes() {
    if (!isIOS) return;
    
    // iOS: 100vh 버그 수정
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', debounce(setVH, 250));
    window.addEventListener('orientationchange', debounce(setVH, 250));

    // iOS: 입력 필드 포커스 시 줌 방지
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (parseInt(window.getComputedStyle(input).fontSize) < 16) {
            input.style.fontSize = '16px';
        }
    });

    // iOS Safari: 스크롤 고정 버그 수정
    document.addEventListener('touchmove', (e) => {
        // 필요시 특정 요소에서만 스크롤 방지
    }, { passive: true });

    console.log('🍎 iOS optimizations applied');
}

/* ========================================
   10. CTA 버튼 추적
   ======================================== */
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.btn-cta');
    
    ctaButtons.forEach(button => {
        // Intersection Observer로 가시성 추적
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 애니메이션 추가
                    entry.target.style.animation = 'pulse 2s ease-in-out infinite';
                    console.log('👁️ CTA button visible');
                } else {
                    entry.target.style.animation = '';
                }
            });
        }, { threshold: 0.5 });

        ctaObserver.observe(button);

        // 클릭 추적
        button.addEventListener('click', () => {
            console.log('🎯 CTA button clicked');
            // Google Analytics 등에 이벤트 전송 가능
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'engagement',
                    'event_label': 'Apply Now'
                });
            }
        });
    });
}

/* ========================================
   11. 성능 최적화
   ======================================== */
function initPerformanceOptimization() {
    // 리소스 힌트
    const preconnectLinks = [
        'https://fonts.googleapis.com',
        'https://cdn.jsdelivr.net'
    ];
    
    preconnectLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });

    // 스크롤 성능 개선
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // 스크롤 관련 로직
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    console.log('⚡ Performance optimizations applied');
}

/* ========================================
   12. 유틸리티 함수
   ======================================== */

// 디바운스
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

// 쓰로틀
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ========================================
   13. 리사이즈 핸들러
   ======================================== */
const handleResize = debounce(() => {
    console.log('📐 Window resized');
    
    // 모바일/데스크톱 전환 감지
    const isMobileNow = window.innerWidth <= 768;
    
    // 필요한 재계산 수행
    if (isMobileNow !== isMobile) {
        location.reload(); // 필요시 리로드
    }
}, 250);

window.addEventListener('resize', handleResize);

/* ========================================
   14. 에러 핸들링
   ======================================== */
window.addEventListener('error', (e) => {
    console.error('❌ JavaScript Error:', e.error);
    // 에러 리포팅 서비스로 전송 가능
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Unhandled Promise Rejection:', e.reason);
});

/* ========================================
   15. Pulse 애니메이션 CSS 동적 추가
   ======================================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   16. 페이지 로드 완료
   ======================================== */
window.addEventListener('load', () => {
    console.log('🎉 Page fully loaded');
    
    // 성능 측정
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⚡ Load time: ${loadTime}ms`);
    }
});

/* ========================================
   17. 페이지 언로드
   ======================================== */
window.addEventListener('beforeunload', () => {
    console.log('👋 Page unloading');
    // 필요시 상태 저장
});

// Export for debugging
if (typeof window !== 'undefined') {
    window.smartMobility = {
        version: '1.0.0',
        isMobile,
        isIOS,
        isSafari
    };
}
```

---

## 📥 사용 방법

### 1. 파일 저장
위의 3개 코드를 각각:
- `intro_complete.html`
- `style_complete.css`
- `script_complete.js`

파일명으로 저장하세요.

### 2. 폴더 구조
```
프로젝트폴더/
├── intro_complete.html
├── style_complete.css
├── script_complete.js
└── assets/
    ├── hero.png
    ├── curriculum_structure.png
    ├── student.png
    └── apple-touch-icon.png (선택사항)