export interface AppItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  purpose: string;
  coreHeadline: string;
  benefit: string;
  features: string[];
  url: string;
  displayUrl: string;
  isWorkApp: boolean;
  accentColor: string;
  iconType: 'calculator' | 'calendar' | 'contract' | 'bot' | 'building' | 'sparkles';
  screenshots: {
    title: string;
    description: string;
    type: 'desktop' | 'mobile';
  }[];
}

export const APPS_DATA: AppItem[] = [
  {
    id: 'payroll-calc',
    name: '스마트 급여계산기',
    category: '인사·급여',
    badge: '급여 시뮬레이션',
    purpose: '급여 관련 계산 업무를 효율화하는 앱',
    coreHeadline: '복잡한 급여 계산을 더욱 간편하게',
    benefit: '복잡한 4대 보험 및 세액 공제 산출을 몇 번의 입력만으로 정확하게 계산하여 급여 문의 응대와 사전 시뮬레이션을 신속하게 처리합니다.',
    features: [
      '기본급·비과세 수당·부양가족 수 입력에 따른 실시간 공제액 산출',
      '국민연금, 건강보험, 장기요양, 고용보험 4대보험 법정 요율 자동 적용',
      '간이세액표 기준 근로소득세·지방소득세 산출 및 세전/세후 실수령액 한눈 비교',
    ],
    url: 'https://insa-2.vercel.app/',
    displayUrl: 'insa-2.vercel.app',
    isWorkApp: true,
    accentColor: '#3B82F6',
    iconType: 'calculator',
    screenshots: [
      {
        title: '급여 산출 시뮬레이션 메인 화면',
        description: '급여 항목 입력 및 4대보험, 세액 공제 실시간 산출 대시보드',
        type: 'desktop',
      },
      {
        title: '세부 공제 내역 및 실수령액 카드',
        description: '국민연금/건보료 및 실수령액 상세 내역 모바일 뷰',
        type: 'mobile',
      },
    ],
  },
  {
    id: 'leave-promo',
    name: '연차휴가 사용촉진 모바일 업무 시스템',
    category: '인사·노무',
    badge: '노무 법정 준수',
    purpose: '연차휴가 사용촉진 관련 업무 관리',
    coreHeadline: '놓치기 쉬운 연차 관리, 체계적으로',
    benefit: '수기로 챙기기 번거로운 법정 연차촉진 일정과 임직원 사용계획서를 모바일에서 체계적으로 관리하여 노무 리스크를 예방합니다.',
    features: [
      '근로기준법 제61조에 따른 1차(사용시기 지정 촉구) 및 2차 연차촉진 기한 관리',
      '임직원 개인별 발생 연차, 기사용 연차, 잔여 미사용 연차 일수 실시간 확인',
      '모바일 터치 환경에 최적화된 연차 사용계획서 온라인 접수 및 제출 현황 관리',
    ],
    url: 'https://insa-1-6dyf.vercel.app/',
    displayUrl: 'insa-1-6dyf.vercel.app',
    isWorkApp: true,
    accentColor: '#60A5FA',
    iconType: 'calendar',
    screenshots: [
      {
        title: '연차 사용촉진 현황 관리 화면',
        description: '법정 촉진 대상자 현황 및 단계별 촉진 일정 모니터링',
        type: 'desktop',
      },
      {
        title: '모바일 연차 사용계획서 서식',
        description: '직원이 모바일에서 잔여 일수를 확인하고 직접 일정을 지정하는 양식',
        type: 'mobile',
      },
    ],
  },
  {
    id: 'e-contract',
    name: '전자근로계약 관리시스템',
    category: '인사·계약',
    badge: '페이퍼리스 계약',
    purpose: '근로계약 관리 업무 지원',
    coreHeadline: '근로계약 관리도 디지털 방식으로',
    benefit: '종이 서류 출력과 직접 대면 날인 없이 비대면 전자 서명으로 신속하게 근로계약을 체결하고 이력을 안전하게 보관합니다.',
    features: [
      '표준 근로조건, 소정근로시간, 임금 구성을 반영한 디지털 근로계약서 생성',
      '모바일 기기 화면 터치를 통한 비대면 전자 서명 및 체결 완료 기능',
      '계약 체결 완료 여부 실시간 확인 및 안전한 전자 문서 이력 보관',
    ],
    url: 'https://insa1.vercel.app/',
    displayUrl: 'insa1.vercel.app',
    isWorkApp: true,
    accentColor: '#38BDF8',
    iconType: 'contract',
    screenshots: [
      {
        title: '근로계약 작성 및 대시보드',
        description: '계약자 명단 및 체결 대기/완료 상태를 모니터링하는 관리 화면',
        type: 'desktop',
      },
      {
        title: '모바일 전자 서명 패드',
        description: '직원이 스마트폰으로 계약 조항을 확인하고 서명하는 모바일 화면',
        type: 'mobile',
      },
    ],
  },
  {
    id: 'hr-ai-bot',
    name: 'AI 인사규정 도우미',
    category: '인사·정보 공유',
    badge: '생성형 AI 질의응답',
    purpose: '임직원들이 사내 규정에 관해 쉽게 질문하고 안내받도록 지원',
    coreHeadline: '궁금한 회사 규정, AI에게 물어보세요',
    benefit: '인사담당자에게 반복되던 사내 규정 유선 문의를 AI 도우미가 24시간 즉시 답변하여 업무 집중도를 높이고 임직원 편의를 돕습니다.',
    features: [
      '취업규칙, 복리후생, 경조사 지원, 연차 및 특별휴가 규정 데이터 학습',
      '자연어 질문 입력 시 관련 사내 규정 조항과 함께 명확한 가이드라인 제공',
      '자주 묻는 질문(FAQ) 퀵버튼을 통한 신속한 규정 확인 및 검색 지원',
    ],
    url: 'https://masterclass-yw2-ummd.vercel.app/',
    displayUrl: 'masterclass-yw2-ummd.vercel.app',
    isWorkApp: true,
    accentColor: '#818CF8',
    iconType: 'bot',
    screenshots: [
      {
        title: 'AI 대화형 규정 안내 창',
        description: '경조사 규정 및 휴가 관련 자연어 질문에 즉각 조항을 인용해 답변하는 화면',
        type: 'desktop',
      },
      {
        title: '모바일 챗봇 인터페이스',
        description: '모바일에서 퀵버튼으로 복리후생 기준을 간편하게 열람하는 화면',
        type: 'mobile',
      },
    ],
  },
  {
    id: 'yangwoo-web',
    name: '양우종합건설 홍보 웹사이트',
    category: '기업 홍보',
    badge: '기업 브랜딩',
    purpose: '회사 정보와 사업 내용을 소개하는 기업 홍보용 웹사이트',
    coreHeadline: '기업의 가치와 비전을 디지털로 전달하다',
    benefit: '회사의 신뢰성과 건축 역량을 외부 고객 및 구직자에게 현대적이고 세련된 디지털 경험으로 전달합니다.',
    features: [
      '기업 개요, 경영이념 및 건설 역량을 명확히 전달하는 인터랙티브 레이아웃',
      '주거·상업·토목 등 주요 시공 실적 및 프로젝트 포트폴리오 쇼케이스',
      '인재상, 채용 안내 및 고객 문의 창구를 포함한 대외 커뮤니케이션 허브',
    ],
    url: 'https://min-2222-kwl5.vercel.app/',
    displayUrl: 'min-2222-kwl5.vercel.app',
    isWorkApp: false,
    accentColor: '#F59E0B',
    iconType: 'building',
    screenshots: [
      {
        title: '양우종합건설 메인 히어로 & 브랜딩',
        description: '기업 비전과 주요 실적을 조명하는 웹사이트 메인 화면',
        type: 'desktop',
      },
      {
        title: '사업 실적 및 포트폴리오 갤러리',
        description: '시공 사례와 기업 역량을 소개하는 상세 포트폴리오 섹션',
        type: 'desktop',
      },
    ],
  },
  {
    id: 'moonlit-tarot',
    name: '달빛 타로',
    category: 'AI 창작·체험',
    badge: '인터랙티브 AI',
    purpose: 'AI 기술을 활용하여 제작한 타로 체험 콘텐츠',
    coreHeadline: 'AI로 만든 감성적인 디지털 체험',
    benefit: '사내 동료 및 방문자에게 AI 기술이 실무 도구를 넘어 감성적인 인터랙티브 콘텐츠로 확장될 수 있음을 직접 체감하도록 합니다.',
    features: [
      '몽환적인 달빛 테마와 부드러운 카드 셔플 및 3장 스프레드 인터랙션',
      '선택된 카드의 상징적 의미와 고민에 맞춘 AI 생성형 심층 리딩 제공',
      '카드 뒤집기 애니메이션과 감성적인 비주얼 연출로 몰입도 높은 체험 선사',
    ],
    url: 'https://moonlit-tarot-theta.vercel.app/',
    displayUrl: 'moonlit-tarot-theta.vercel.app',
    isWorkApp: false,
    accentColor: '#A855F7',
    iconType: 'sparkles',
    screenshots: [
      {
        title: '달빛 타로 3장 카드 스프레드 선택',
        description: '과거, 현재, 미래 카드를 고르고 셔플하는 신비로운 인터랙션 화면',
        type: 'desktop',
      },
      {
        title: 'AI 심층 카드 리딩 결과',
        description: '생성형 AI가 해석한 카드의 상징과 따뜻한 조언을 전달하는 화면',
        type: 'mobile',
      },
    ],
  },
];
