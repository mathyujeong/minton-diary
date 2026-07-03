import React, { useState } from 'react';
import { 
  Trophy, Calendar, Search, FileText, User, Plus, ExternalLink, 
  Activity, ShieldAlert, CheckCircle2, ChevronRight, Video, X, 
  Edit3, RefreshCw, Award, Filter, Sparkles, MapPin, UserCheck, SearchCode
} from 'lucide-react';

// Authentic Federation Player Database (Simulating BKPLAY & Netsystem search results)
const FEDERATION_PLAYERS_DB = [
  {
    id: "tech_yujeong",
    name: "유정",
    club: "광양시 / 테크존클럽",
    gender: "여",
    birthYear: "1994",
    grade1: "D+",
    grade2: "D1",
    winRate: "78%",
    tourneysPlayed: "14",
    trophies: "3",
    recentEvent: "2026 광양시장기 전국배드민턴대회 여복 본선 4강",
    isMe: true
  },
  {
    id: "tech_seoyeon",
    name: "김서연",
    club: "광양시 / 테크존클럽",
    gender: "여",
    birthYear: "1995",
    grade1: "D+",
    grade2: "D",
    winRate: "75%",
    tourneysPlayed: "12",
    trophies: "2",
    recentEvent: "2026 광양시장기 전국배드민턴대회 여복 본선 4강",
    isMe: false
  },
  {
    id: "tech_junho",
    name: "이준호",
    club: "광양시 / 테크존클럽",
    gender: "남",
    birthYear: "1991",
    grade1: "C",
    grade2: "D1",
    winRate: "70%",
    tourneysPlayed: "18",
    trophies: "4",
    recentEvent: "제21회 전라남도지사기 혼복 예선 2차전",
    isMe: false
  },
  {
    id: "tech_minsoo",
    name: "박민수",
    club: "광양시 / 테크존클럽",
    gender: "남",
    birthYear: "1988",
    grade1: "B",
    grade2: "B",
    winRate: "82%",
    tourneysPlayed: "25",
    trophies: "8",
    recentEvent: "2026 광양시장기 남복 B급 우승",
    isMe: false
  },
  {
    id: "opp_soojin",
    name: "박수진",
    club: "순천시 / 순천클럽",
    gender: "여",
    birthYear: "1993",
    grade1: "D",
    grade2: "D+",
    winRate: "65%",
    tourneysPlayed: "16",
    trophies: "2",
    recentEvent: "2025 전남생활체육대축전 여복 D급 3위",
    isMe: false
  },
  {
    id: "opp_youngsoo",
    name: "김영수",
    club: "광주시 / 광주에이스",
    gender: "남",
    birthYear: "1989",
    grade1: "C",
    grade2: "C1",
    winRate: "72%",
    tourneysPlayed: "22",
    trophies: "5",
    recentEvent: "2026 호남지역대회 혼복 C급 준우승",
    isMe: false
  }
];

const INITIAL_MATCHES = [
  {
    id: 1,
    tournament: "2026 광양시장기 전국배드민턴대회 (S급오픈)",
    date: "2026.04.25",
    location: "광양시 실내체육관 3번 코트",
    event: "30대 D급 여복 본선 4강",
    myTeam: "유정 / 김서연 (테크존)",
    opponentTeam: "박수진 / 이하은 (순천클럽)",
    opponentId: "opp_soojin",
    score: "25 : 21",
    result: "WIN",
    memo: "전위 대각선 드롭을 계속 노려서 성공! 파트너 서연이 후위 스매시 타이밍 아주 좋았음. 우리 테크존클럽 응원 덕분에 힘났음🔥",
    videoUrl: "https://youtu.be/minton_sample_1",
    hasMemo: true
  },
  {
    id: 2,
    tournament: "제21회 전라남도지사기 배드민턴대회",
    date: "2026.03.08",
    location: "무안 스포츠파크 7번 코트",
    event: "30대 D1급 혼복 예선 2차전",
    myTeam: "유정 / 이준호 (테크존)",
    opponentTeam: "김영수 / 최유리 (광주에이스)",
    opponentId: "opp_youngsoo",
    score: "23 : 25",
    result: "LOSS",
    memo: "상대 남자 선수(김영수) 백핸드 푸시가 엄청 빠름. 다음번엔 서비스 리턴 시 좀 더 뒤로 빠져서 대비할 것.",
    videoUrl: "",
    hasMemo: true
  },
  {
    id: 3,
    tournament: "2026 천년의빛 영광배드민턴대회",
    date: "2026.05.09 (예정)",
    location: "영광 스포티움 5번 코트 (14:30 예정)",
    event: "30대 D급 여복 예선 1차전",
    myTeam: "유정 / 김서연 (테크존)",
    opponentTeam: "정소민 / 한지혜 (목포유달)",
    opponentId: "opp_somin",
    score: "VS",
    result: "UPCOMING",
    memo: "대진표 확정! 상대팀 정소민 선수는 작년 장성대회 우승 경험 있음. 테크존클럽의 명예를 걸고 파이팅하자🔥",
    videoUrl: "",
    hasMemo: false
  }
];

