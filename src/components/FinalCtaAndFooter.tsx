import React from 'react';
import { ArrowUp, ArrowDown, Layers, ExternalLink, ShieldCheck } from 'lucide-react';

export const FinalCtaAndFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070D18] border-t border-slate-800/80">
      {/* FINAL CTA SECTION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#162238] to-[#111C2E] border border-blue-500/30 shadow-2xl relative overflow-hidden">
          {/* Subtle blue light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-blue-600/15 blur-3xl pointer-events-none" />

          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              "필요한 앱을 직접 경험해보세요."
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
              인사 업무를 더 편리하게 만드는 작은 시도.
              <br />
              관심 있는 앱을 선택하고 직접 사용해보세요.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#work-apps"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <span>업무용 앱 살펴보기</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={scrollToTop}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <ArrowUp className="w-4 h-4 text-blue-400" />
                <span>맨 위로 이동</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER INFO BAR */}
      <div className="border-t border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-blue-600/30">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>AI × HR INNOVATION</span>
                <span className="text-slate-600 text-xs">|</span>
                <span className="text-xs font-normal text-slate-400">Vibe Coding Project Portfolio</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                양우종합건설 | AI 활용 실습 프로젝트
              </div>
            </div>
          </div>

          {/* Quick Jump Links */}
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">소개</a>
            <a href="#before-after" className="hover:text-white transition-colors">문제 해결</a>
            <a href="#work-apps" className="hover:text-white transition-colors">업무용 앱 (4)</a>
            <a href="#creative-apps" className="hover:text-white transition-colors">기타 프로젝트 (2)</a>
            <a href="#story" className="hover:text-white transition-colors">제작 스토리</a>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-400 leading-relaxed max-w-3xl mx-auto">
          본 페이지에 수록된 6개의 웹 애플리케이션은 사내 AI 교육 및 바이브 코딩 실습 과정에서 인사담당자가 직접 기획·제작한 개인 실습 포트폴리오입니다.
          사내 공식 인증 운영 시스템이 아닌 실무 개선 아이디어 제안용 프로토타입이며, 실제 민감 개인정보나 사내 기밀 데이터는 수록되어 있지 않습니다.
        </div>
      </div>
    </footer>
  );
};
