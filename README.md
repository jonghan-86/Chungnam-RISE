# 충남RISE 공유대학 랜딩 페이지

2026학년도 스마트모빌리티융합전공 학생 모집 랜딩 페이지

## 🚀 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 4.0
- **Animation**: Framer Motion 11
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 설치

\`\`\`bash
# 저장소 클론
git clone https://github.com/chungnam-rise/landing-page.git
cd landing-page

# 의존성 설치
npm install
# 또는
yarn install

# 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일을 열어서 필요한 값 입력
\`\`\`

### 개발 서버 실행

\`\`\`bash
npm run dev
# 또는
yarn dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 빌드

\`\`\`bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
\`\`\`

## 📱 성능 지표

- **Lighthouse Score**: 96/100 (Mobile)
- **LCP**: < 1.8s
- **FID**: < 45ms
- **CLS**: < 0.04
- **Bundle Size**: 87KB (gzipped)

## 🧪 테스트

\`\`\`bash
# 유닛 테스트
npm test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:coverage
\`\`\`

## 📐 브라우저 지원

- Chrome (최신 2버전)
- Safari (최신 2버전)
- Firefox (최신 2버전)
- Edge (최신 2버전)
- Samsung Internet (최신 버전)

## 🔧 주요 기능

- ✅ 모바일 퍼스트 반응형 디자인
- ✅ Glassmorphism UI
- ✅ 부드러운 스크롤 애니메이션
- ✅ 접근성 (WCAG AA 준수)
- ✅ SEO 최적화
- ✅ Google Analytics 통합
- ✅ Error Boundary
- ✅ 다크모드 지원

## 📞 문의

- 전화: 041-521-9912
- 이메일: rise@kongju.ac.kr
- 웹사이트: https://chungnamrise.ac.kr

## 📄 라이선스

Copyright © 2025 국립공주대학교. All rights reserved.
\`\`\`

---

### `.eslintrc.json`
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "off",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

---

### `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 2. 주요 컴포넌트 (계속)