const OPPONENT_DATABASE = {
  "opp_soojin": {
    name: "박수진",
    club: "순천시 / 순천클럽",
    grade: "여복 D · 혼복 D+",
    winRate: "65%",
    recentTourney: "2025 전남생활체육대축전 여복 D급 3위",
    scoutingNote: "🚨 비밀 스카우팅 노트: 백핸드 클리어 비거리가 짧음! 랠리 시 무조건 백핸드 쪽 깊숙이 밀어내면 찬스 볼이 넘어옴. 전위 네트플레이는 아주 강하니 드롭보다는 밀어치는 드라이브 승부 권장.",
    playStyle: "전위 네트 플레이어 (속공형)"
  },
  "opp_youngsoo": {
    name: "김영수",
    club: "광주시 / 광주에이스",
    grade: "남복 C · 혼복 C1",
    winRate: "72%",
    recentTourney: "2026 호남지역대회 혼복 C급 준우승",
    scoutingNote: "🚨 비밀 스카우팅 노트: 후위 스매시 파워가 엄청나지만 2차 랠리 리턴이 다소 느림. 스매시 수비 시 직선 대각 커브로 반격하면 득점 확률 높음.",
    playStyle: "후위 강타 스매셔 (파워형)"
  },
  "opp_somin": {
    name: "정소민",
    club: "목포시 / 목포유달",
    grade: "여복 D급",
    winRate: "58%",
    recentTourney: "2025 장성군수배 여복 D급 우승",
    scoutingNote: "🚨 비밀 스카우팅 노트: 아직 직접 대결한 적 없음. 지역 동호인들 말로는 체력이 좋고 수비가 끈질기다고 함. 랠리 길게 갈 각오 필요.",
    playStyle: "수비 올라운더 (지구력형)"
  }
};

