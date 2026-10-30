import React from 'react';
import { ExternalLink, ArrowUpRight, Sparkles, Building2, Check } from 'lucide-react';
import { APPS_DATA, AppItem } from '../data/appsData';
import { MockupPreview } from './MockupPreview';

interface CreativeAppsSectionProps {
  onPreviewClick: (app: AppItem) => void;
}

export const CreativeAppsSection: React.FC<CreativeAppsSectionProps> = ({ onPreviewClick }) => {
  const creativeApps = APPS_DATA.filter((a) => !a.isWorkApp);

  return (
    <section id="creative-apps" className="py-20 bg-[#111C2E]/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>CREATIVE & BRANDING</span>
            <span aria-hidden="true">·</span>
            <span>2개의 홍보 및 AI 체험 프로젝트</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            "AI로 확장하는 새로운 가능성"
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            업무 자동화 도구를 넘어, 기업의 대외 신뢰도를 높이는 브랜드 웹사이트와
            생성형 AI의 감성적 상호작용을 탐구한 인터랙티브 체험형 콘텐츠를 함께 선보입니다.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {creativeApps.map((app) => {
            const isCompany = app.id === 'yangwoo-web';
            return (
              <div
                key={app.id}
                className={`group rounded-2xl bg-[#162238] border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl ${
                  isCompany
                    ? 'border-amber-900/40 hover:border-amber-500/60 hover:shadow-amber-950/30'
                    : 'border-purple-900/40 hover:border-purple-500/60 hover:shadow-purple-950/30'
                }`}
              >
                {/* Browser Frame */}
                <div className="relative bg-[#0F172A] border-b border-slate-800">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B1120] border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#162238] border border-slate-700/60 text-[10px] text-slate-400 font-mono">
                      <span
                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          isCompany ? 'bg-amber-400' : 'bg-purple-400'
                        }`}
                      />
                      <span className="truncate max-w-[200px]">{app.displayUrl}</span>
                    </div>
                    <div className="w-10" />
                  </div>

                  <div
                    onClick={() => onPreviewClick(app)}
                    className="h-56 sm:h-64 w-full cursor-pointer relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]"
                    title="클릭하여 화면 크게 보기"
                  >
                    <MockupPreview appId={app.id} type="desktop" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-xs text-xs text-white font-medium border border-white/10 shadow-lg">
                        🔍 화면 미리보기 확대
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span
                        className={`font-semibold ${
                          isCompany ? 'text-amber-400' : 'text-purple-400'
                        }`}
                      >
                        {app.category}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{app.badge}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
                      {app.name}
                    </h3>

                    <p
                      className={`mt-1 text-sm font-semibold ${
                        isCompany ? 'text-amber-300' : 'text-purple-300'
                      }`}
                    >
                      "{app.coreHeadline}"
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      <span className="text-slate-300 font-medium">목적:</span> {app.purpose}
                    </p>

                    {/* Features */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        주요 기능 및 구성
                      </span>
                      {app.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isCompany ? 'text-amber-400' : 'text-purple-400'
                            }`}
                          />
                          <span className="leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Benefit Box */}
                    <div
                      className={`mt-4 p-3 rounded-lg border text-xs leading-relaxed ${
                        isCompany
                          ? 'bg-amber-950/20 border-amber-900/40 text-amber-100/90'
                          : 'bg-purple-950/20 border-purple-900/40 text-purple-100/90'
                      }`}
                    >
                      <strong
                        className={`block mb-0.5 font-medium ${
                          isCompany ? 'text-amber-300' : 'text-purple-300'
                        }`}
                      >
                        💡 {isCompany ? '대외 브랜딩 효과' : '체험 및 확산 가치'}
                      </strong>
                      {app.benefit}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400 truncate">
                      <span className="text-slate-500">배포 주소: </span>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline font-mono ${
                          isCompany ? 'text-amber-400' : 'text-purple-400'
                        }`}
                      >
                        {app.displayUrl}
                      </a>
                    </div>

                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg transition-all shadow-md whitespace-nowrap shrink-0 group-hover:scale-[1.02] ${
                        isCompany
                          ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                          : 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30'
                      }`}
                    >
                      <span>{isCompany ? '웹사이트 방문하기' : '타로 체험하기'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
