import React, { useState } from 'react';
import { Eye, ExternalLink, Monitor, Smartphone, Filter, Image as ImageIcon } from 'lucide-react';
import { APPS_DATA, AppItem } from '../data/appsData';
import { MockupPreview } from './MockupPreview';

interface ScreenshotGalleryProps {
  onSelectApp: (app: AppItem, screenIndex?: number) => void;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ onSelectApp }) => {
  const [filter, setFilter] = useState<'all' | 'work' | 'creative'>('all');

  const filteredApps = APPS_DATA.filter((app) => {
    if (filter === 'work') return app.isWorkApp;
    if (filter === 'creative') return !app.isWorkApp;
    return true;
  });

  return (
    <section id="gallery" className="py-20 bg-[#0B1120] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-semibold mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>INTERFACE GALLERY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            "화면으로 먼저 만나보세요"
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            각 프로젝트의 실제 주요 화면 구성을 미리 확인하고, 카드를 클릭하여 고해상도 확대 뷰 또는 즉시 실행 링크로 이동할 수 있습니다.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex items-center gap-1.5 p-1 bg-[#162238] border border-slate-800 rounded-xl shadow-inner">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              전체 화면 (6)
            </button>
            <button
              onClick={() => setFilter('work')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                filter === 'work'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              업무용 도구 (4)
            </button>
            <button
              onClick={() => setFilter('creative')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                filter === 'creative'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              홍보 & 체험 (2)
            </button>
          </div>
        </div>

        {/* Gallery Grid: 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="group rounded-xl bg-[#162238] border border-slate-800 hover:border-blue-500/50 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-blue-950/30"
            >
              {/* Screen Preview Container */}
              <div className="relative h-48 bg-[#0F172A] border-b border-slate-800 overflow-hidden">
                <MockupPreview appId={app.id} type="desktop" />

                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-xs text-xs text-white font-medium border border-white/20 shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    <span>상세 화면 확대</span>
                  </div>
                </div>

                {/* Device Type Tag */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] font-mono text-slate-300 flex items-center gap-1 border border-white/10">
                  <Monitor className="w-3 h-3 text-blue-400" />
                  <span>Desktop & Mobile</span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="text-blue-400 font-medium">{app.category}</span>
                  <span className="font-mono text-[11px] text-slate-500 truncate max-w-[130px]">
                    {app.displayUrl}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {app.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {app.coreHeadline}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">화면 구성 및 상세 보기</span>
                  <span className="text-blue-400 font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    확인하기 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about real screenshot replacement */}
        <div className="mt-10 p-4 rounded-xl bg-[#111C2E]/60 border border-slate-800/80 text-center text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
          💡 각 앱 화면은 실제 서비스 구조를 반영한 인터랙티브 프리뷰 슬롯으로 구성되어 있으며,
          상단의 <strong>[앱 실행하기]</strong>를 클릭하면 실시간 배포된 Vercel 앱으로 즉시 연결됩니다.
        </div>
      </div>
    </section>
  );
};