const TOURNAMENTS_FEED = [
  { id: 295, date: "2026.05.09 ~ 05.10", name: "2026 천년의빛 영광배드민턴대회", location: "영광군", status: "접수완료", dDay: "D-36" },
  { id: 297, date: "2026.05.16 ~ 05.17", name: "제20회 지리산남악제배드민턴대회", location: "구례군", status: "접수중", dDay: "D-43" },
  { id: 300, date: "2026.06.06 ~ 06.07", name: "2026 정남진 장흥배드민턴대회", location: "장흥군", status: "접수예정", dDay: "D-64" },
  { id: 304, date: "2026.07.11 ~ 07.12", name: "제9회 목포유달산배 배드민턴대회 (S급 오픈)", location: "목포시", status: "접수예정", dDay: "D-99" },
  { id: 305, date: "2026.07.18 ~ 07.19", name: "2026년 화순적벽배드민턴축제", location: "화순군", status: "접수예정", dDay: "D-106" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("diary"); // "diary" | "tournaments" | "scouting" | "profile"
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [myProfile, setMyProfile] = useState(FEDERATION_PLAYERS_DB[0]); // Default to 유정 (광양시 / 테크존클럽)
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [isEditingMemo, setIsEditingMemo] = useState(null); // match id
  const [memoText, setMemoText] = useState("");
  const [videoText, setVideoText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [filterResult, setFilterResult] = useState("ALL"); // ALL | WIN | LOSS | UPCOMING
  
  // Player Search Modal State
  const [isSearchingPlayer, setIsSearchingPlayer] = useState(false);
  const [playerSearchKeyword, setPlayerSearchKeyword] = useState("테크존");

  // Simulate auto sync from BKPLAY / Netsystem
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert(`🎉 BKPLAY 및 넷시스템 서버와 데이터 갱신이 완료되었습니다!\n[${myProfile.club}]의 '${myProfile.name}' 선수 공식 전적 데이터가 최신으로 동기화되었습니다.`);
    }, 1000);
  };

  const handleSelectMyPlayer = (player) => {
    setMyProfile({
      ...player,
      lastSync: "방금 전 (LIVE 검색 연동 🟢)"
    });
    setIsSearchingPlayer(false);
    alert(`🎉 연동 대성공!!\n이제부터 [${player.club}]의 '${player.name}' 선수로 민턴일기장이 연동됩니다.\n관련 대회 출전 이력 및 급수가 자동으로 세팅되었습니다.`);
  };

  const openMemoModal = (match) => {
    setIsEditingMemo(match.id);
    setMemoText(match.memo || "");
    setVideoText(match.videoUrl || "");
  };

  const saveMemo = (id) => {
    setMatches(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, memo: memoText, videoUrl: videoText, hasMemo: true };
      }
      return m;
    }));
    setIsEditingMemo(null);
  };

  const filteredMatches = matches.filter(m => {
    if (filterResult === "ALL") return true;
    return m.result === filterResult;
  });

  const filteredPlayersDb = FEDERATION_PLAYERS_DB.filter(p => {
    if (!playerSearchKeyword.trim()) return true;
    const kw = playerSearchKeyword.toLowerCase();
    return p.name.includes(kw) || p.club.includes(kw) || p.grade1.toLowerCase().includes(kw);
  });

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans">
      
      {/* 1. TOP UTILITY BAR (Nike Style) */}
      <div className="bg-[#f5f5f5] px-6 py-2.5 border-b border-[#e5e5e5] flex flex-wrap justify-between items-center text-xs text-[#707072] font-medium gap-2">
        <div className="flex items-center gap-2">
          <span className="live-dot"></span>
          <span className="font-semibold text-[#111111]">연동 클럽: {myProfile.club} | 선수명: {myProfile.name}</span>
          <span className="bg-[#111111] text-white px-2 py-0.5 rounded-full text-[10px]">공식 DB 연동중</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setIsSearchingPlayer(true); setPlayerSearchKeyword("테크존"); }}
            className="bg-[#d30005] text-white font-bold px-3 py-1 rounded-full text-[11px] hover:bg-[#780700] transition-colors flex items-center gap-1 shadow-sm"
          >
            <SearchCode size={13} /> 내 클럽/선수 변경 및 검색
          </button>
          <button onClick={handleTriggerSync} className="hover:text-[#111111] flex items-center gap-1 transition-colors font-semibold">
            <RefreshCw size={12} className={isSyncing ? "animate-spin text-[#007d48]" : ""} />
            <span>{isSyncing ? "데이터 불러오는 중..." : "동기화 갱신"}</span>
          </button>
          <span className="hidden sm:inline">DB: SUPABASE CLOUD</span>
        </div>
      </div>

      {/* 2. PRIMARY NAV BAR */}
      <header className="border-b border-[#cacacb] px-6 py-4 flex flex-wrap justify-between items-center bg-white sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-[#111111] text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-xl tracking-tighter">
            MD
          </div>
          <div>
            <h1 className="font-display-md tracking-tight leading-none text-2xl font-black">
              민턴일기장 <span className="text-xs font-sans font-normal text-[#707072] ml-1">MINTON DIARY</span>
            </h1>
            <p className="text-[11px] text-[#707072] tracking-wider font-semibold uppercase">Nike Athletic Editorial UI</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 my-2 sm:my-0 flex-wrap">
          {[
            { id: "diary", label: "내 경기 다이어리", icon: FileText, count: matches.length },
            { id: "tournaments", label: "대회 일정 연동 피드", icon: Calendar, count: TOURNAMENTS_FEED.length },
            { id: "scouting", label: "상대 스카우팅 리포트", icon: ShieldAlert, count: Object.keys(OPPONENT_DATABASE).length },
            { id: "profile", label: "내 클럽 & 프로필 설정", icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedOpponent(null); }}
                className={`pill-chip ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white text-[#111111]' : 'bg-[#e5e5e5] text-[#111111]'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Search Pill */}
        <div className="search-pill-container w-full sm:w-60">
          <Search size={16} className="text-[#707072] ml-1" />
          <input 
            type="text" 
            placeholder="선수, 대회, 클럽 검색..." 
            className="search-pill-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-[#707072] hover:text-[#111111]">
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      {/* 3. HERO ATHLETIC BILLBOARD (Nike Campaign Style) */}
      <section className="bg-[#111111] text-white px-6 py-12 border-b border-[#cacacb] relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-[#d30005] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                PRO ATHLETE DASHBOARD
              </span>
              <span className="text-white bg-[#39393b] text-xs font-bold px-3 py-1 rounded-full">
                {myProfile.club}
              </span>
              <button 
                onClick={() => { setIsSearchingPlayer(true); setPlayerSearchKeyword("테크존"); }}
                className="text-xs text-[#f5f5f5] underline font-semibold hover:text-white"
              >
                (클럽/선수 변경)
              </button>
            </div>
            <h2 className="font-display-hero text-6xl md:text-8xl tracking-tight leading-none">
              {myProfile.name}'S <br />
              <span className="text-[#f5f5f5] opacity-90">BATTLE RECORD</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6 bg-[#222222] p-6 rounded-none w-full md:w-auto border border-[#39393b]">
            <div>
              <p className="text-[#9e9ea0] text-xs font-semibold uppercase">Win Rate</p>
              <p className="font-display-lg text-4xl text-[#1eaa52] mt-1">{myProfile.winRate}</p>
            </div>
            <div className="border-l border-[#39393b] pl-6">
              <p className="text-[#9e9ea0] text-xs font-semibold uppercase">Tourneys</p>
              <p className="font-display-lg text-4xl text-white mt-1">{myProfile.tourneysPlayed}</p>
            </div>
            <div className="border-l border-[#39393b] pl-6">
              <p className="text-[#9e9ea0] text-xs font-semibold uppercase">Trophies</p>
              <p className="font-display-lg text-4xl text-[#fdf2e1] mt-1">{myProfile.trophies} 🏆</p>
            </div>
          </div>
        </div>
        {/* Subtle decorative background text */}
        <div className="absolute -right-10 -bottom-10 font-display-hero text-[180px] text-white opacity-[0.03] select-none pointer-events-none">
          TECHZONE
        </div>
      </section>

      {/* 4. MAIN CONTENT WORKSPACE */}
      <main className="max-w-6xl mx-auto w-full p-6 flex-1">
        
        {/* TAB 1: MATCH DIARY (내 경기 다이어리) */}
        {activeTab === "diary" && !selectedOpponent && (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="font-display-md text-3xl">RECENT & UPCOMING MATCHES</h3>
                <p className="text-sm text-[#707072]">
                  <strong>[{myProfile.club}]</strong> 소속 <strong>{myProfile.name}</strong> 선수의 공식 출전 일정과 실전 전술 일지입니다.
                </p>
              </div>

              {/* Result Filter Chips */}
              <div className="flex gap-2 flex-wrap">
                {["ALL", "WIN", "LOSS", "UPCOMING"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterResult(f)}
                    className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                      filterResult === f 
                        ? 'bg-[#111111] text-white shadow-sm' 
                        : 'bg-[#f5f5f5] text-[#707072] hover:bg-[#e5e5e5]'
                    }`}
                  >
                    {f === "ALL" ? "전체 보기" : f === "WIN" ? "승리 🔥" : f === "LOSS" ? "패배 💧" : "출전 예정 📌"}
                  </button>
                ))}
              </div>
            </div>

            {/* Match Cards List */}
            <div className="space-y-4">
              {filteredMatches.map(match => {
                const isWin = match.result === "WIN";
                const isLoss = match.result === "LOSS";
                const isUpcoming = match.result === "UPCOMING";

                return (
                  <div key={match.id} className="nike-card-stage border border-[#e5e5e5] hover:border-[#111111] transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      
                      {/* Left: Tournament & Match Info */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-black px-2.5 py-1 rounded-full uppercase ${
                            isWin ? 'bg-[#d30005] text-white' : isLoss ? 'bg-[#39393b] text-white' : 'bg-[#0a7281] text-white'
                          }`}>
                            {isWin ? "WIN 🔥" : isLoss ? "LOSS 💧" : "D-DAY UPCOMING 📌"}
                          </span>
                          <span className="text-xs font-semibold text-[#707072] flex items-center gap-1">
                            <Calendar size={13} /> {match.date} | {match.location}
                          </span>
                        </div>
                        <h4 className="font-bold text-xl text-[#111111]">{match.tournament}</h4>
                        <p className="text-sm font-semibold text-[#4b4b4d] bg-white inline-block px-3 py-1 rounded-md border border-[#e5e5e5]">
                          종목: {match.event}
                        </p>
                      </div>

                      {/* Center: Team vs Opponent Score */}
                      <div className="bg-white p-4 rounded-xl border border-[#cacacb] flex items-center gap-6 text-center min-w-[280px] justify-between">
                        <div className="text-left">
                          <p className="text-[11px] text-[#707072] font-semibold">MY TEAM</p>
                          <p className="font-bold text-sm text-[#111111]">{match.myTeam}</p>
                        </div>
                        
                        <div className="bg-[#111111] text-white px-3 py-1.5 rounded-lg font-display-md text-xl tracking-wider">
                          {match.score}
                        </div>

                        <div className="text-right">
                          <p className="text-[11px] text-[#707072] font-semibold">OPPONENT</p>
                          <button 
                            onClick={() => setSelectedOpponent(OPPONENT_DATABASE[match.opponentId])}
                            className="font-bold text-sm text-[#d30005] hover:underline flex items-center justify-end gap-1"
                          >
                            <span>{match.opponentTeam}</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex md:flex-col gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => openMemoModal(match)}
                          className="btn-primary flex-1 md:flex-none justify-center text-xs py-3"
                        >
                          <Edit3 size={14} />
                          <span>{match.hasMemo ? "비밀 일지 수정" : "+ 실전 메모 추가"}</span>
                        </button>
                        <button 
                          onClick={() => setSelectedOpponent(OPPONENT_DATABASE[match.opponentId])}
                          className="btn-secondary flex-1 md:flex-none justify-center text-xs py-3 bg-white border border-[#cacacb]"
                        >
                          <ShieldAlert size={14} className="text-[#d30005]" />
                          <span>상대 스카우팅</span>
                        </button>
                      </div>
                    </div>

                    {/* Secret Tactical Note Display */}
                    {match.memo && (
                      <div className="mt-6 pt-6 border-t border-[#cacacb] bg-white p-4 rounded-xl border-l-4 border-l-[#111111]">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#111111] uppercase tracking-wider">
                            <Sparkles size={14} className="text-[#d30005]" />
                            <span>MY TACTICAL DIARY & FEEDBACK</span>
                          </div>
                          {match.videoUrl && (
                            <a 
                              href={match.videoUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-xs text-[#0a7281] font-bold hover:underline flex items-center gap-1"
                            >
                              <Video size={13} /> 경기 녹화 유튜브 보기
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-[#39393b] mt-1 font-medium leading-relaxed">
                          "{match.memo}"
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TOURNAMENTS FEED (대회 일정 연동) */}
        {activeTab === "tournaments" && !selectedOpponent && (
          <div className="space-y-8">
            <div>
              <h3 className="font-display-md text-3xl">NATIONAL TOURNAMENTS FEED</h3>
              <p className="text-sm text-[#707072]">넷시스템 및 BKPLAY에서 실시간 수집되는 전국 동호인 배드민턴 일정입니다. 출전 버튼을 눌러 일기장에 연동하세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TOURNAMENTS_FEED.map(t => (
                <div key={t.id} className="nike-card-stage border border-[#cacacb] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold px-3 py-1 bg-[#111111] text-white rounded-full">
                        {t.dDay}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        t.status === '접수중' ? 'bg-[#d30005] text-white' : 'bg-white text-[#707072] border border-[#cacacb]'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-xl mb-2">{t.name}</h4>
                    <p className="text-sm text-[#707072] flex items-center gap-1.5 mb-1">
                      <Calendar size={14} /> 기간: {t.date}
                    </p>
                    <p className="text-sm text-[#707072] flex items-center gap-1.5">
                      <MapPin size={14} /> 장소: {t.location}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#cacacb] flex gap-3">
                    <button 
                      onClick={() => {
                        alert(`📌 [${t.name}] 일정을 내 경기 다이어리에 추가했습니다!\n대진표가 발표되면 자동으로 코트 번호와 상대방을 긁어옵니다.`);
                        setActiveTab("diary");
                      }} 
                      className="btn-primary flex-1 text-xs py-2.5 justify-center"
                    >
                      <Plus size={14} /> 내 일기장에 연동하기
                    </button>
                    <a 
                      href="https://netsystem.co.kr:8081/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-secondary text-xs py-2.5 px-4 bg-white border border-[#cacacb]"
                    >
                      요강 확인 <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SCOUTING DIRECTORY (상대 스카우팅 리포트) */}
        {activeTab === "scouting" && !selectedOpponent && (
          <div className="space-y-8">
            <div>
              <h3 className="font-display-md text-3xl">OPPONENT SCOUTING DATABASE</h3>
              <p className="text-sm text-[#707072]">과거 대결했던 상대방들의 플레이 스타일과 내 비밀 약점 분석 노트를 확인하세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(OPPONENT_DATABASE).map(([id, opp]) => (
                <div 
                  key={id} 
                  onClick={() => setSelectedOpponent(opp)}
                  className="nike-card-stage border border-[#cacacb] hover:border-[#111111] cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[#111111] text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {opp.name[0]}
                    </div>
                    <span className="text-xs font-bold text-[#d30005] bg-white px-2.5 py-1 rounded-full border border-[#e5e5e5]">
                      WIN RATE {opp.winRate}
                    </span>
                  </div>

                  <h4 className="font-bold text-xl group-hover:text-[#d30005] transition-colors flex items-center justify-between">
                    <span>{opp.name} 선수의 카드</span>
                    <ChevronRight size={18} />
                  </h4>
                  <p className="text-xs text-[#707072] font-semibold mt-1">{opp.club} | {opp.grade}</p>

                  <div className="mt-4 pt-4 border-t border-[#cacacb] space-y-2">
                    <p className="text-xs font-bold text-[#111111]">⚡ 플레이 스타일: {opp.playStyle}</p>
                    <p className="text-xs text-[#707072] line-clamp-2">" {opp.scoutingNote.replace("🚨 비밀 스카우팅 노트: ", "")} "</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE & CLUB SETTINGS (내 클럽 & 프로필 설정) */}
        {activeTab === "profile" && !selectedOpponent && (
          <div className="max-w-3xl mx-auto space-y-8 bg-[#f5f5f5] p-8 rounded-none border border-[#cacacb]">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h3 className="font-display-md text-3xl">MY CLUB & PLAYER LINKING</h3>
                <p className="text-sm text-[#707072]">내가 소속된 클럽과 이름을 공식 배드민턴 연합회 DB에서 검색하여 직접 연동할 수 있습니다.</p>
              </div>
              <button 
                onClick={() => { setIsSearchingPlayer(true); setPlayerSearchKeyword("테크존"); }}
                className="btn-sale text-xs py-2.5 px-5"
              >
                <SearchCode size={15} /> 🔍 선수 / 클럽 검색해서 연동 변경하기
              </button>
            </div>

            <div className="space-y-4 bg-white p-6 rounded-xl border border-[#cacacb]">
              <div className="flex items-center gap-3 border-b border-[#e5e5e5] pb-4">
                <div className="w-12 h-12 bg-[#111111] text-white rounded-full flex items-center justify-center font-black text-xl">
                  {myProfile.name[0]}
                </div>
                <div>
                  <span className="text-[11px] font-bold bg-[#007d48] text-white px-2 py-0.5 rounded-full">
                    현재 연결된 공식 선수
                  </span>
                  <h4 className="font-bold text-2xl text-[#111111] mt-1">{myProfile.name} 님</h4>
                  <p className="text-sm text-[#707072] font-semibold">{myProfile.club}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#707072] block mb-1">선수 이름</label>
                  <input 
                    type="text" 
                    value={myProfile.name} 
                    onChange={(e) => setMyProfile({ ...myProfile, name: e.target.value })}
                    className="w-full p-3 border border-[#cacacb] rounded-lg font-bold text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#707072] block mb-1">소속 클럽 / 지역</label>
                  <input 
                    type="text" 
                    value={myProfile.club} 
                    onChange={(e) => setMyProfile({ ...myProfile, club: e.target.value })}
                    className="w-full p-3 border border-[#cacacb] rounded-lg font-bold text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#707072] block mb-1">출생년도</label>
                  <input 
                    type="text" 
                    value={myProfile.birthYear} 
                    onChange={(e) => setMyProfile({ ...myProfile, birthYear: e.target.value })}
                    className="w-full p-3 border border-[#cacacb] rounded-lg font-bold text-[#111111]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#707072] block mb-1">주 급수 (Grade 1)</label>
                  <input 
                    type="text" 
                    value={myProfile.grade1} 
                    onChange={(e) => setMyProfile({ ...myProfile, grade1: e.target.value })}
                    className="w-full p-3 border border-[#cacacb] rounded-lg font-bold text-[#111111]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#707072] block mb-1">세부 급수 (Grade 2)</label>
                  <input 
                    type="text" 
                    value={myProfile.grade2} 
                    onChange={(e) => setMyProfile({ ...myProfile, grade2: e.target.value })}
                    className="w-full p-3 border border-[#cacacb] rounded-lg font-bold text-[#111111]"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => { setIsSearchingPlayer(true); setPlayerSearchKeyword("테크존"); }}
                  className="btn-secondary flex-1 justify-center py-3 border border-[#cacacb]"
                >
                  <SearchCode size={16} /> 공식 선수 DB 다시 검색하기
                </button>
                <button 
                  onClick={handleTriggerSync}
                  className="btn-primary flex-1 justify-center py-3"
                >
                  <RefreshCw size={16} /> 변경된 소속 데이터 동기화
                </button>
              </div>
            </div>

            <div className="bg-[#111111] text-white p-6 rounded-xl space-y-2">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <CheckCircle2 className="text-[#1eaa52]" /> Supabase 클라우드 데이터베이스 연결 상태
              </h4>
              <p className="text-xs text-[#9e9ea0]">
                계정 연동 완료: `techzone@minton-diary.supabase.co` <br />
                <strong>[광양시 테크존클럽]</strong> 소속 경기 데이터 및 비밀 전술 일지가 실시간으로 영구 백업되고 있습니다.
              </p>
            </div>
          </div>
        )}

        {/* 5. OPPONENT DETAILED SCOUTING VIEW (상대 선수 클릭 시 화면) */}
        {selectedOpponent && (
          <div className="bg-[#f5f5f5] p-8 border border-[#111111] space-y-6 relative animate-fadeIn">
            <button 
              onClick={() => setSelectedOpponent(null)}
              className="absolute top-6 right-6 btn-icon-circle bg-white border border-[#cacacb]"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#d30005] text-white rounded-full flex items-center justify-center font-black text-2xl">
                {selectedOpponent.name[0]}
              </div>
              <div>
                <span className="bg-[#111111] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  OPPONENT SCOUTING REPORT
                </span>
                <h3 className="font-display-md text-4xl mt-1">{selectedOpponent.name} 선수</h3>
                <p className="text-sm font-semibold text-[#707072]">{selectedOpponent.club} | {selectedOpponent.grade}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Official Stats pulled from API */}
              <div className="bg-white p-6 border border-[#cacacb] space-y-4">
                <h4 className="font-bold text-sm text-[#707072] uppercase flex items-center gap-1.5 border-b border-[#e5e5e5] pb-2">
                  <Activity size={16} /> 공식 대회 데이터 (BKPLAY 연동)
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#707072]">공식 통계 승률:</span>
                    <span className="font-bold text-lg text-[#1eaa52]">{selectedOpponent.winRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#707072]">주요 플레이 스타일:</span>
                    <span className="font-bold text-sm text-[#111111]">{selectedOpponent.playStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#707072]">최근 대회 입상:</span>
                    <span className="font-bold text-sm text-[#d30005]">{selectedOpponent.recentTourney}</span>
                  </div>
                </div>
              </div>

              {/* Secret Tactical Notes by User */}
              <div className="bg-[#111111] text-white p-6 border border-[#111111] space-y-4 relative overflow-hidden">
                <h4 className="font-bold text-sm text-[#f5f5f5] uppercase flex items-center gap-1.5 border-b border-[#39393b] pb-2">
                  <ShieldAlert size={16} className="text-[#d30005]" /> 나의 1:1 맞춤 약점 공략 노트
                </h4>
                <p className="text-sm text-[#f5f5f5] leading-relaxed font-medium">
                  {selectedOpponent.scoutingNote}
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      const newNote = prompt("이 선수에 대한 스카우팅 노트를 수정하세요:", selectedOpponent.scoutingNote);
                      if (newNote) {
                        alert("✅ Supabase 데이터베이스에 스카우팅 메모가 갱신되었습니다!");
                      }
                    }}
                    className="btn-sale text-xs py-2 px-4"
                  >
                    <Edit3 size={12} /> 스카우팅 노트 업데이트
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button 
                onClick={() => setSelectedOpponent(null)} 
                className="btn-primary"
              >
                다시 다이어리 목록으로 돌아가기
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 6. MODAL: PLAYER & CLUB SEARCH (선수 및 클럽 검색 연동 창) */}
      {isSearchingPlayer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white max-w-2xl w-full p-8 border-2 border-[#111111] space-y-6 relative shadow-2xl rounded-none">
            <div className="flex justify-between items-center border-b border-[#cacacb] pb-4">
              <div>
                <span className="bg-[#d30005] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  FEDERATION DB SEARCH
                </span>
                <h3 className="font-display-md text-3xl mt-1 flex items-center gap-2">
                  <SearchCode size={24} /> 내 클럽 및 선수 검색해서 연동하기
                </h3>
              </div>
              <button onClick={() => setIsSearchingPlayer(false)} className="btn-icon-circle">
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-[#707072]">
              전남동호인 급수현황(netsystem) 및 BKPLAY 공식 DB에 등록된 본인의 <strong>이름이나 클럽명</strong>을 입력하세요.
            </p>

            {/* Search Input Box */}
            <div className="flex gap-2">
              <div className="search-pill-container flex-1 bg-[#f5f5f5] border-2 border-[#111111]">
                <Search size={18} className="text-[#111111] ml-2" />
                <input 
                  type="text" 
                  value={playerSearchKeyword}
                  onChange={(e) => setPlayerSearchKeyword(e.target.value)}
                  placeholder="예: 테크존, 광양시, 유정, 김서연..."
                  className="search-pill-input font-bold text-base py-2.5"
                  autoFocus
                />
                {playerSearchKeyword && (
                  <button onClick={() => setPlayerSearchKeyword("")} className="text-[#707072] mr-2">
                    <X size={16} />
                  </button>
                )}
              </div>
              <button className="btn-primary px-6">
                검색
              </button>
            </div>

            {/* Search Results Grid */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              <p className="text-xs font-bold text-[#707072] uppercase">
                검색 결과 ({filteredPlayersDb.length}명 발견)
              </p>

              {filteredPlayersDb.length === 0 ? (
                <div className="text-center py-12 bg-[#f5f5f5] rounded-lg">
                  <p className="text-sm font-bold text-[#707072]">검색된 선수가 없습니다.</p>
                  <p className="text-xs text-[#9e9ea0] mt-1">이름이나 클럽명을 다시 확인해주세요.</p>
                </div>
              ) : (
                filteredPlayersDb.map(player => (
                  <div 
                    key={player.id}
                    className="p-4 border border-[#cacacb] hover:border-[#111111] bg-[#f5f5f5] hover:bg-white transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 bg-[#111111] text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {player.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg text-[#111111] group-hover:text-[#d30005] transition-colors">
                            {player.name}
                          </h4>
                          <span className="text-xs font-semibold bg-white px-2 py-0.5 rounded border border-[#cacacb]">
                            {player.gender} · {player.birthYear}년생
                          </span>
                          <span className="text-xs font-bold bg-[#111111] text-white px-2 py-0.5 rounded">
                            급수: {player.grade1}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#0a7281] mt-0.5">
                          🏸 {player.club}
                        </p>
                        <p className="text-[11px] text-[#707072] mt-0.5">
                          최근 기록: {player.recentEvent}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleSelectMyPlayer(player)}
                      className="btn-primary text-xs py-2 px-4 whitespace-nowrap bg-[#111111] hover:bg-[#d30005] transition-colors"
                    >
                      <UserCheck size={14} /> 이 선수로 연동 선택
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-[#cacacb] pt-4 flex justify-end">
              <button onClick={() => setIsSearchingPlayer(false)} className="btn-secondary px-6">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: MEMO EDITOR (실전 메모 작성 창) */}
      {isEditingMemo !== null && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 border-2 border-[#111111] space-y-6 relative shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#cacacb] pb-3">
              <h3 className="font-display-md text-2xl flex items-center gap-2">
                <Edit3 size={20} /> 실전 전술 일지 & 유튜브 기록
              </h3>
              <button onClick={() => setIsEditingMemo(null)} className="btn-icon-circle">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#111111] block mb-1">
                  1. 이 경기에서 무엇을 배웠나요? (상대방 약점, 파트너 피드백 등)
                </label>
                <textarea 
                  rows={4}
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                  placeholder="예: 상대 전위가 드롭이 강함. 후반에 드라이브 승부로 역전 성공!"
                  className="w-full p-3 border border-[#cacacb] rounded-lg text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#111111] block mb-1">
                  2. 유튜브 경기 영상 링크 (선택사항)
                </label>
                <input 
                  type="text"
                  value={videoText}
                  onChange={(e) => setVideoText(e.target.value)}
                  placeholder="https://youtu.be/..."
                  className="w-full p-3 border border-[#cacacb] rounded-lg text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => saveMemo(isEditingMemo)} className="btn-primary flex-1 justify-center">
                <CheckCircle2 size={16} /> Supabase DB에 영구 저장
              </button>
              <button onClick={() => setIsEditingMemo(null)} className="btn-secondary px-6">
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. NIKE FOOTER */}
      <footer className="bg-[#111111] text-white border-t border-[#39393b] mt-16 px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white text-[#111111] w-6 h-6 rounded-full flex items-center justify-center font-black text-xs">
                MD
              </div>
              <span className="font-display-md text-xl">MINTON DIARY</span>
            </div>
            <p className="text-xs text-[#9e9ea0]">
              Powered by Nike Athletic Editorial Design System & Supabase Cloud.<br />
              전남동호인 급수현황(netsystem) 및 BKPLAY(sfa.bkplay.kr) 자동 동기화 엔진 탑재.
            </p>
          </div>
          
          <div className="flex gap-8 text-xs text-[#9e9ea0]">
            <div>
              <p className="font-bold text-white mb-2">DATA SOURCES</p>
              <p className="hover:text-white cursor-pointer">BKPLAY Official API</p>
              <p className="hover:text-white cursor-pointer mt-1">Netsystem Jeonnam</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">MY CLOUD</p>
              <p className="hover:text-white cursor-pointer">Supabase DB Sync</p>
              <p className="hover:text-white cursor-pointer mt-1">Export Excel / CSV</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