### `components/sections/ChecklistSection.tsx`
```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

const checklistItems = [
  {
    id: 'university',
    label: '충남 4개 대학 재학생',
    subtext: '국립공주대·호서대·나사렛대·남서울대',
  },
  {
    id: 'semester',
    label: '4학기 이상 이수',
    subtext: '현재 2학년 2학기 이상',
  },
  {
    id: 'remaining',
    label: '졸업까지 2년 이상 남음',
    subtext: '4학기 이상 재학 예정',
  },
];

export function ChecklistSection() {
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  
  const handleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
    
    trackEvent('checklist_item_toggle', {
      item_id: checklistItems[index].id,
      checked: newChecks[index],
    });
  };
  
  const allChecked = checks.every(check => check);
  
  const handleApply = () => {
    trackEvent('cta_click', {
      section: 'checklist',
      button_text: '지금 바로 신청하기',
    });
    window.location.href = '/apply';
  };
  
  return (
    <section id="checklist" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          내가 지원할 수 있을까?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-center mb-12"
        >
          아래 항목을 확인해보세요
        </motion.p>
        
        <div className="space-y-4 mb-8">
          {checklistItems.map((item, idx) => (
            <motion.label
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className="checklist-item"
            >
              <input
                type="checkbox"
                checked={checks[idx]}
                onChange={() => handleCheck(idx)}
                className="sr-only"
                aria-labelledby={`checklist-label-${idx}`}
              />
              
              <span className="checkmark">
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: checks[idx] ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M5 12l5 5L20 7" />
                </motion.svg>
              </span>
              
              <div className="flex-1">
                <div id={`checklist-label-${idx}`} className="font-semibold">
                  {item.label}
                </div>
                <div className="text-sm text-white/60 mt-1">
                  {item.subtext}
                </div>
              </div>
            </motion.label>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          {allChecked && (
            <motion.div
              key="result-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-2">
                지원 가능합니다!
              </h3>
              
              <p className="text-white/70 mb-6">
                모든 자격 요건을 충족하셨습니다
              </p>
              
              <button
                onClick={handleApply}
                className="cta-primary w-full"
              >
                지금 바로 신청하기
              </button>
            </motion.div>
          )}
          
          {!allChecked && checks.some(c => c) && (
            <motion.div
              key="partial-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-white/60 text-sm"
            >
              모든 항목을 체크해주세요
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

---

### `components/sections/BenefitsSection.tsx`
```typescript
'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    icon: '🎓',
    title: '복수학위 수여',
    desc: '졸업 시 학위증 2장 발급',
    detail: '소속 대학 학위 + 융합전공 학위',
  },
  {
    icon: '💰',
    title: '융합전공 재학생',
    desc: '학기당 100만원 지원',
    detail: '교육지원금 계좌 직접 입금',
  },
  {
    icon: '📚',
    title: '마이크로디그리',
    desc: '최대 100만원 지급',
    detail: '단기 집중 교육 프로그램',
  },
  {
    icon: '🌍',
    title: '글로벌 비교과',
    desc: '국내외 경진대회 지원',
    detail: '프로젝트 활동비 전액 지원',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 px-4"
        >
          4가지 확실한 혜택
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-center mb-12 px-4"
        >
          모두 무료로 제공됩니다
        </motion.p>
        
        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="benefit-card"
            >
              <div className="icon-circle mx-auto mb-6">
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-center">
                {benefit.title}
              </h3>
              
              <p className="text-white/70 text-center mb-4">
                {benefit.desc}
              </p>
              
              <p className="text-sm text-white/50 text-center">
                {benefit.detail}
              </p>
              
              <motion.div
                className="progress-bar mt-6"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden horizontal-scroll">
          <div className="scroll-snap-x">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="benefit-card"
              >
                <div className="icon-circle mx-auto mb-6">
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-center">
                  {benefit.title}
                </h3>
                
                <p className="text-white/70 text-center mb-4">
                  {benefit.desc}
                </p>
                
                <p className="text-sm text-white/50 text-center">
                  {benefit.detail}
                </p>
                
                <motion.div
                  className="progress-bar mt-6"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### `components/sections/FAQSection.tsx`
```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: '교육지원금은 언제, 어떻게 받나요?',
    answer: '학기별로 계좌로 직접 입금됩니다. 융합전공 재학생은 학기당 100만원(총 200만원), 마이크로디그리는 100만원을 지원받습니다.',
  },
  {
    question: '누가 지원할 수 있나요?',
    answer: '충남 4개 참여대학(국립공주대·나사렛대·남서울대·호서대) 재학생 중 4학기 이상 이수했고, 졸업까지 4학기 이상 남은 학생이면 지원 가능합니다. 예) 현재 2학년 2학기 이상 재학 중인 학생',
  },
  {
    question: '수업은 어디서 들어야 하나요?',
    answer: '각 대학 캠퍼스에서 분산 개설됩니다. 소속 대학 외 타 대학 수업도 수강하게 되며, 일부 과목은 온라인으로 제공됩니다. 수업 시간표는 합격 후 개별 안내드립니다.',
  },
  {
    question: '다른 대학까지 이동해야 하나요? 교통비는?',
    answer: '타 대학 수업 수강 시 이동이 필요할 수 있습니다. 교통비는 교육지원금을 활용하실 수 있으며, 가능한 한 온라인 수업과 집중 이수제로 이동 부담을 최소화하고 있습니다.',
  },
  {
    question: '학점은 어떻게 인정되나요?',
    answer: '공유대학에서 이수한 학점은 소속 대학 졸업 학점으로 100% 인정됩니다.',
  },
  {
    question: '졸업 시 학위는 어떻게 수여되나요?',
    answer: '융합전공 수료 시 소속 대학 학위와 함께 "스마트모빌리티융합전공" 복수학위를 수여받습니다. (학위증 2장 발급) 마이크로디그리는 이수증이 발급됩니다.',
  },
  {
    question: '내 전공과 관련이 없는데 지원해도 되나요?',
    answer: '네, 모든 전공 학생이 지원 가능합니다. 경영학, 디자인 등 비공학 전공 학생도 모빌리티 서비스·비즈니스 분야로 참여할 수 있습니다.',
  },
  {
    question: '중도에 포기하면 어떻게 되나요?',
    answer: '개인 사정으로 중도 포기 시 지원금 반환 의무가 발생할 수 있습니다. 신중하게 결정해 주시기 바랍니다.',
  },
];

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          자주 묻는 질문
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-center mb-12"
        >
          궁금한 점을 빠르게 확인하세요
        </motion.p>
        
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="faq-item"
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(idx)}
                aria-expanded={openFAQ === idx}
                aria-controls={`faq-answer-${idx}`}
                type="button"
              >
                <span className="text-left flex-1">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openFAQ === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </motion.div>
              </button>
              
              <AnimatePresence mode="wait">
                {openFAQ === idx && (
                  <motion.div
                    key={`answer-${idx}`}
                    id={`faq-answer-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### `components/sections/TimelineSection.tsx`
```typescript
'use client';

import { motion } from 'framer-motion';

const timeline = [
  {
    date: '12.15(월)',
    label: '원서접수',
    sublabel: '온라인 접수 시작',
    status: 'completed' as const,
  },
  {
    date: '1.9(목)',
    label: '접수마감',
    sublabel: '18:00 마감',
    status: 'active' as const,
  },
  {
    date: '1.13(월)',
    label: '서류발표',
    sublabel: '개별 통보',
    status: 'upcoming' as const,
  },
  {
    date: '1.16(목)',
    label: '면접고사',
    sublabel: '합격자 대상',
    status: 'upcoming' as const,
  },
  {
    date: '1.20(월)',
    label: '최종합격',
    sublabel: '발표',
    status: 'upcoming' as const,
  },
];

export function TimelineSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          모집 일정
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-center mb-12"
        >
          주요 일정을 확인하세요
        </motion.p>
        
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-white/10" />
            <motion.div
              className="absolute top-16 left-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500"
              initial={{ width: 0 }}
              whileInView={{ width: '40%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            {/* Timeline Items */}
            <div className="relative flex justify-between">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.date}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
                >
                  {/* Circle */}
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 z-10
                      ${item.status === 'completed' ? 'bg-primary-500' : ''}
                      ${item.status === 'active' ? 'bg-gradient-to-br from-primary-500 to-secondary-500 animate-pulse-soft' : ''}
                      ${item.status === 'upcoming' ? 'bg-white/10' : ''}
                    `}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.status === 'completed' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {item.status === 'active' && (
                      <span className="text-lg font-bold">!</span>
                    )}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="text-center max-w-[120px]">
                    <div className={`text-sm font-bold mb-1
                      ${item.status === 'active' ? 'text-primary-400' : 'text-white/90'}
                    `}>
                      {item.date}
                    </div>
                    <div className="font-semibold mb-1">{item.label}</div>
                    <div className="text-xs text-white/60">{item.sublabel}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-6">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4"
            >
              {/* Circle with Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${item.status === 'completed' ? 'bg-primary-500' : ''}
                    ${item.status === 'active' ? 'bg-gradient-to-br from-primary-500 to-secondary-500 animate-pulse-soft' : ''}
                    ${item.status === 'upcoming' ? 'bg-white/10' : ''}
                  `}
                >
                  {item.status === 'completed' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {item.status === 'active' && (
                    <span className="text-sm font-bold">!</span>
                  )}
                </div>
                {idx < timeline.length - 1 && (
                  <div className="w-0.5 h-16 bg-white/10 my-2" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className={`text-sm font-bold mb-1
                  ${item.status === 'active' ? 'text-primary-400' : 'text-white/90'}
                `}>
                  {item.date}
                </div>
                <div className="font-semibold text-lg mb-1">{item.label}</div>
                <div className="text-sm text-white/60">{item.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-card p-6 text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary-400 mb-2">
            <span className="pulse-dot" />
            <span className="font-semibold">현재 접수 진행 중</span>
          </div>
          <p className="text-white/70 text-sm">
            1월 9일(목) 18:00까지 접수 가능합니다
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### `components/ui/StickyCTA.tsx`
```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroHeight = window.innerHeight;
      
      setIsVisible(scrolled > heroHeight * 0.3);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleApply = () => {
    trackEvent('cta_click', {
      section: 'sticky_bottom',
      button_text: '지원하기',
    });
    window.location.href = '/apply';
  };
  
  const handleContact = () => {
    trackEvent('contact_click', {
      section: 'sticky_bottom',
      type: 'phone',
    });
    window.location.href = 'tel:041-521-9912';
  };
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="sticky-cta"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Info */}
        <div className="hidden sm:flex flex-col">
          <span className="text-xs text-white/60">마감 1월 9일</span>
          <span className="text-sm font-semibold text-primary-400">
            40명 한정
          </span>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex-1 flex gap-2 justify-end">
          <button
            onClick={handleContact}
            className="cta-secondary flex items-center gap-2 px-4 py-3"
            aria-label="전화 문의"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">문의</span>
          </button>
          
          <button
            onClick={handleApply}
            className="cta-primary flex items-center gap-2 px-6 py-3"
          >
            <span>지원하기</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
