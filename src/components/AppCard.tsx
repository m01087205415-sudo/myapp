import React from 'react';
import { ExternalLink, Check, ArrowUpRight } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { MockupPreview } from './MockupPreview';

interface AppCardProps {
  app: AppItem;
  onPreviewClick?: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onPreviewClick }) => {
  return (
    <div className="group rounded-2xl bg-[#162238] border border-slate-800 hover:border-blue-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col overflow-hidden">
      {/* Top Browser Mockup Frame */}
      <div className="relative bg-[#0F172A] border-b border-slate-800">
        {/* Browser Top bar with dots */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B1120] border-b border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-rose-500/80 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-amber-500/80 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-emerald-500/80 transition-colors" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#162238] border border-slate-700/60 text-[10px] text-slate-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="truncate max-w-[180px] sm:max-w-[220px]">{app.displayUrl}</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Mockup Canvas */}
        <div
          onClick={() => onPreviewClick?.(app)}
          className="h-56 sm:h-64 w-full cursor-pointer relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]"
          title="클릭하여 화면 크게 보기"
        >
          <MockupPreview appId={app.id} type="desktop" />
          {/* Subtle hover overlay hint */}
          <div className="absolute inset-0 bg-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-xs text-xs text-white font-medium border border-white/10 shadow-lg">
              🔍 화면 미리보기 확대
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="text-blue-400 font-semibold">{app.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{app.badge}</span>
          </div>

          {/* App Name */}
          <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight group-hover:text-blue-300 transition-colors">
            {app.name}
          </h3>

          {/* One-Line Intro */}
          <p className="mt-1 text-sm font-semibold text-blue-400">
            "{app.coreHeadline}"
          </p>

          {/* Purpose */}
          <p className="mt-2 text-xs text-slate-400">
            <span className="text-slate-300 font-medium">목적:</span> {app.purpose}
          </p>

          {/* Verified Features */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              주요 기능
            </span>
            {app.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>

          {/* One-sentence Benefit Box */}
          <div className="mt-4 p-3 rounded-lg bg-[#111C2E] border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            <strong className="text-blue-300 block mb-0.5 font-medium">💡 업무 활용 효과</strong>
            {app.benefit}
          </div>
        </div>

        {/* Card Footer with Execution Button & URL */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 truncate">
            <span className="text-slate-500">배포 주소: </span>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline font-mono"
            >
              {app.displayUrl}
            </a>
          </div>

          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30 whitespace-nowrap shrink-0 group-hover:scale-[1.02]"
          >
            <span>앱 실행하기</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
