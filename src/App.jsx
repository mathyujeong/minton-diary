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
  const [activeTab, setActiveTab] = useState("diary");
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [myProfile, setMyProfile] = useState(FEDERATION_PLAYERS_DB[0]);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [isEditingMemo, setIsEditingMemo] = useState(null);
  const [memoText, setMemoText] = useState("");
  const [videoText, setVideoText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [filterResult, setFilterResult] = useState("ALL");
  
  // Player Search Modal State
  const [isSearchingPlayer, setIsSearchingPlayer] = useState(false);
  const [playerSearchKeyword, setPlayerSearchKeyword] = useState("테크존");

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
    <div className="app-container">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="top-utility-bar">
        <div className="top-bar-left">
          <span className="live-dot"></span>
          <span>연동 클럽: <strong>{myProfile.club}</strong> | 선수명: <strong>{myProfile.name}</strong></span>
          <span className="badge-dark" style={{ fontSize: '10px', padding: '2px 8px' }}>공식 DB 연동중</span>
        </div>
        <div className="top-bar-right">
          <button 
            onClick={() => { setIsSearchingPlayer(true); setPlayerSearchKeyword("테크존"); }}
            className="btn-sale"
            style={{ padding: '6px 14px', fontSize: '12px' }}
          >
            <SearchCode size={13} /> 내 클럽/선수 변경 및 검색
          </button>
          <button onClick={handleTriggerSync} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', border: 'none', background: 'transparent' }}>
            <RefreshCw size={12} className={isSyncing ? "animate-spin text-[#007d48]" : ""} />
            <span>{isSyncing ? "데이터 불러오는 중..." : "동기화 갱신"}</span>
          </button>
          <span>DB: SUPABASE CLOUD</span>
        </div>
      </div>

      {/* 2. PRIMARY NAV BAR */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo-box">
            MD
          </div>
          <div>
            <h1 className="brand-title">
              민턴일기장 <span style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#707072', marginLeft: '6px' }}>MINTON DIARY</span>
            </h1>
            <p className="brand-subtitle">Nike Athletic Editorial UI</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
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
                  <span className="pill-count">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Search Pill */}
        <div className="search-pill-box">
          <Search size={16} color="#707072" style={{ marginLeft: '4px', marginRight: '4px' }} />
          <input 
            type="text" 
            placeholder="선수, 대회, 클럽 검색..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#707072' }}>
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      {/* 3. HERO ATHLETIC BILLBOARD */}
      <section className="hero-section">
        <div className="hero-content">
          <div>
            <div className="hero-tags">
              <span className="badge-red">
                PRO ATHLETE DASHBOARD
              </span>
              <span className="badge-dark">
                {myProfile.club}
              </span>
              <button 
                onClick={() => { setIsSearchingPlayer(true); setPlayerSearchKeyword("테크존"); }}
                style={{ background: 'none', border: 'none', color: '#f5f5f5', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
              >
                (클럽/선수 변경)
              </button>
            </div>
            <h2 className="font-display-hero">
              {myProfile.name}'S <br />
              <span style={{ color: '#f5f5f5', opacity: 0.9 }}>BATTLE RECORD</span>
            </h2>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-item">
              <p className="stat-label">Win Rate</p>
              <p className="stat-val-green">{myProfile.winRate}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Tourneys</p>
              <p className="stat-val-white">{myProfile.tourneysPlayed}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Trophies</p>
              <p className="stat-val-gold">{myProfile.trophies} 🏆</p>
            </div>
          </div>
        </div>
        <div className="hero-bg-text">
          TECHZONE
        </div>
      </section>

      {/* 4. MAIN CONTENT WORKSPACE */}
      <main className="main-workspace">
        
        {/* TAB 1: MATCH DIARY */}
        {activeTab === "diary" && !selectedOpponent && (
          <div>
            <div className="section-header-row">
              <div>
                <h3 className="font-display-md" style={{ fontSize: '28px', color: '#111111' }}>RECENT & UPCOMING MATCHES</h3>
                <p className="section-desc">
                  <strong>[{myProfile.club}]</strong> 소속 <strong>{myProfile.name}</strong> 선수의 공식 출전 일정과 실전 전술 일지입니다.
                </p>
              </div>

              {/* Result Filter Chips */}
              <div className="filter-group">
                {["ALL", "WIN", "LOSS", "UPCOMING"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilterResult(f)}
                    className={`filter-btn ${filterResult === f ? 'active' : ''}`}
                  >
                    {f === "ALL" ? "전체 보기" : f === "WIN" ? "승리 🔥" : f === "LOSS" ? "패배 💧" : "출전 예정 📌"}
                  </button>
                ))}
              </div>
            </div>

            {/* Match Cards List */}
            <div className="match-cards-list">
              {filteredMatches.map(match => {
                const isWin = match.result === "WIN";
                const isLoss = match.result === "LOSS";
                const isUpcoming = match.result === "UPCOMING";

                return (
                  <div key={match.id} className="match-card">
                    <div className="match-card-main">
                      
                      {/* Left: Tournament & Match Info */}
                      <div className="match-info">
                        <div className="match-tags">
                          <span className={isWin ? "badge-win" : isLoss ? "badge-loss" : "badge-upcoming"}>
                            {isWin ? "WIN 🔥" : isLoss ? "LOSS 💧" : "D-DAY UPCOMING 📌"}
                          </span>
                          <span className="match-meta-text">
                            <Calendar size={13} /> {match.date} | {match.location}
                          </span>
                        </div>
                        <h4 className="match-title">{match.tournament}</h4>
                        <p className="match-event-pill">
                          종목: {match.event}
                        </p>
                      </div>

                      {/* Center: Team vs Opponent Score */}
                      <div className="score-box">
                        <div className="score-team">
                          <p className="score-label">MY TEAM</p>
                          <p className="score-name">{match.myTeam}</p>
                        </div>
                        
                        <div className="score-display">
                          {match.score}
                        </div>

                        <div className="score-opp">
                          <p className="score-label">OPPONENT</p>
                          <button 
                            onClick={() => setSelectedOpponent(OPPONENT_DATABASE[match.opponentId])}
                            className="score-opp-btn"
                          >
                            <span>{match.opponentTeam}</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="match-actions">
                        <button 
                          onClick={() => openMemoModal(match)}
                          className="btn-primary"
                        >
                          <Edit3 size={14} />
                          <span>{match.hasMemo ? "비밀 일지 수정" : "+ 실전 메모 추가"}</span>
                        </button>
                        <button 
                          onClick={() => setSelectedOpponent(OPPONENT_DATABASE[match.opponentId])}
                          className="btn-secondary"
                        >
                          <ShieldAlert size={14} color="#d30005" />
                          <span>상대 스카우팅</span>
                        </button>
                      </div>
                    </div>

                    {/* Secret Tactical Note Display */}
                    {match.memo && (
                      <div className="tactical-note-box">
                        <div className="tactical-note-header">
                          <div className="tactical-title">
                            <Sparkles size={14} color="#d30005" />
                            <span>MY TACTICAL DIARY & FEEDBACK</span>
                          </div>
                          {match.videoUrl && (
                            <a 
                              href={match.videoUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="tactical-video-link"
                            >
                              <Video size={13} /> 경기 녹화 유튜브 보기
                            </a>
                          )}
                        </div>
                        <p className="tactical-content">
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

        {/* TAB 2: TOURNAMENTS FEED */}
        {activeTab === "tournaments" && !selectedOpponent && (
          <div>
            <div className="section-header-row">
              <div>
                <h3 className="font-display-md" style={{ fontSize: '28px', color: '#111111' }}>NATIONAL TOURNAMENTS FEED</h3>
                <p className="section-desc">넷시스템 및 BKPLAY에서 실시간 수집되는 전국 동호인 배드민턴 일정입니다. 출전 버튼을 눌러 일기장에 연동하세요.</p>
              </div>
            </div>

            <div className="grid-2col">
              {TOURNAMENTS_FEED.map(t => (
                <div key={t.id} className="feed-card">
                  <div>
                    <div className="feed-header">
                      <span className="dday-badge">
                        {t.dDay}
                      </span>
                      <span className={t.status === '접수중' ? 'status-badge-red' : 'status-badge-white'}>
                        {t.status}
                      </span>
                    </div>
                    <h4 className="feed-title">{t.name}</h4>
                    <p className="feed-meta">
                      <Calendar size={14} /> 기간: {t.date}
                    </p>
                    <p className="feed-meta">
                      <MapPin size={14} /> 장소: {t.location}
                    </p>
                  </div>

                  <div className="feed-actions">
                    <button 
                      onClick={() => {
                        alert(`📌 [${t.name}] 일정을 내 경기 다이어리에 추가했습니다!\n대진표가 발표되면 자동으로 코트 번호와 상대방을 긁어옵니다.`);
                        setActiveTab("diary");
                      }} 
                      className="btn-primary"
                      style={{ flex: 1 }}
                    >
                      <Plus size={14} /> 내 일기장에 연동하기
                    </button>
                    <a 
                      href="https://netsystem.co.kr:8081/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-secondary"
                      style={{ textDecoration: 'none' }}
                    >
                      요강 확인 <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SCOUTING DIRECTORY */}
        {activeTab === "scouting" && !selectedOpponent && (
          <div>
            <div className="section-header-row">
              <div>
                <h3 className="font-display-md" style={{ fontSize: '28px', color: '#111111' }}>OPPONENT SCOUTING DATABASE</h3>
                <p className="section-desc">과거 대결했던 상대방들의 플레이 스타일과 내 비밀 약점 분석 노트를 확인하세요.</p>
              </div>
            </div>

            <div className="grid-3col">
              {Object.entries(OPPONENT_DATABASE).map(([id, opp]) => (
                <div 
                  key={id} 
                  onClick={() => setSelectedOpponent(opp)}
                  className="scout-card"
                >
                  <div className="scout-top">
                    <div className="scout-avatar">
                      {opp.name[0]}
                    </div>
                    <span className="scout-winrate">
                      WIN RATE {opp.winRate}
                    </span>
                  </div>

                  <h4 className="scout-name-row">
                    <span>{opp.name} 선수의 카드</span>
                    <ChevronRight size={18} />
                  </h4>
                  <p className="scout-sub">{opp.club} | {opp.grade}</p>

                  <div className="scout-body">
                    <p className="scout-style">⚡ 플레이 스타일: {opp.playStyle}</p>
                    <p className="scout-note-preview">" {opp.scoutingNote.replace("🚨 비밀 스카우팅 노트: ", "")} "</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE & CLUB SETTINGS */}
        {activeTab === "profile" && !selectedOpponent && (
          <div className="profile-panel">
            <div className="section-header-row">
              <div>
                <h3 className="font-display-md" style={{ fontSize: '28px', color: '#111111' }}>MY CLUB & PLAYER LINKING</h3>
                <p className="section-desc">내가 소속된 클럽과 이름을 공식 배드민턴 연합회 DB에서 검색하여 직접 연동할 수 있습니다.</p>
              </div>
              <button 
                onClick={() => { setIsSearchingPlayer(true); setPlayerSearchKeyword("테크존"); }}
                className="btn-sale"
              >
                <SearchCode size={15} /> 🔍 선수 / 클럽 검색해서 연동 변경하기
              </button>
            </div>

            <div className="profile-form-box">
              <div className="profile-active-player">
                <div className="brand-logo-box" style={{ width: '56px', height: '56px', fontSize: '24px' }}>
                  {myProfile.name[0]}
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#007d48', color: '#ffffff', padding: '4px 10px', borderRadius: '9999px' }}>
                    현재 연결된 공식 선수
                  </span>
                  <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#111111', marginTop: '6px' }}>{myProfile.name} 님</h4>
                  <p style={{ fontSize: '14px', color: '#707072', fontWeight: 600 }}>{myProfile.club}</p>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">선수 이름</label>
                  <input 
                    type="text" 
                    value={myProfile.name} 
                    onChange={(e) => setMyProfile({ ...myProfile, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">소속 클럽 / 지역</label>
                  <input 
                    type="text" 
                    value={myProfile.club} 
                    onChange={(e) => setMyProfile({ ...myProfile, club: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div>
                  <label className="form-label">출생년도</label>
                  <input 
                    type="text" 
                    value={myProfile.birthYear} 
                    onChange={(e) => setMyProfile({ ...myProfile, birthYear: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">주 급수 (Grade 1)</label>
                  <input 
                    type="text" 
                    value={myProfile.grade1} 
                    onChange={(e) => setMyProfile({ ...myProfile, grade1: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">세부 급수 (Grade 2)</label>
                  <input 
                    type="text" 
                    value={myProfile.grade2} 
                    onChange={(e) => setMyProfile({ ...myProfile, grade2: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  onClick={() => { setIsSearchingPlayer(true); setPlayerSearchKeyword("테크존"); }}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  <SearchCode size={16} /> 공식 선수 DB 다시 검색하기
                </button>
                <button 
                  onClick={handleTriggerSync}
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  <RefreshCw size={16} /> 변경된 소속 데이터 동기화
                </button>
              </div>
            </div>

            <div className="cloud-status-box">
              <h4 className="cloud-title">
                <CheckCircle2 color="#1eaa52" size={20} /> Supabase 클라우드 데이터베이스 연결 상태
              </h4>
              <p className="cloud-text">
                계정 연동 완료: `techzone@minton-diary.supabase.co` <br />
                <strong>[광양시 테크존클럽]</strong> 소속 경기 데이터 및 비밀 전술 일지가 실시간으로 영구 백업되고 있습니다.
              </p>
            </div>
          </div>
        )}

        {/* 5. OPPONENT DETAILED SCOUTING VIEW */}
        {selectedOpponent && (
          <div className="opponent-detail-panel">
            <button 
              onClick={() => setSelectedOpponent(null)}
              className="btn-icon-circle"
              style={{ position: 'absolute', top: '24px', right: '24px', background: '#ffffff' }}
            >
              <X size={20} />
            </button>

            <div className="opponent-header-row">
              <div className="opponent-avatar-lg">
                {selectedOpponent.name[0]}
              </div>
              <div>
                <span className="badge-dark" style={{ fontSize: '11px' }}>
                  OPPONENT SCOUTING REPORT
                </span>
                <h3 className="font-display-md" style={{ fontSize: '36px', marginTop: '6px' }}>{selectedOpponent.name} 선수</h3>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#707072' }}>{selectedOpponent.club} | {selectedOpponent.grade}</p>
              </div>
            </div>

            <div className="scout-grid-2">
              {/* Official Stats pulled from API */}
              <div className="scout-stat-box">
                <h4 className="scout-box-title">
                  <Activity size={16} /> 공식 대회 데이터 (BKPLAY 연동)
                </h4>
                <div>
                  <div className="scout-row">
                    <span className="scout-row-label">공식 통계 승률:</span>
                    <span className="scout-row-val" style={{ color: '#1eaa52', fontSize: '18px' }}>{selectedOpponent.winRate}</span>
                  </div>
                  <div className="scout-row">
                    <span className="scout-row-label">주요 플레이 스타일:</span>
                    <span className="scout-row-val">{selectedOpponent.playStyle}</span>
                  </div>
                  <div className="scout-row">
                    <span className="scout-row-label">최근 대회 입상:</span>
                    <span className="scout-row-val" style={{ color: '#d30005' }}>{selectedOpponent.recentTourney}</span>
                  </div>
                </div>
              </div>

              {/* Secret Tactical Notes by User */}
              <div className="scout-secret-box">
                <h4 className="scout-box-title">
                  <ShieldAlert size={16} color="#d30005" /> 나의 1:1 맞춤 약점 공략 노트
                </h4>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#f5f5f5', marginBottom: '16px' }}>
                  {selectedOpponent.scoutingNote}
                </p>
                <div>
                  <button 
                    onClick={() => {
                      const newNote = prompt("이 선수에 대한 스카우팅 노트를 수정하세요:", selectedOpponent.scoutingNote);
                      if (newNote) {
                        alert("✅ Supabase 데이터베이스에 스카우팅 메모가 갱신되었습니다!");
                      }
                    }}
                    className="btn-sale"
                  >
                    <Edit3 size={12} /> 스카우팅 노트 업데이트
                  </button>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
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

      {/* 6. MODAL: PLAYER & CLUB SEARCH */}
      {isSearchingPlayer && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <span className="badge-red">
                  FEDERATION DB SEARCH
                </span>
                <h3 className="modal-title" style={{ marginTop: '6px' }}>
                  <SearchCode size={24} /> 내 클럽 및 선수 검색해서 연동하기
                </h3>
              </div>
              <button onClick={() => setIsSearchingPlayer(false)} className="btn-icon-circle">
                <X size={20} />
              </button>
            </div>

            <p className="modal-desc">
              전남동호인 급수현황(netsystem) 및 BKPLAY 공식 DB에 등록된 본인의 <strong>이름이나 클럽명</strong>을 입력하세요.
            </p>

            {/* Search Input Box */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div className="search-pill-box" style={{ flex: 1, width: 'auto', border: '2px solid #111111', background: '#f5f5f5' }}>
                <Search size={18} color="#111111" style={{ marginLeft: '8px' }} />
                <input 
                  type="text" 
                  value={playerSearchKeyword}
                  onChange={(e) => setPlayerSearchKeyword(e.target.value)}
                  placeholder="예: 테크존, 광양시, 유정, 김서연..."
                  className="search-input"
                  style={{ fontSize: '16px', fontWeight: 700, padding: '10px 8px' }}
                  autoFocus
                />
                {playerSearchKeyword && (
                  <button onClick={() => setPlayerSearchKeyword("")} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#707072', marginRight: '8px' }}>
                    <X size={16} />
                  </button>
                )}
              </div>
              <button className="btn-primary" style={{ padding: '0 24px' }}>
                검색
              </button>
            </div>

            {/* Search Results Grid */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 800, color: '#707072', textTransform: 'uppercase' }}>
                검색 결과 ({filteredPlayersDb.length}명 발견)
              </p>

              <div className="search-results-list">
                {filteredPlayersDb.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 0', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#707072' }}>검색된 선수가 없습니다.</p>
                    <p style={{ fontSize: '12px', color: '#9e9ea0', marginTop: '4px' }}>이름이나 클럽명을 다시 확인해주세요.</p>
                  </div>
                ) : (
                  filteredPlayersDb.map(player => (
                    <div key={player.id} className="player-result-row">
                      <div className="player-result-info">
                        <div className="scout-avatar" style={{ width: '44px', height: '44px', fontSize: '18px' }}>
                          {player.name[0]}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <h4 className="player-name">
                              {player.name}
                            </h4>
                            <span style={{ fontSize: '12px', fontWeight: 600, backgroundColor: '#ffffff', padding: '2px 8px', border: '1px solid #cacacb', borderRadius: '4px' }}>
                              {player.gender} · {player.birthYear}년생
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 800, backgroundColor: '#111111', color: '#ffffff', padding: '2px 8px', borderRadius: '4px' }}>
                              급수: {player.grade1}
                            </span>
                          </div>
                          <p className="player-club-tag">
                            🏸 {player.club}
                          </p>
                          <p style={{ fontSize: '11px', color: '#707072', marginTop: '2px' }}>
                            최근 기록: {player.recentEvent}
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleSelectMyPlayer(player)}
                        className="btn-primary"
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                      >
                        <UserCheck size={14} /> 이 선수로 연동 선택
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #cacacb', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsSearchingPlayer(false)} className="btn-secondary">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: MEMO EDITOR */}
      {isEditingMemo !== null && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3 className="modal-title">
                <Edit3 size={24} /> 실전 전술 일지 & 유튜브 기록
              </h3>
              <button onClick={() => setIsEditingMemo(null)} className="btn-icon-circle">
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label className="form-label" style={{ color: '#111111', marginBottom: '6px' }}>
                  1. 이 경기에서 무엇을 배웠나요? (상대방 약점, 파트너 피드백 등)
                </label>
                <textarea 
                  rows={4}
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                  placeholder="예: 상대 전위가 드롭이 강함. 후반에 드라이브 승부로 역전 성공!"
                  className="form-input"
                  style={{ fontWeight: 500 }}
                />
              </div>

              <div>
                <label className="form-label" style={{ color: '#111111', marginBottom: '6px' }}>
                  2. 유튜브 경기 영상 링크 (선택사항)
                </label>
                <input 
                  type="text"
                  value={videoText}
                  onChange={(e) => setVideoText(e.target.value)}
                  placeholder="https://youtu.be/..."
                  className="form-input"
                  style={{ fontWeight: 500 }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => saveMemo(isEditingMemo)} className="btn-primary" style={{ flex: 1 }}>
                <CheckCircle2 size={16} /> Supabase DB에 영구 저장
              </button>
              <button onClick={() => setIsEditingMemo(null)} className="btn-secondary">
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. NIKE FOOTER */}
      <footer className="app-footer">
        <div className="footer-content">
          <div>
            <div className="footer-brand-row">
              <div className="footer-logo-box">
                MD
              </div>
              <span className="font-display-md" style={{ fontSize: '20px' }}>MINTON DIARY</span>
            </div>
            <p className="footer-text">
              Powered by Nike Athletic Editorial Design System & Supabase Cloud.<br />
              전남동호인 급수현황(netsystem) 및 BKPLAY(sfa.bkplay.kr) 자동 동기화 엔진 탑재.
            </p>
          </div>
          
          <div className="footer-links-grid">
            <div>
              <p className="footer-col-title">DATA SOURCES</p>
              <a className="footer-link">BKPLAY Official API</a>
              <a className="footer-link">Netsystem Jeonnam</a>
            </div>
            <div>
              <p className="footer-col-title">MY CLOUD</p>
              <a className="footer-link">Supabase DB Sync</a>
              <a className="footer-link">Export Excel / CSV</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
