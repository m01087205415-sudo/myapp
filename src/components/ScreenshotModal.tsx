import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowUpRight, Check, Monitor, Smartphone } from 'lucide-react';
import { AppItem } from '../data/appsData';
import { MockupPreview } from './MockupPreview';

interface ScreenshotModalProps {
  app: AppItem | null;
  onClose: () => void;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({ app, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-4xl bg-[#162238] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0F172A]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400">
              {app.category}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {app.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Mockup Canvas */}
          <div className="rounded-xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-inner">
            {/* Browser top pill */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0B1120] border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400">{app.url}</span>
              <div className="w-8" />
            </div>

            <div className="h-72 sm:h-96 w-full">
              <MockupPreview appId={app.id} type="desktop" />
            </div>
          </div>

          {/* Details & Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  앱 소개 및 목적
                </span>
                <p className="text-sm font-semibold text-blue-300">
                  "{app.coreHeadline}"
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {app.purpose}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#111C2E] border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-blue-300 block mb-1 font-medium">💡 실무 활용 효과</strong>
                {app.benefit}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                확인된 주요 기능
              </span>
              <div className="space-y-2">
                {app.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#0F172A] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono truncate max-w-sm">
            URL: <span className="text-blue-400">{app.url}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
            >
              닫기
            </button>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-md shadow-blue-600/30 whitespace-nowrap"
            >
              <span>실제 앱 바로 실행하기</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
