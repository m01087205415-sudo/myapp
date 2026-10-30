import React from 'react';
import { Lightbulb, Terminal, Share2, Quote, CheckCircle2 } from 'lucide-react';

export const StorySection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: '현장 업무의 문제 정의',
      desc: '급여 계산 공제 산출, 연차 촉진 기한 챙김, 근로계약 체결, 반복되는 규정 문의 등 인사담당자로서 매일 마주하던 반복 작업을 정리했습니다.',
      icon: Lightbulb,
    },
    {
      num: '02',
      title: '바이브 코딩과 신속한 프로토타이핑',
      desc: 'AI 교육을 통해 복잡한 문법 코딩 대신 의도와 기획을 바탕으로 AI와 대화하며 화면과 기능을 구현하는 "바이브 코딩" 방식을 체득했습니다.',
      icon: Terminal,
    },
    {
      num: '03',
      title: '사내 동료와의 경험 공유',
      desc: '혼자만의 실습에 그치지 않고, 동료와 경영진이 직접 사용해보고 더 나은 스마트 업무 환경을 함께 고민할 수 있도록 본 랜딩페이지를 제작했습니다.',
      icon: Share2,
    },
  ];

  return (
    <section id="story" className="py-20 bg-[#0B1120] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
            <span>DEVELOPMENT STORY</span>
            <span aria-hidden="true">·</span>
            <span>제작 배경</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            "AI를 배우고, 직접 만들어보다."
          </h2>
        </div>

        {/* Narrative Box */}
        <div className="rounded-2xl bg-[#162238] border border-slate-800 p-8 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle gradient light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-3xl pointer-events-none" />

          {/* Main Story Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            <p>
              건설회사 인사담당자로 근무하며 반복적인 업무를 보다 효율적으로 수행할 방법을 늘 고민했습니다.
              매달 마주하는 복잡한 4대 보험 및 세액 공제, 법정 기한을 놓치기 쉬운 연차휴가 사용촉진,
              출력과 날인이 번거로운 근로계약, 그리고 같은 내용을 반복해서 묻는 사내 규정 문의까지 현장에는 크고 작은 개선점들이 있었습니다.
            </p>
            <p>
              최근 사내 AI 교육을 통해 <strong className="text-white">바이브 코딩(Vibe Coding)</strong>을 접했고,
              기존에 머릿속 아이디어로만 생각하던 실무 도구들을 직접 기획하고 구현해보았습니다.
            </p>
            <p>
              급여계산기, 연차휴가 사용촉진 시스템, 전자근로계약 관리시스템, 인사규정 안내 챗봇뿐만 아니라
              기업 홍보 웹사이트와 감성적인 체험형 콘텐츠까지 제작하며 AI의 다양한 활용 가능성을 확인할 수 있었습니다.
            </p>
            <p className="text-blue-300 font-medium">
              이 페이지는 그 실습 결과물을 사내 동료와 경영진께 소개하고, 업무 혁신의 아이디어를 함께 나누기 위해 만들었습니다.
            </p>
          </div>

          {/* Core Callout Quote */}
          <div className="mt-8 pt-8 border-t border-slate-800 flex items-start gap-4 bg-[#111C2E]/80 p-6 rounded-xl border border-blue-900/30">
            <Quote className="w-8 h-8 text-blue-400 shrink-0 opacity-70 mt-0.5" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-1">
                KEY MESSAGE
              </div>
              <blockquote className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                "AI를 배우는 것에서 끝나지 않고, 실제로 만들어 업무에 적용해보는 경험"
              </blockquote>
              <p className="text-xs text-slate-400 mt-2">
                — 양우종합건설 인사담당자 Vibe Coding 포트폴리오
              </p>
            </div>
          </div>
        </div>

        {/* 3 Steps Process */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-xl bg-[#111C2E] border border-slate-800/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold font-mono text-blue-400">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
