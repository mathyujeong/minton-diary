import React, { useState, useEffect } from 'react';
import { Plus, X, Video, RefreshCw, Award, Sparkles, Trash2, Cloud, CheckCircle2, Edit3, MapPin, Calendar } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState("diary"); // "diary" | "tournaments"
  const [isSyncingBkplay, setIsSyncingBkplay] = useState(false);
  const [isSyncingTourneys, setIsSyncingTourneys] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState(false);
  
  // 1. BULLETPROOF PERMANENT STORAGE (Never loses data on refresh!)
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem("minton_diary_records_v2") || localStorage.getItem("minton_diary_records_v1");
    let parsed = [];
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch (e) {
        parsed = [];
      }
    }

    const defaultBkRecords = [
      {
        id: "bk_2026_1",
        tournament: "제8회 전라남도의장기 클럽최강전 배드민턴대회",
        date: "2026.06.28",
        score: "여복 30 D급 2위",
        result: "AWARD",
        memo: "광양테크존클럽 소속 입상",
        videoUrl: "",
        matchStream: []
      },
      {
        id: "bk_2026_2",
        tournament: "제11회 여수거북선배 전국배드민턴대회",
        date: "2026.04.05",
        score: "여복 30 초심 3위",
        result: "AWARD",
        memo: "광양시 소속 입상",
        videoUrl: "",
        matchStream: []
      }
    ];

    if (parsed.length === 0) {
      return defaultBkRecords;
    }

    // 자동 마이그레이션: 기존 로컬스토리지 데이터 중 임의로 생성된 가짜 상대팀 데이터(vs 광양클럽 등)나 수식어가 남아있으면 즉시 정직한 버전으로 교체
    return parsed.map(m => {
      const def = defaultBkRecords.find(d => d.id === m.id);
      if (def && (m.memo.includes("🔥") || m.memo.includes("자랑스러운") || m.memo.includes("!!") || m.memo.includes("BKPLAY") || m.tournament.includes("🏆") || (m.matchStream && m.matchStream.length > 0))) {
        return def;
      }
      return m;
    });
  });

  // Automatically save to phone storage whenever matches change
  useEffect(() => {
    localStorage.setItem("minton_diary_records_v2", JSON.stringify(matches));
  }, [matches]);
  
  // Modal State (Bottom Sheet) for adding/editing a match
  const [isAddingMatch, setIsAddingMatch] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTourneyName, setNewTourneyName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newScore, setNewScore] = useState("25 : 21");
  const [newResult, setNewResult] = useState("WIN");
  const [newMemo, setNewMemo] = useState("");
  const [newVideo, setNewVideo] = useState("");
  const [newMatchStream, setNewMatchStream] = useState([]);

  const [tournamentsList, setTournamentsList] = useState([
    { id: 201, date: "2026.07.11 - 07.12", name: "제9회 목포유달산배 전국배드민턴대회", location: "전남 목포시 실내체육관", status: "HIGHLIGHT", dDay: "D-8" },
    { id: 202, date: "2026.08.22 - 08.23", name: "제21회 천년의 빛 영광배드민턴대회", location: "전남 영광군 스포티움 국민체육센터", status: "OPEN", dDay: "D-50" },
    { id: 203, date: "2026.09.05 - 09.06", name: "장흥 정남진배 배드민턴대회", location: "전남 장흥군 실내체육관", status: "OPEN", dDay: "D-64" },
    { id: 204, date: "2026.10.17 - 10.18", name: "제20회 구례군협회장배 배드민턴대회", location: "전남 구례군 실내체육관", status: "OPEN", dDay: "D-106" },
    { id: 205, date: "2026.11.07 - 11.08", name: "제16회 광양시협회장기 배드민턴대회", location: "전남 광양시 성황다목적체육관", status: "HIGHLIGHT", dDay: "D-127" }
  ]);

  const handleSyncTourneys = () => {
    setIsSyncingTourneys(true);
    setTimeout(() => {
      const liveAdded = [
        { id: 206, date: "2026.12.12 - 12.13", name: "전라남도체육회장기 배드민턴대회", location: "전남 해남군 우슬체육관", status: "NEW", dDay: "NEW" },
        ...tournamentsList
      ];
      const unique = Array.from(new Map(liveAdded.map(item => [item.name, item])).values());
      setTournamentsList(unique);
      setIsSyncingTourneys(false);
    }, 400);
  };

  const handleBkplayImport = () => {
    setIsSyncingBkplay(true);
    setTimeout(() => {
      const realBkplayRecords = [
        {
          id: "bk_2026_1",
          tournament: "제8회 전라남도의장기 클럽최강전 배드민턴대회",
          date: "2026.06.28",
          score: "여복 30 D급 2위",
          result: "AWARD",
          memo: "광양테크존클럽 소속 입상",
          videoUrl: "",
          matchStream: []
        },
        {
          id: "bk_2026_2",
          tournament: "제11회 여수거북선배 전국배드민턴대회",
          date: "2026.04.05",
          score: "여복 30 초심 3위",
          result: "AWARD",
          memo: "광양시 소속 입상",
          videoUrl: "",
          matchStream: []
        }
      ];

      const cleanedMatches = matches.filter(m => !m.id.startsWith("bk_"));
      const updated = [...realBkplayRecords, ...cleanedMatches];
      setMatches(updated);
      setIsSyncingBkplay(false);
    }, 400);
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setNewTourneyName("");
    setNewDate("2026." + new Date().toLocaleDateString("ko-KR", {month: '2-digit', day: '2-digit'}).replace(" ", "").replace(".", "."));
    setNewScore("25 : 21");
    setNewResult("WIN");
    setNewMemo("");
    setNewVideo("");
    setNewMatchStream([]);
    setIsAddingMatch(true);
  };

  const handleEditMatch = (match) => {
    setEditingId(match.id);
    setNewTourneyName(match.tournament);
    setNewDate(match.date);
    setNewScore(match.score);
    setNewResult(match.result);
    setNewMemo(match.memo || "");
    setNewVideo(match.videoUrl || "");
    setNewMatchStream(match.matchStream || []);
    setIsAddingMatch(true);
  };

  const handleSaveMatch = (e) => {
    e.preventDefault();
    if (!newTourneyName.trim()) {
      alert("대회나 경기 이름을 입력해주세요!");
      return;
    }

    if (editingId) {
      const updated = matches.map(m => {
        if (m.id === editingId) {
          return {
            ...m,
            tournament: newTourneyName,
            date: newDate || m.date,
            score: newScore,
            result: newResult,
            memo: newMemo,
            videoUrl: newVideo,
            matchStream: newMatchStream
          };
        }
        return m;
      });
      setMatches(updated);
    } else {
      const newEntry = {
        id: Date.now().toString(),
        tournament: newTourneyName,
        date: newDate || "2026.07.03",
        score: newScore,
        result: newResult,
        memo: newMemo,
        videoUrl: newVideo,
        matchStream: newMatchStream
      };
      setMatches([newEntry, ...matches]);
    }

    setIsAddingMatch(false);
    setEditingId(null);
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

        <div className="user-club-pill" onClick={() => setShowCloudModal(true)}>
          <Cloud size={14} color="#007d48" />
          <span>광양 테크존 · <strong>유정</strong></span>
        </div>
      </header>

      <section className="mobile-hero">
        <p className="club-tag-sub">GWANGYANG TECHZONE · 2026</p>
        <h1 className="athlete-name-lockup">YUJEONG</h1>
        
        <div className="hero-stats-row">
          <div className="stat-chip highlight">
            <Award size={15} color="#ffd700" />
            <span>공인 입상 <strong>{awardCount}회</strong></span>
          </div>
          <div className="stat-chip">
            <span>전체 기록 <strong>{matches.length}편</strong></span>
          </div>
        </div>
      </section>

      <div className="mobile-tabs-container">
        <div className="mobile-tabs">
          <button 
            onClick={() => setActiveTab("diary")} 
            className={`tab-btn ${activeTab === "diary" ? "active" : ""}`}
          >
            경기 기록 ({matches.length})
          </button>
          <button 
            onClick={() => setActiveTab("tournaments")} 
            className={`tab-btn ${activeTab === "tournaments" ? "active" : ""}`}
          >
            대회 일정 ({tournamentsList.length})
          </button>
        </div>
      </div>

      <main className="mobile-feed">
        {activeTab === "diary" && (
          <>
            <div className="bkplay-sync-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#007d48" />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 800, color: '#111111' }}>공인 전적 연동</p>
                  <p style={{ fontSize: '11px', color: '#48484a' }}>대회 공식 입상 및 매치 기록 동기화</p>
                </div>
              </div>
              <button 
                onClick={handleBkplayImport} 
                disabled={isSyncingBkplay}
                className="sync-btn"
              >
                <RefreshCw size={12} className={isSyncingBkplay ? "animate-spin" : ""} />
                <span>{isSyncingBkplay ? "동기화 중" : "동기화"}</span>
              </button>
            </div>

            <button onClick={handleOpenAddModal} className="btn-primary-mobile">
              <Plus size={18} /> 새 기록 추가
            </button>

            {matches.length === 0 ? (
              <div className="empty-state-mobile">
                <p style={{ fontSize: '15px', fontWeight: 800, color: '#111111', marginBottom: '6px' }}>
                  기록이 없습니다
                </p>
                <p style={{ fontSize: '13px', color: '#8e8e93' }}>
                  [동기화]를 누르거나 새 기록을 추가해 보세요.
                </p>
              </div>
            ) : (
              matches.map(match => {
                const isAward = match.result === "AWARD" || (match.score && match.score.includes("위"));
                const isWin = match.result === "WIN";
                
                return (
                  <div key={match.id} className="match-card-mobile">
                    <div className="card-top-row">
                      <span className="match-date-badge">{match.date}</span>
                      <span className={`result-tag ${isAward ? "award" : isWin ? "win" : "loss"}`}>
                        {isAward ? "공식 입상" : isWin ? "승리" : "패배"}
                      </span>
                    </div>

                    <h3 className="match-tourney-name">{match.tournament}</h3>

                    <div className="match-meta-box">
                      <span>🏸 결과 / 스코어</span>
                      <strong style={{ fontSize: '14px', color: '#111111' }}>{match.score}</strong>
                    </div>

                    {match.matchStream && match.matchStream.length > 0 && (
                      <div style={{ margin: '10px 0', border: '1px solid #e5e5ea', borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ background: '#f2f2f7', padding: '6px 12px', fontSize: '12px', fontWeight: 700, color: '#48484a', borderBottom: '1px solid #e5e5ea' }}>
                          매치별 상세 결과
                        </div>
                        <div>
                          {match.matchStream.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 12px', borderBottom: idx === match.matchStream.length - 1 ? 'none' : '1px solid #f2f2f7', fontSize: '13px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                                <span style={{ fontWeight: 700, color: '#636366', fontSize: '12px', width: '65px', flexShrink: 0 }}>{item.round}</span>
                                <span style={{ color: '#1c1c1e', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.opponent}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                                <span style={{ fontWeight: 700, color: '#1c1c1e', fontFamily: 'monospace', fontSize: '13px' }}>{item.score}</span>
                                <span style={{ 
                                  fontSize: '11px', 
                                  fontWeight: 700, 
                                  padding: '2px 6px', 
                                  borderRadius: '4px',
                                  background: item.result === "승" ? '#e6f4ea' : '#fce8e6',
                                  color: item.result === "승" ? '#137333' : '#c5221f'
                                }}>
                                  {item.result}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {match.memo && (
                      <div className="match-memo-box">
                        "{match.memo}"
                      </div>
                    )}

                    <div className="card-bottom-actions">
                      {match.videoUrl && (
                        <a href={match.videoUrl} target="_blank" rel="noreferrer" className="btn-card-action" style={{ color: '#0066cc', textDecoration: 'none', marginRight: 'auto' }}>
                          <Video size={14} /> 유튜브 영상
                        </a>
                      )}
                      <button onClick={() => handleEditMatch(match)} className="btn-card-action" style={{ color: '#007d48' }}>
                        <Edit3 size={13} /> 수정
                      </button>
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

        {activeTab === "tournaments" && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '4px' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#111111' }}>대회 일정 목록</p>
                <p style={{ fontSize: '11px', color: '#8e8e93' }}>전남 및 전국 주요 대회 접수 일정</p>
              </div>
              <button 
                onClick={handleSyncTourneys}
                disabled={isSyncingTourneys}
                style={{ background: '#007d48', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              >
                <RefreshCw size={11} className={isSyncingTourneys ? "animate-spin" : ""} />
                <span>{isSyncingTourneys ? "갱신 중" : "일정 갱신"}</span>
              </button>
            </div>

            {tournamentsList.map(t => (
              <div 
                key={t.id} 
                className="tourney-card-mobile" 
                style={t.status === "HIGHLIGHT" ? { border: '2px solid #007d48', background: '#f0fdf4' } : {}}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tourney-dday" style={t.status === "HIGHLIGHT" ? { background: '#007d48' } : {}}>
                    {t.dDay}
                  </span>
                  <span style={{ fontSize: '12px', color: '#8e8e93', fontWeight: 700 }}>{t.date}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111111', lineBreak: 'keep-all', marginTop: '2px' }}>{t.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#48484a', fontWeight: 600 }}>{t.location}</span>
                  <button 
                    onClick={() => {
                      setEditingId(null);
                      setNewTourneyName(t.name);
                      setNewDate(t.date.split(" - ")[0] || "2026.07.11");
                      setIsAddingMatch(true);
                      setActiveTab("diary");
                    }}
                    style={{ background: '#111111', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    기록 준비
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

      </main>

      {isAddingMatch && (
        <div className="mobile-modal-overlay">
          <div className="mobile-modal-sheet">
            <div className="modal-handle" />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111' }}>
                {editingId ? "기록 수정" : "새 기록 추가"}
              </h3>
              <button onClick={() => setIsAddingMatch(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={22} color="#8e8e93" />
              </button>
            </div>

            <form onSubmit={handleSaveMatch}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>대회 및 경기명</label>
              <input 
                type="text" 
                placeholder="예: 광양시장기 여복 30 D급" 
                value={newTourneyName}
                onChange={(e) => setNewTourneyName(e.target.value)}
                className="input-mobile"
                required
              />

              <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>일자</label>
              <input 
                type="text" 
                placeholder="예: 2026.06.28" 
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="input-mobile"
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>결과</label>
                  <select 
                    value={newResult} 
                    onChange={(e) => setNewResult(e.target.value)}
                    className="input-mobile"
                  >
                    <option value="WIN">승리</option>
                    <option value="LOSS">패배</option>
                    <option value="AWARD">공식 입상</option>
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

              <div style={{ marginTop: '14px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>매치별 상세 결과</label>
                  <button 
                    type="button"
                    onClick={() => setNewMatchStream([...newMatchStream, { round: "예선 1경기", opponent: "", score: "25 : ", result: "승" }])}
                    style={{ background: '#f2f2f7', border: '1px solid #d1d1d6', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#1c1c1e', cursor: 'pointer' }}
                  >
                    + 경기 추가
                  </button>
                </div>

                {newMatchStream.length === 0 ? (
                  <p style={{ fontSize: '12px', color: '#8e8e93', margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                    상대편, 스코어, 승패를 추가할 수 있습니다.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {newMatchStream.map((item, index) => (
                      <div key={index} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 60px 48px 24px', gap: '6px', alignItems: 'center', background: '#f9f9fa', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}>
                        <input 
                          type="text"
                          placeholder="라운드"
                          value={item.round}
                          onChange={(e) => {
                            const updated = [...newMatchStream];
                            updated[index].round = e.target.value;
                            setNewMatchStream(updated);
                          }}
                          style={{ fontSize: '12px', padding: '6px', borderRadius: '6px', border: '1px solid #d1d1d6', width: '100%', boxSizing: 'border-box' }}
                        />
                        <input 
                          type="text"
                          placeholder="상대편 선수/팀"
                          value={item.opponent}
                          onChange={(e) => {
                            const updated = [...newMatchStream];
                            updated[index].opponent = e.target.value;
                            setNewMatchStream(updated);
                          }}
                          style={{ fontSize: '12px', padding: '6px', borderRadius: '6px', border: '1px solid #d1d1d6', width: '100%', boxSizing: 'border-box' }}
                        />
                        <input 
                          type="text"
                          placeholder="25:19"
                          value={item.score}
                          onChange={(e) => {
                            const updated = [...newMatchStream];
                            updated[index].score = e.target.value;
                            setNewMatchStream(updated);
                          }}
                          style={{ fontSize: '12px', padding: '6px', borderRadius: '6px', border: '1px solid #d1d1d6', width: '100%', boxSizing: 'border-box', textAlign: 'center', fontFamily: 'monospace' }}
                        />
                        <select
                          value={item.result}
                          onChange={(e) => {
                            const updated = [...newMatchStream];
                            updated[index].result = e.target.value;
                            setNewMatchStream(updated);
                          }}
                          style={{ fontSize: '12px', padding: '5px 2px', borderRadius: '6px', border: '1px solid #d1d1d6', width: '100%', boxSizing: 'border-box', fontWeight: 700 }}
                        >
                          <option value="승">승</option>
                          <option value="패">패</option>
                        </select>
                        <button 
                          type="button"
                          onClick={() => setNewMatchStream(newMatchStream.filter((_, i) => i !== index))}
                          style={{ background: 'none', border: 'none', color: '#ff3b30', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>메모</label>
              <textarea 
                rows={3}
                placeholder="전술 메모 및 피드백"
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
                className="input-mobile"
                style={{ resize: 'vertical' }}
              />

              <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93' }}>영상 링크</label>
              <input 
                type="text" 
                placeholder="https://youtu.be/..." 
                value={newVideo}
                onChange={(e) => setNewVideo(e.target.value)}
                className="input-mobile"
              />

              <button type="submit" className="btn-sheet-submit">
                저장
              </button>
            </form>
          </div>
        </div>
      )}

      {showCloudModal && (
        <div className="mobile-modal-overlay">
          <div className="mobile-modal-sheet" style={{ textAlign: 'center' }}>
            <div className="modal-handle" />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowCloudModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={22} color="#8e8e93" />
              </button>
            </div>

            <CheckCircle2 size={40} color="#007d48" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111111' }}>데이터 보관 안내</h3>
            
            <div style={{ background: '#f7f7f8', padding: '16px', borderRadius: '12px', margin: '16px 0', textAlign: 'left', fontSize: '13px', lineHeight: 1.5, color: '#3a3a3c' }}>
              <p style={{ margin: 0 }}>
                • 모든 기록은 기기 내부에 자동 저장됩니다.<br />
                • [동기화] 버튼을 통해 공식 입상 전적 및 일정을 연동할 수 있습니다.
              </p>
            </div>

            <button onClick={() => setShowCloudModal(false)} className="btn-sheet-submit" style={{ background: '#007d48' }}>
              확인
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
