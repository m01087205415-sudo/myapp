import React from 'react';
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const beforePoints = [
    '여러 자료를 확인하며 반복적으로 수행하는 인사총무 업무',
    '연차휴가 사용촉진 관련 업무를 별도로 관리해야 하는 번거로움',
    '회사 규정에 대한 직원들의 반복적인 문의',
    '계약·급여·규정 관련 자료를 각각 찾아야 하는 불편함',
  ];

  const afterPoints = [
    '인사총무 업무별 디지털 도구 활용',
    '연차 관련 업무를 전용 시스템에서 관리',
    'AI 챗봇을 이용한 사내 규정 정보 접근',
    '업무에 필요한 앱을 한 곳에서 확인하고 실행',
  ];

  return (
    <section id="before-after" className="py-20 bg-[#0B1120] border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 font-mono">
            PROBLEM & SOLUTION
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
            "반복되는 업무, 더 편리하게 바꿀 수 없을까?"
          </h2>
          <p className="mt-3 text-sm text-[#CBD5E1]">
            건설회사 인사총무 현장에서 실제로 겪던 비효율을 짚어보고,
            AI와 바이브 코딩으로 구현한 디지털 해결 방식을 비교합니다.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* BEFORE CARD */}
          <div className="rounded-xl bg-[#111C2E]/80 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                  BEFORE
                </span>
                <span className="text-xs text-slate-500">기존 수기·분산 업무 방식</span>
              </div>

              <div className="mt-6 space-y-4">
                {beforePoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-400 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/60 text-xs text-slate-500">
              자료 분산과 반복 응대로 인한 일상 업무 피로 누적
            </div>
          </div>

          {/* AFTER CARD */}
          <div className="rounded-xl bg-[#162238] border border-blue-500/40 p-6 sm:p-8 shadow-xl shadow-blue-950/30 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle glow highlight */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-900/60">
                <span className="text-sm font-bold uppercase tracking-wider text-blue-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  AFTER
                </span>
                <span className="text-xs text-blue-300 font-medium">디지털 업무 도구 도입</span>
              </div>

              <div className="mt-6 space-y-4">
                {afterPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-100 font-medium leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-blue-900/60 text-xs text-blue-300 flex items-center justify-between">
              <span>원클릭 접근 및 직관적인 디지털 처리 프로세스 구축</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