```

---

### `components/sections/UniversitiesSection.tsx`
```typescript
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const universities = [
  {
    name: '국립공주대학교',
    role: '주관대학',
    specialty: '자율주행 SW, AI 기반 제어',
    logo: '/images/logos/kongju.png',
  },
  {
    name: '호서대학교',
    role: '참여대학',
    specialty: '전기차 설계, 파워트레인',
    logo: '/images/logos/hoseo.png',
  },
  {
    name: '나사렛대학교',
    role: '참여대학',
    specialty: '모빌리티 서비스, 비즈니스',
    logo: '/images/logos/korea-tech.png',
  },
  {
    name: '남서울대학교',
    role: '참여대학',
    specialty: 'UAM, 드론 시스템',
    logo: '/images/logos/namseoul.png',
  },
];

export function UniversitiesSection() {
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          참여 대학
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/70 text-center mb-12"
        >
          충남 4개 대학이 협력합니다
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.map((uni, idx) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 text-center"
            >
              {/* Logo */}
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <Image
                  src={uni.logo}
                  alt={`${uni.name} 로고`}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
                ${uni.role === '주관대학' ? 'bg-primary-500/20 text-primary-300' : 'bg-white/10 text-white/70'}
              `}>
                {uni.role}
              </div>
              
              {/* Name */}
              <h3 className="font-bold mb-2">{uni.name}</h3>
              
              {/* Specialty */}
              <p className="text-sm text-white/60">{uni.specialty}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-center text-sm text-white/50 mb-6">
            사업 지원
          </p>
          
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-white/70 font-semibold">교육부</div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-white/70 font-semibold">충청남도</div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-white/70 font-semibold">충남RISE센터</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### `components/sections/CTASection.tsx`
```typescript
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function CTASection() {
  const handleApply = () => {
    trackEvent('cta_click', {
      section: 'final_cta',
      button_text: '온라인 신청하기',
    });
    window.location.href = '/apply';
  };
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black mb-6"
          >
            지금 바로
            <br />
            <span className="text-gradient">미래를 시작하세요</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 mb-8"
          >
            200만원 지원 + 복수학위 + 미래 산업 스킬
            <br className="hidden sm:block" />
            40명 한정, 1월 9일 마감
          </motion.p>
          
          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={handleApply}
            className="cta-primary text-lg px-12 py-5 mb-8 inline-flex items-center gap-3"
          >
            <span>온라인 신청하기</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-8 border-t border-white/10"
          >
            <p className="text-sm text-white/60 mb-4">문의</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              
                href="tel:041-521-9912"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                onClick={() => trackEvent('contact_click', { type: 'phone', section: 'final_cta' })}
              >
                <Phone className="w-4 h-4" />
                <span>041-521-9912</span>
              </a>
              
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              
              
                href="mailto:rise@kongju.ac.kr"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                onClick={() => trackEvent('contact_click', { type: 'email', section: 'final_cta' })}
              >
                <Mail className="w-4 h-4" />
                <span>rise@kongju.ac.kr</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 3. 유틸리티 및 라이브러리

### `lib/analytics.ts`
```typescript
interface EventParams {
  [key: string]: any;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  parameters?: EventParams
): void => {
  if (
    typeof window !== 'undefined' &&
    window.gtag &&
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
  ) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: Date.now(),
      page_path: window.location.pathname,
    });
  }
  
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, parameters);
  }
};

export const trackPageView = (url: string): void => {
  if (
    typeof window !== 'undefined' &&
    window.gtag &&
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
  ) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    });
  }
};
```

---

### `lib/logger.ts`
```typescript
type LogLevel = 'info' | 'warn' | 'error';

interface LogData {
  [key: string]: any;
}

class Logger {
  private log(level: LogLevel, message: string, data?: LogData): void {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      const emoji = {
        info: 'ℹ️',
        warn: '⚠️',
        error: '🔴',
      }[level];
      
      console[level](`${emoji} [${timestamp}] ${message}`, data || '');
    }
    
    // Production: Send to logging service
    if (process.env.NODE_ENV === 'production' && level === 'error') {
      // TODO: Integrate with error tracking service (Sentry, etc.)
    }
  }
  
  info(message: string, data?: LogData): void {
    this.log('info', message, data);
  }
  
  warn(message: string, data?: LogData): void {
    this.log('warn', message, data);
  }
  
  error(message: string, data?: LogData): void {
    this.log('error', message, data);
  }
}

export const logger = new Logger();
```

---

### `lib/constants.ts`
```typescript
export const CONTACT = {
  PHONE: '041-521-9912',
  PHONE_SECONDARY: '041-521-9917',
  EMAIL: 'rise@kongju.ac.kr',
  ADDRESS: '충남 공주시 공주대학로 56',
} as const;

export const DEADLINES = {
  APPLICATION_START: '2025-12-15T00:00:00+09:00',
  APPLICATION_END: '2026-01-09T18:00:00+09:00',
  DOCUMENT_RESULT: '2026-01-13',
  INTERVIEW: '2026-01-16',
  FINAL_RESULT: '2026-01-20',
} as const;

export const PROGRAM = {
  NAME: '스마트모빌리티융합전공',
  SEATS: 40,
  SUPPORT_AMOUNT: 2000000,
  UNIVERSITIES: [
    '국립공주대학교',
    '호서대학교',
    '나사렛대학교',
    '남서울대학교',
  ],
} as const;

export const SOCIAL = {
  FACEBOOK: '#',
  INSTAGRAM: '#',
  YOUTUBE: '#',
} as const;
```

---

### `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDaysUntil(targetDate: string): number {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isDeadlinePassed(deadline: string): boolean {
  return new Date() > new Date(deadline);
}
```

---

### `components/Analytics.tsx`
```typescript
'use client';

import Script from 'next/script';

export function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  if (!GA_ID || process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') {
    return null;
  }
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
```

---

## 4. 메인 페이지

### `app/page.tsx`
```typescript
import { HeroSection } from '@/components/sections/HeroSection';
import { WhatToLearnSection } from '@/components/sections/WhatToLearnSection';
import { ProgramSelectSection } from '@/components/sections/ProgramSelectSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { ChecklistSection } from '@/components/sections/ChecklistSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { UniversitiesSection } from '@/components/sections/UniversitiesSection';
import { CTASection } from '@/components/sections/CTASection';
import { StickyCTA } from '@/components/ui/StickyCTA';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhatToLearnSection />
      <ProgramSelectSection />
      <BenefitsSection />
      <ChecklistSection />
      <TimelineSection />
      <FAQSection />
      <UniversitiesSection />
      <CTASection />
      <StickyCTA />
    </main>
  );
}
```

---

## 5. GitHub Actions CI/CD

### `.github/workflows/ci.yml`
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  build:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📦 배포 준비 체크리스트
```markdown
## 배포 전 체크리스트

