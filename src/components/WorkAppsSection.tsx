import React from 'react';
import { APPS_DATA, AppItem } from '../data/appsData';
import { AppCard } from './AppCard';

interface WorkAppsSectionProps {
  onPreviewClick: (app: AppItem) => void;
}

export const WorkAppsSection: React.FC<WorkAppsSectionProps> = ({ onPreviewClick }) => {
  const workApps = APPS_DATA.filter((a) => a.isWorkApp);

  return (
    <section id="work-apps" className="py-20 bg-[#0B1120] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
            <span>CORE APPS</span>
            <span aria-hidden="true">·</span>
            <span>4개의 인사총무 업무용 도구</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            "직접 만든 스마트 업무 도구"
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            건설회사 인사총무 현장의 목소리를 담아 실무에 바로 활용할 수 있도록 제작한 4개의 업무 전용 웹 앱입니다.
            각 카드의 앱 실행 버튼을 누르면 실시간으로 배포된 서비스를 직접 체험할 수 있습니다.
          </p>
        </div>

        {/* 2-Column Grid (Desktop) / 1-Column (Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {workApps.map((app) => (
            <AppCard key={app.id} app={app} onPreviewClick={onPreviewClick} />
          ))}
        </div>
      </div>
    </section>
  );
};
