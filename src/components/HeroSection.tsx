import React from 'react';
import { ArrowDown, Sparkles, BookOpen, Layers, ShieldCheck, Cpu } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[400px] h-[300px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Kicker Label (Clean unboxed text with typographic separator) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6 shadow-sm">
          <span className="font-mono text-blue-400">AI × HR INNOVATION</span>
          <span aria-hidden="true" className="text-blue-500/60">·</span>
          <span>인사의 모든 것을 담다</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] tracking-tight leading-[1.2] max-w-4xl mx-auto text-balance">
          반복 업무는 더 간편하게,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">
            정보 공유는 더 스마트하게.
          </span>
        </h1>

        {/* Sub-description */}
        <p className="mt-6 text-base sm:text-lg text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
          AI 교육과 바이브 코딩으로 직접 제작한 인사총무 업무 도구와 디지털 콘텐츠를 소개합니다.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work-apps"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group"
          >
            <span>앱 둘러보기</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#story"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#162238] hover:bg-[#1E2E4B] text-[#F8FAFC] border border-slate-700/80 font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>제작 스토리 보기</span>
          </a>
        </div>

        {/* Bottom Metrics Bar (3 explicit counts) */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-xl bg-[#111C2E]/60 border border-slate-800/60">
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">6</div>
            <div className="text-xs font-medium text-slate-400 mt-1">제작 프로젝트</div>
          </div>
          <div className="p-4 rounded-xl bg-[#111C2E]/60 border border-slate-800/60">
            <div className="text-3xl font-extrabold text-blue-400 font-mono tabular-nums">4</div>
            <div className="text-xs font-medium text-slate-400 mt-1">인사총무 업무용 앱</div>
          </div>
          <div className="p-4 rounded-xl bg-[#111C2E]/60 border border-slate-800/60">
            <div className="text-3xl font-extrabold text-sky-300 font-mono tabular-nums">2</div>
            <div className="text-xs font-medium text-slate-400 mt-1">홍보·체험 프로젝트</div>
          </div>
        </div>
      </div>
    </section>
  );
};