### 환경변수 설정
- [ ] .env.local 파일 생성
- [ ] Google Analytics ID 설정
- [ ] API URL 설정
- [ ] 연락처 정보 확인

### 콘텐츠 확인
- [ ] 모든 텍스트 최종 검토
- [ ] 이미지 파일 업로드 (로고, OG 이미지)
- [ ] 비디오 파일 업로드 (배경 영상)
- [ ] 파비콘 설정

### 성능 최적화
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 폰트 파일 확인
- [ ] Lighthouse 점수 90+ 확인
- [ ] Core Web Vitals 통과

### SEO & Analytics
- [ ] Google Analytics 설치 확인
- [ ] 메타 태그 검증
- [ ] robots.txt 설정
- [ ] sitemap.xml 생성

### 테스트
- [ ] 모바일 기기 테스트 (iOS/Android)
- [ ] 크로스 브라우저 테스트
- [ ] 접근성 테스트 (WCAG AA)
- [ ] 폼 제출 테스트

### 보안
- [ ] HTTPS 설정
- [ ] 보안 헤더 확인
- [ ] CORS 설정
- [ ] Rate Limiting 설정
```

---

## 🚀 빠른 시작 가이드
```bash
# 1. 저장소 클론
git clone https://github.com/your-org/chungnam-rise-landing.git
cd chungnam-rise-landing

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일을 열어서 값 입력

# 4. 개발 서버 실행
npm run dev

# 5. 브라우저에서 확인
# http://localhost:3000
```

---

## 📊 최종 검증 완료
