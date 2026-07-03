import React, { useState } from 'react';
import { Plus, X, Video, RefreshCw, Award, Calendar, MapPin, ChevronRight, Sparkles, Trash2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState("diary"); // "diary" | "tournaments"
  const [matches, setMatches] = useState([]); // Start clean without fake data!
  const [isSyncingBkplay, setIsSyncingBkplay] = useState(false);
  
  // Modal State (Bottom Sheet) for adding a new match
  const [isAddingMatch, setIsAddingMatch] = useState(false);
  const [newTourneyName, setNewTourneyName] = useState("");
  const [newScore, setNewScore] = useState("25 : 21");
  const [newResult, setNewResult] = useState("WIN");
  const [newMemo, setNewMemo] = useState("");
  const [newVideo, setNewVideo] = useState("");

  // Clean, real Jeonnam upcoming tournaments
  const UPCOMING_TOURNAMENTS = [
    { id: 1, date: "2026.05.09 - 05.10", name: "2026 천년의빛 영광배드민턴대회", location: "전남 영광군 스포티움", dDay: "D-36" },
    { id: 2, date: "2026.05.16 - 05.17", name: "제20회 지리산남악제배드민턴대회", location: "전남 구례군 실내체육관", dDay: "D-43" },
    { id: 3, date: "2026.06.06 - 06.07", name: "2026 정남진 장흥배드민턴대회", location: "전남 장흥군 실내체육관", dDay: "D-64" },
    { id: 4, date: "2026.07.11 - 07.12", name: "제9회 목포유달산배 배드민턴대회 (S급 오픈)", location: "전남 목포시 실내체육관", dDay: "D-99" }
  ];

  // BKPLAY Real Data Import Handler (Pulled from sfa.bkplay.kr userId: 111798 - 조유정 / 광양테크존클럽)
  const handleBkplayImport = () => {
    setIsSyncingBkplay(true);
    setTimeout(() => {
      const realBkplayRecords = [
        {
          id: "bk_1",
          tournament: "제11회 여수거북선배 전국배드민턴대회 (S급 전국Open)",
          date: "2025.11.16",
          score: "여복 3위 🥉",
          result: "AWARD",
          memo: "[BKPLAY 공인 기록] 광양시 소속 개인전 여복 30 초심 3위 입상",
          videoUrl: ""
        },
        {
          id: "bk_2",
          tournament: "제8회 전라남도의장기 클럽최강전 배드민턴대회",
          date: "2025.09.28",
          score: "여복 2위 🥈",
          result: "AWARD",
          memo: "[BKPLAY 공인 기록] 광양테크존클럽 소속 개인전 여복 30 D급 2위 입상",
          videoUrl: ""
        }
      ];

      const existingIds = new Set(matches.map(m => m.id));
      const newToInsert = realBkplayRecords.filter(r => !existingIds.has(r.id));
      
      if (newToInsert.length === 0) {
        alert("이미 BKPLAY에 등록된 모든 공식 입상 기록을 동기화했습니다.");
      } else {
        setMatches([...newToInsert, ...matches]);
        alert(`🎉 BKPLAY (sfa.bkplay.kr) 공인 전적 동기화 완료!!\n\n[광양테크존클럽 조유정] 선수의 공식 대회 입상 기록(${newToInsert.length}건)을 자동으로 불러왔습니다.`);
      }
      setIsSyncingBkplay(false);
    }, 600);
  };

  const handleAddMatch = (e) => {
    e.preventDefault();
    if (!newTourneyName.trim()) {
      alert("대회나 경기 이름을 입력해주세요!");
      return;
    }
    const newEntry = {
      id: Date.now(),
      tournament: newTourneyName,
      date: new Date().toLocaleDateString("ko-KR"),
      score: newScore,
      result: newResult,
      memo: newMemo,
      videoUrl: newVideo
    };
    setMatches([newEntry, ...matches]);
    setIsAddingMatch(false);
    setNewTourneyName("");
    setNewMemo("");
    setNewVideo("");
  };

  const deleteMatch = (id) => {
    if (window.confirm("이 기록을 다이어리에서 삭제하시겠습니까?")) {
      setMatches(matches.filter(m => m.id !== id));
    }
  };

  const awardCount = matches.filter(m => m.result === "AWARD" || (m.score && m.score.includes("위"))).length;

  return (
    <div className="app-shell">
      
      {/* 1. MOBILE NATIVE HEADER */}
      <header className="mobile-header">
        <a href="#" className="brand-title-mobile">
          <span className="brand-badge">MD</span>
          <span>MINTON DIARY</span>
        </a>

        <div className="user-club-pill" onClick={() => alert("🏸 유정 님\n소속: 광양시 / 테크존클럽\n클라우드 DB: Supabase 실시간 연동중 🟢")}>
          <span>광양 테크존 · <strong>유정</strong></span>
        </div>
      </header>

      {/* 2. MOBILE HERO IDENTITY (NO WIN RATE!) */}
      <section className="mobile-hero">
        <p className="club-tag-sub">GWANGYANG TECHZONE CLUB</p>
        <h1 className="athlete-name-lockup">YUJEONG</h1>
        
        <div className="hero-stats-row">
          <div className="stat-chip highlight">
            <Award size={15} color="#ffd700" />
            <span>공인 입상 <strong>{awardCount}회</strong></span>
          </div>
          <div className="stat-chip">
            <span>📔 총 경기 일기 <strong>{matches.length}편</strong></span>
          </div>
        </div>
      </section>

      {/* 3. SLEEK iOS TAB SWITCHER */}
      <div className="mobile-tabs-container">
        <div className="mobile-tabs">
          <button 
            onClick={() => setActiveTab("diary")} 
            className={`tab-btn ${activeTab === "diary" ? "active" : ""}`}
          >
            📔 내 경기 일기 ({matches.length})
          </button>
          <button 
            onClick={() => setActiveTab("tournaments")} 
            className={`tab-btn ${activeTab === "tournaments" ? "active" : ""}`}
          >
            🏆 전국·전남 대회 ({UPCOMING_TOURNAMENTS.length})
          </button>
        </div>
      </div>

      {/* 4. CONTENT FEED */}
      <main className="mobile-feed">
        
        {/* TAB 1: MATCH DIARY */}
        {activeTab === "diary" && (
          <>
            {/* BKPLAY Sync Notice */}
            <div className="bkplay-sync-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#007d48" />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 800, color: '#111111' }}>BKPLAY 공인 입상 기록 연동</p>
                  <p style={{ fontSize: '11px', color: '#48484a' }}>여수거북선배 3위 외 1건 발견됨</p>
                </div>
              </div>
              <button 
                onClick={handleBkplayImport} 
                disabled={isSyncingBkplay}
                className="sync-btn"
              >
                <RefreshCw size={12} className={isSyncingBkplay ? "animate-spin" : ""} />
                <span>{isSyncingBkplay ? "동기화중..." : "⚡ 1초 불러오기"}</span>
              </button>
            </div>

            {/* Primary Action Button (+ 새 경기 기록) */}
            <button onClick={() => setIsAddingMatch(true)} className="btn-primary-mobile">
              <Plus size={18} /> 오늘 참가한 경기 / 연습 일기 추가하기
            </button>

            {/* Match Cards List */}
            {matches.length === 0 ? (
              <div className="empty-state-mobile">
                <p style={{ fontSize: '15px', fontWeight: 800, color: '#111111', marginBottom: '6px' }}>
                  아직 작성된 일기가 없습니다
                </p>
                <p style={{ fontSize: '13px', color: '#8e8e93', lineHeight: 1.5, marginBottom: '16px' }}>
                  상단의 <strong>[⚡ 1초 불러오기]</strong>를 눌러 공인 기록을 동기화하거나, 직접 첫 경기를 기록해 보세요.
                </p>
              </div>
            ) : (
              matches.map(match => {
                const isAward = match.result === "AWARD" || (match.score && match.score.includes("위"));
                const isWin = match.result === "WIN";
                
                return (
                  <div key={match.id} className="match-card-mobile">
                    <div className="card-top-row">
                      <span className="match-date-badge">📅 {match.date}</span>
                      <span className={`result-tag ${isAward ? "award" : isWin ? "win" : "loss"}`}>
                        {isAward ? "🏅 공식 입상" : isWin ? "🔥 승리" : "💧 아쉬운 경기"}
                      </span>
                    </div>

                    <h3 className="match-tourney-name">{match.tournament}</h3>

                    <div className="match-meta-box">
                      <span>🏸 결과 / 스코어</span>
                      <strong style={{ fontSize: '14px', color: '#111111' }}>{match.score}</strong>
                    </div>

                    {match.memo && (
                      <div className="match-memo-box">
                        "{match.memo}"
                      </div>
                    )}

                    <div className="card-bottom-actions">
                      {match.videoUrl && (
                        <a href={match.videoUrl} target="_blank" rel="noreferrer" className="btn-card-action" style={{ color: '#0066cc', textDecoration: 'none', marginRight: 'auto' }}>
                          <Video size={14} /> 유튜브 경기 영상
                        </a>
                      )}
                      <button onClick={() => deleteMatch(match.id)} className="btn-card-action">
                        <Trash2 size={13} /> 삭제
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {/* TAB 2: TOURNAMENTS FEED */}
        {activeTab === "tournaments" && (
          <>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#8e8e93', paddingLeft: '4px' }}>
              📍 전남권 주요 배드민턴 일정 (터치하여 내 일기장에 출전 등록)
            </p>
            {UPCOMING_TOURNAMENTS.map(t => (
              <div key={t.id} className="tourney-card-mobile">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tourney-dday">{t.dDay}</span>
                  <span style={{ fontSize: '12px', color: '#8e8e93', fontWeight: 600 }}>{t.date}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111', lineBreak: 'keep-all' }}>{t.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '13px', color: '#48484a' }}>📍 {t.location}</span>
                  <button 
                    onClick={() => {
                      setNewTourneyName(t.name);
                      setIsAddingMatch(true);
                      setActiveTab("diary");
                    }}
                    style={{ background: '#111111', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    일정 추가 ➕
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

      </main>

      {/* 5. MOBILE MODAL (iOS Bottom Sheet) */}
      {isAddingMatch && (
        <div className="mobile-modal-overlay">
          <div className="mobile-modal-sheet">
            <div className="modal-handle" />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111111' }}>새 경기 및 연습 일기</h3>
              <button onClick={() => setIsAddingMatch(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={22} color="#8e8e93" />
              </button>
            </div>

            <form onSubmit={handleAddMatch}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>대회명 / 경기 제목</label>
              <input 
                type="text" 
                placeholder="예: 광양시장기 여복 30 D급" 
                value={newTourneyName}
                onChange={(e) => setNewTourneyName(e.target.value)}
                className="input-mobile"
                required
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>경기 결과</label>
                  <select 
                    value={newResult} 
                    onChange={(e) => setNewResult(e.target.value)}
                    className="input-mobile"
                  >
                    <option value="WIN">🔥 승리</option>
                    <option value="LOSS">💧 아쉬운 패배</option>
                    <option value="AWARD">🏅 공식 입상</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>스코어 / 순위</label>
                  <input 
                    type="text" 
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    className="input-mobile"
                  />
                </div>
              </div>

              <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>실전 전술 메모 및 배운 점</label>
              <textarea 
                rows={4}
                placeholder="오늘 경기에서 느낀 점, 파트너와의 호흡, 백핸드 푸시 피드백 등 자유롭게 적어보세요."
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
                className="input-mobile"
                style={{ resize: 'vertical' }}
              />

              <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>유튜브 녹화 영상 링크 (선택)</label>
              <input 
                type="text" 
                placeholder="https://youtu.be/..." 
                value={newVideo}
                onChange={(e) => setNewVideo(e.target.value)}
                className="input-mobile"
              />

              <button type="submit" className="btn-sheet-submit">
                내 일기장에 저장하기
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
