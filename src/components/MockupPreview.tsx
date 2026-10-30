import React from 'react';
import {
  Calculator,
  Calendar,
  FileCheck,
  Bot,
  Building2,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Users,
  CheckCircle,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface MockupPreviewProps {
  appId: string;
  type?: 'desktop' | 'mobile';
  className?: string;
}

export const MockupPreview: React.FC<MockupPreviewProps> = ({
  appId,
  type = 'desktop',
  className = '',
}) => {
  // Render high-fidelity SVG/vector UI representing the genuine screen layout of each app
  switch (appId) {
    case 'payroll-calc':
      return (
        <div className={`w-full h-full bg-[#0F172A] p-4 flex flex-col font-sans select-none text-[11px] ${className}`}>
          {/* Mock Browser Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Calculator className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-200">스마트 급여계산기</span>
            </div>
            <span className="text-[10px] text-blue-400 font-mono">2026 요율 적용</span>
          </div>

          {/* Body Simulation */}
          <div className="grid grid-cols-2 gap-3 mt-3 flex-1">
            <div className="bg-[#1E293B]/60 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">기본급 입력</span>
                <span className="text-white font-mono font-bold text-sm">3,500,000 원</span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>식대 (비과세)</span>
                  <span className="font-mono text-slate-300">200,000</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>부양가족</span>
                  <span className="font-mono text-slate-300">본인 포함 1인</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-950/40 p-2.5 rounded-lg border border-blue-800/40 flex flex-col justify-between">
              <div>
                <span className="text-blue-300 text-[10px] block">예상 실수령액 (월)</span>
                <span className="text-blue-400 font-mono font-bold text-base">3,124,800 원</span>
              </div>
              <div className="text-[10px] text-slate-400 space-y-0.5">
                <div className="flex justify-between">
                  <span>총 공제액</span>
                  <span className="font-mono text-rose-400">-575,200</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-blue-500 h-full w-[84%]" />
                </div>
              </div>
            </div>
          </div>

          {/* 4대보험 공제 리스트 */}
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>국민연금 157,500</span>
            <span>·</span>
            <span>건보료 124,000</span>
            <span>·</span>
            <span>고용보험 31,500</span>
            <span>·</span>
            <span>소득세 84,200</span>
          </div>
        </div>
      );

    case 'leave-promo':
      return (
        <div className={`w-full h-full bg-[#0F172A] p-4 flex flex-col font-sans select-none text-[11px] ${className}`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-sky-600/20 text-sky-400 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-200">연차휴가 사용촉진 시스템</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/50">
              근로기준법 61조 준수
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#1E293B]/70 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">발생 연차</span>
              <span className="text-white font-mono font-bold text-sm">15.0 일</span>
            </div>
            <div className="bg-[#1E293B]/70 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">사용 완료</span>
              <span className="text-slate-300 font-mono font-bold text-sm">6.5 일</span>
            </div>
            <div className="bg-sky-950/50 p-2 rounded border border-sky-800/40">
              <span className="text-[10px] text-sky-300 block">촉진 대상 잔여</span>
              <span className="text-sky-400 font-mono font-bold text-sm">8.5 일</span>
            </div>
          </div>

          {/* 촉진 프로세스 바 */}
          <div className="mt-3 bg-[#111C2E] p-2 rounded border border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1">
              <span className="font-medium text-sky-300">1차 촉진: 사용시기 지정 통보</span>
              <span className="text-emerald-400 font-mono">기한 D-12</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>모바일 서식으로 미사용 연차 계획서 즉시 제출 가능</span>
            </div>
          </div>
        </div>
      );

    case 'e-contract':
      return (
        <div className={`w-full h-full bg-[#0F172A] p-4 flex flex-col font-sans select-none text-[11px] ${className}`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <FileCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-200">전자근로계약 관리시스템</span>
            </div>
            <span className="text-[10px] text-indigo-400 font-mono">비대면 전자 서명</span>
          </div>

          <div className="mt-3 bg-[#1E293B]/60 p-2.5 rounded-lg border border-slate-800">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-slate-200 text-xs">2026년도 표준 근로계약서</span>
              <span className="text-[10px] text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/40">
                서명 대기중
              </span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-2">
              근로조건, 소정근로시간(09:00~18:00), 주휴일 및 급여 지급 기준 명시
            </p>
          </div>

          <div className="mt-2.5 p-2 bg-[#111C2E] rounded border border-dashed border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-400 text-[10px]">
                ✍️
              </div>
              <span className="text-[10px] text-slate-300">모바일 터치 전자 서명 패드</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">체결 즉시 암호화</span>
          </div>
        </div>
      );

    case 'hr-ai-bot':
      return (
        <div className={`w-full h-full bg-[#0F172A] p-4 flex flex-col font-sans select-none text-[11px] ${className}`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-200">AI 인사규정 도우미</span>
            </div>
            <span className="text-[10px] text-purple-400 font-mono">24시간 질의응답</span>
          </div>

          <div className="mt-3 space-y-2 flex-1">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-purple-600 text-white rounded-lg rounded-tr-none px-2.5 py-1.5 text-[10px] max-w-[80%]">
                "경조사 휴가 및 화환 지원 기준이 어떻게 되나요?"
              </div>
            </div>

            {/* AI message */}
            <div className="flex justify-start">
              <div className="bg-[#1E293B] border border-slate-800 text-slate-200 rounded-lg rounded-tl-none px-2.5 py-1.5 text-[10px] max-w-[90%]">
                <span className="text-purple-400 font-semibold block text-[9px] mb-0.5">
                  취업규칙 제28조 (경조사 휴가)
                </span>
                본인 결혼 시 유급휴가 5일과 축하 화환 및 축의금이 지급됩니다.
              </div>
            </div>
          </div>

          {/* Quick FAQ buttons */}
          <div className="mt-2 pt-2 border-t border-slate-800 flex gap-1.5 overflow-hidden">
            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px] truncate">
              연차 발생 기준
            </span>
            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px] truncate">
              병가 신청 절차
            </span>
            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px] truncate">
              자녀 출산휴가
            </span>
          </div>
        </div>
      );

    case 'yangwoo-web':
      return (
        <div className={`w-full h-full bg-[#0B132B] p-4 flex flex-col font-sans select-none text-[11px] ${className}`}>
          <div className="flex items-center justify-between pb-3 border-b border-amber-900/40">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-100">양우종합건설</span>
            </div>
            <div className="flex gap-2 text-[10px] text-slate-400">
              <span>회사소개</span>
              <span>사업실적</span>
              <span>인재채용</span>
            </div>
          </div>

          <div className="mt-3 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 p-3 rounded-lg border border-amber-800/30 flex-1 flex flex-col justify-between">
            <div>
              <span className="text-amber-400 text-[10px] font-semibold tracking-wider uppercase block">
                Human & Space Innovation
              </span>
              <h4 className="text-white font-bold text-xs mt-0.5">
                신뢰와 가치를 세우는 공간의 미래
              </h4>
              <p className="text-slate-400 text-[10px] mt-1">
                주거·상업·토목 시공 실적 및 건축 포트폴리오
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="flex-1 bg-black/40 p-1.5 rounded border border-slate-800 text-center">
                <span className="text-amber-300 font-mono font-bold text-[11px]">30+</span>
                <span className="text-[9px] text-slate-400 block">시공 실적</span>
              </div>
              <div className="flex-1 bg-black/40 p-1.5 rounded border border-slate-800 text-center">
                <span className="text-amber-300 font-mono font-bold text-[11px]">Top Quality</span>
                <span className="text-[9px] text-slate-400 block">책임 준공</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'moonlit-tarot':
      return (
        <div className={`w-full h-full bg-[#120B26] p-4 flex flex-col font-sans select-none text-[11px] ${className}`}>
          <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-purple-600/30 text-purple-300 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-purple-200">달빛 타로 (Moonlit Tarot)</span>
            </div>
            <span className="text-[10px] text-purple-400 font-mono">AI 감성 체험</span>
          </div>

          <div className="mt-3 flex-1 flex flex-col justify-between">
            <div className="flex justify-center gap-2 py-1">
              <div className="w-12 h-18 bg-purple-950/80 border border-purple-500/50 rounded flex flex-col items-center justify-center shadow-lg shadow-purple-950/50">
                <span className="text-sm">🌕</span>
                <span className="text-[8px] text-purple-300 mt-1 font-mono">PAST</span>
              </div>
              <div className="w-12 h-18 bg-purple-900/90 border border-purple-400 rounded flex flex-col items-center justify-center shadow-lg shadow-purple-900/50 scale-105">
                <span className="text-sm">⭐</span>
                <span className="text-[8px] text-purple-200 mt-1 font-mono">PRESENT</span>
              </div>
              <div className="w-12 h-18 bg-purple-950/80 border border-purple-500/50 rounded flex flex-col items-center justify-center shadow-lg shadow-purple-950/50">
                <span className="text-sm">✨</span>
                <span className="text-[8px] text-purple-300 mt-1 font-mono">FUTURE</span>
              </div>
            </div>

            <div className="bg-[#1D1238] p-2 rounded border border-purple-800/40 text-[10px] text-purple-200 text-center">
              "달빛이 비추는 현재의 자리에 당신의 진정한 가능성이 머물고 있습니다."
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-[#0F172A] p-4 flex items-center justify-center text-slate-500 text-xs">
          앱 미리보기 화면
        </div>
      );
  }
};
