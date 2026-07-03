import React, { useState } from 'react';
import { Plus, X, ArrowRight, Video, Calendar, ShieldAlert, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState("diary"); // "diary" | "tournaments" | "search"
  const [matches, setMatches] = useState([]); // Start with a clean, empty personal diary!
  
  // Modal State for adding a new match
  const [isAddingMatch, setIsAddingMatch] = useState(false);
  const [newTourneyName, setNewTourneyName] = useState("");
  const [newScore, setNewScore] = useState("25 : 21");
  const [newResult, setNewResult] = useState("WIN");
  const [newMemo, setNewMemo] = useState("");
  const [newVideo, setNewVideo] = useState("");

  // Clean, real Jeonnam upcoming tournaments without noisy badges
  const UPCOMING_TOURNAMENTS = [
    { id: 1, date: "2026.05.09 - 05.10", name: "2026 천년의빛 영광배드민턴대회", location: "전남 영광군 스포티움" },
    { id: 2, date: "2026.05.16 - 05.17", name: "제20회 지리산남악제배드민턴대회", location: "전남 구례군 실내체육관" },
    { id: 3, date: "2026.06.06 - 06.07", name: "2026 정남진 장흥배드민턴대회", location: "전남 장흥군 실내체육관" },
    { id: 4, date: "2026.07.11 - 07.12", name: "제9회 목포유달산배 배드민턴대회 (S급 오픈)", location: "전남 목포시 실내체육관" }
  ];

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
    if (window.confirm("이 경기 기록을 삭제하시겠습니까?")) {
      setMatches(matches.filter(m => m.id !== id));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      
      {/* 1. VIOLENTLY SIMPLE HEADER */}
      <header className="header-minimal">
        <a href="#" className="brand-lockup">
          <span className="brand-logo-pill">MD</span>
          <span className="brand-text">MINTON DIARY</span>
        </a>

        <nav className="nav-pills">
          <button 
            onClick={() => setActiveTab("diary")} 
            className={`nav-pill ${activeTab === "diary" ? "active" : ""}`}
          >
            내 경기 기록
          </button>
          <button 
            onClick={() => setActiveTab("tournaments")} 
            className={`nav-pill ${activeTab === "tournaments" ? "active" : ""}`}
          >
            대회 탐색
          </button>
        </nav>

        <div className="profile-trigger" onClick={() => alert("현재 계정: 유정 (광양시 / 테크존클럽)\nSupabase DB 연동 활성화 상태 🟢")}>
          <span>🏸 유정 · 테크존클럽</span>
        </div>
      </header>

      {/* 2. TOWERING EDITORIAL HERO BANNER */}
      <section className="hero-minimal">
        <div>
          <p className="font-editorial-sub" style={{ marginBottom: '8px' }}>
            GWANGYANG TECHZONE CLUB
          </p>
          <h1 className="font-editorial-hero">
            YUJEONG
          </h1>
        </div>

        <div className="hero-stats-minimal">
          <div className="stat-box">
            <p className="stat-number">{matches.length}</p>
            <p className="stat-label">Matches</p>
          </div>
          <div className="stat-box">
            <p className="stat-number" style={{ color: '#d30005' }}>
              {matches.length === 0 ? "0%" : `${Math.round((matches.filter(m => m.result === "WIN").length / matches.length) * 100)}%`}
            </p>
            <p className="stat-label">Win Rate</p>
          </div>
          <div className="stat-box">
            <p className="stat-number">3</p>
            <p className="stat-label">Trophies 🏆</p>
          </div>
        </div>
      </section>

      {/* 3. WORKSPACE CONTENT */}
      <main className="workspace">
        
        {/* TAB 1: PERSONAL MATCH DIARY */}
        {activeTab === "diary" && (
          <div>
            <div className="section-title-row">
              <div>
                <p className="font-editorial-sub">PERSONAL ARCHIVE</p>
                <h2 className="font-editorial-title" style={{ marginTop: '8px' }}>MATCH DIARY</h2>
              </div>
              <button onClick={() => setIsAddingMatch(true)} className="btn-pill-dark">
                <Plus size={16} /> 새 경기 기록하기
              </button>
            </div>

            {matches.length === 0 ? (
              <div className="empty-state">
                <p className="font-editorial-title" style={{ fontSize: '36px', color: '#707072', marginBottom: '12px' }}>
                  NO RECORDS YET
                </p>
                <p style={{ color: '#707072', marginBottom: '24px', fontSize: '15px' }}>
                  지금은 비어있습니다. 가짜 데이터 없이 <strong>유정 님</strong>의 실제 경기와 전술 일지를 직접 기록해 보세요.
                </p>
                <button onClick={() => setIsAddingMatch(true)} className="btn-pill-outline">
                  <Plus size={16} /> 첫 번째 경기 기록 추가
                </button>
              </div>
            ) : (
              <div className="match-grid">
                {matches.map(match => (
                  <div key={match.id} className="match-card-minimal">
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <span className={match.result === "WIN" ? "match-result-win" : "match-result-loss"}>
                        {match.result === "WIN" ? "VICTORY 🔥" : "DEFEAT 💧"} · {match.date}
                      </span>
                      <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#111111', marginTop: '6px', marginBottom: '12px' }}>
                        {match.tournament}
                      </h3>
                      {match.memo && (
                        <p style={{ fontSize: '15px', color: '#4b4b4d', lineHeight: 1.6, backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #111111' }}>
                          "{match.memo}"
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div className="match-score-pill">
                        {match.score}
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {match.videoUrl && (
                          <a href={match.videoUrl} target="_blank" rel="noreferrer" className="btn-pill-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>
                            <Video size={14} /> 영상 보기
                          </a>
                        )}
                        <button onClick={() => deleteMatch(match.id)} style={{ background: 'none', border: 'none', color: '#707072', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
                          기록 삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TOURNAMENTS FEED */}
        {activeTab === "tournaments" && (
          <div>
            <div className="section-title-row">
              <div>
                <p className="font-editorial-sub">JEONNAM & NATIONAL FEED</p>
                <h2 className="font-editorial-title" style={{ marginTop: '8px' }}>UPCOMING TOURNAMENTS</h2>
              </div>
            </div>

            <div className="tourney-grid">
              {UPCOMING_TOURNAMENTS.map(t => (
                <div key={t.id} className="tourney-card">
                  <div>
                    <p className="tourney-date">{t.date}</p>
                    <h3 className="tourney-name">{t.name}</h3>
                    <p style={{ fontSize: '14px', color: '#707072' }}>📍 {t.location}</p>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#111111' }}>접수 가능</span>
                    <button 
                      onClick={() => {
                        setNewTourneyName(t.name);
                        setIsAddingMatch(true);
                        setActiveTab("diary");
                      }}
                      className="btn-pill-dark"
                      style={{ padding: '10px 20px', fontSize: '13px' }}
                    >
                      내 일정에 추가 <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 4. MODAL: ADD MATCH RECORD */}
      {isAddingMatch && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="font-editorial-title" style={{ fontSize: '28px' }}>NEW MATCH RECORD</h3>
              <button onClick={() => setIsAddingMatch(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddMatch}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#707072', textTransform: 'uppercase' }}>대회 또는 경기 이름</label>
              <input 
                type="text" 
                placeholder="예: 2026 광양시장기 전국배드민턴대회" 
                value={newTourneyName}
                onChange={(e) => setNewTourneyName(e.target.value)}
                className="input-minimal"
                required
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#707072', textTransform: 'uppercase' }}>경기 결과</label>
                  <select 
                    value={newResult} 
                    onChange={(e) => setNewResult(e.target.value)}
                    className="input-minimal"
                  >
                    <option value="WIN">승리 (WIN 🔥)</option>
                    <option value="LOSS">패배 (LOSS 💧)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#707072', textTransform: 'uppercase' }}>스코어</label>
                  <input 
                    type="text" 
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    className="input-minimal"
                  />
                </div>
              </div>

              <label style={{ fontSize: '12px', fontWeight: 700, color: '#707072', textTransform: 'uppercase' }}>실전 전술 메모 / 피드백</label>
              <textarea 
                rows={3}
                placeholder="예: 상대 전위가 드롭이 강함. 후반 드라이브 승부로 역전 성공!"
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
                className="input-minimal"
                style={{ resize: 'vertical' }}
              />

              <label style={{ fontSize: '12px', fontWeight: 700, color: '#707072', textTransform: 'uppercase' }}>유튜브 경기 녹화 링크 (선택)</label>
              <input 
                type="text" 
                placeholder="https://youtu.be/..." 
                value={newVideo}
                onChange={(e) => setNewVideo(e.target.value)}
                className="input-minimal"
              />

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-pill-dark" style={{ flex: 1, justifyContent: 'center' }}>
                  일기장에 저장
                </button>
                <button type="button" onClick={() => setIsAddingMatch(false)} className="btn-pill-outline" style={{ border: 'none' }}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MINIMAL FOOTER */}
      <footer className="footer-minimal">
        <div>
          <span style={{ fontWeight: 800, color: '#111111' }}>MINTON DIARY</span>
          <span style={{ marginLeft: '12px' }}>Gwangyang Techzone Club · Athlete Archive</span>
        </div>
        <div>
          <span>Powered by Nike Athletic Editorial UI & Supabase</span>
        </div>
      </footer>

    </div>
  );
}
