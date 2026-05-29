import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `당신은 2025학년도 경기도 초등학교용 나이스(NEIS) 교무업무 매뉴얼을 기반으로 학교 교직원의 질문에 답변하는 친절한 도우미입니다.

아래는 매뉴얼의 핵심 내용입니다:

[나이스란]
나이스(NEIS)는 교육부와 17개 시도교육청이 운영하는 교육정보시스템. 「초·중등교육법」 제30조의4 근거. 모든 입력은 「학교생활기록 작성 및 관리지침」(교육부훈령 제504호, 2024.12.23.)과 「학교생활기록부 기재요령」에 따라야 함.

[학교업무분장관리]
- 경로: [업무분장설정업무]-[학교업무분장]-[학교업무분장관리]
- 학교업무분장관리 담당자는 학교 기관인증서로 로그인하여 1인만 지정
- 담당자는 부서 생성, 부서장 지정, 메뉴 및 자료권한 관리
- 자료권한(학년반, 교과목, 동아리활동) 부여 시 결재승인 완료 후 최종 권한 부여
- 권한관리자 지정은 필수사항으로 내부결재를 통해 근거를 남겨야 함

[학교정보]
- 기준년도/학기관리: [학교정보]-[학교정보]-[기준년도/학기관리]
- 교무학년도: 학기 중 자료를 입력하는 학년도
- 수업학년도: 교육과정 운영을 위해 미리 기초 자료를 등록할 때 설정하는 학년도
- 진급 작업 시 수업학년도를 새로운 학년도 1학기로 변경 후 학년/반 등록
- 자료오류삭제: 학기 시작일/종료일 수정 후 편차 오류 시 사용

[교육과정]
- 학교교육과정편제 및 시간배당 관리: [교육과정]-[교과편제관리]-[학교교육과정편제 및 시간배당 관리]
- 2025학년도: 1~4학년 2022 개정 교육과정, 5~6학년 2015 개정 교육과정 적용
- 학교자율시간: 2025학년도 기준 3~4학년 해당 (29시간 이상 편성)
- 창의적체험활동은 자동반영 불가, 별도 시수 입력 필요
- 담임교사편성: [교육과정]-[학급담임편성및교과개설]-[학급담임편성관리]
- 복수담임 편성 가능: {복수담임추가} 버튼 활용
- 교과전담 담당교과편성은 학기 단위 관리, 2학기에도 별도 등록 필요
- 학사일정: {공휴일정보생성} 먼저 한 후 행사 등록
- 공제일 구분: 공휴일/휴업일은 수업일수 미포함, 행사일은 수업일수 포함
- 시간표: 기초시간표 등록 → 반영기간 설정 → {반영} 클릭
- 결보강이 있는 기간은 기초시간표 반영 불가 (해당 날짜 앞뒤로 나누어 반영)

[학적]
- 기본신상관리: [학급담임]-[학적]-[기본학적관리]-[기본신상관리]
- 번호수정 시 스쿨뱅킹, 도서관 시스템 등과 연동되므로 사전 협의 필요
- 진급처리: [학적]-[진급자 반편성관리]-[진급자 반편성관리]
- 진급자 학적반영일자는 3월 1일로 설정
- 진급 순서: 6학년→5학년→4학년→3학년→2학년→1학년 순으로 학적반영
- 전입관리: [학적]-[전입관리]-[전입관리]
- 전출관리: [학적]-[전출관리]-[전출관리]
- 전출 시 전출 시점까지의 모든 기록 입력 후 전송
- 전출-전입 일수차이: 공백 없음 (도서벽지 1일, 해외 3일 차이 인정)
- 출결관리: [학급담임]-[학적]-[출결관리]-[출결관리]
- 월별 마감 필수 (7월, 8월, 1월, 2월도 출석일수 0일이라도 마감)
- 장기결석, 기타결석: 출결특기사항 필수 입력
- 결석신고서, 현장체험학습 서류: 나이스와 대조하여 확인 (5년 보관)
- 졸업처리 선행조건: 학교생활기록부 마감·결재완료, 건강기록부 마감·결재완료, 진로정보관리 마감, 진학관리 사전일괄승인
- 졸업생 학적반영은 진학학교확인 완료 후 진행
- 졸업생 학적반영 후 진급자 학적반영 (순서 유의)

[학생생활]
- 창의적체험활동: [학급담임]-[학생생활]-[창의적체험활동]
- 1~4학년: 자율·자치활동, 동아리활동, 진로활동 (2022 개정교육과정)
- 5~6학년: 자율활동, 동아리활동, 봉사활동, 진로활동 (2015 개정교육과정)
- 동아리활동은 학생부와 비연동 → {가져오기}로 입력 필요
- 행동특성및종합의견: [학급담임]-[학생생활]-[행동특성및종합의견]
- 수상경력: 2019학년도부터 학교생활기록부에 반영되지 않음

[성적]
- 평가계획(안)관리: [학급담임교사]-[성적]-[평가계획]-[평가계획(안)관리]
- 교과평가: [학급담임교사]-[성적]-[학생평가]-[교과평가]
- 교과학습발달상황: [학급담임교사]-[성적]-[학생평가]-[교과학습발달상황]
- 학기말종합의견 수정 후 교과학습발달상황에서 일괄저장 권장

[학생부]
- 학생부반영: [학급담임]-[학생부]-[학교생활기록부]-[학생부반영]
- 자료검증 및 반마감: [학급담임]-[학생부]-[학교생활기록부]-[자료검증 및 반마감]
- 정정대장: 반드시 4단결재(담임-학생부담당부서부장-교감-교장)
- 정정대장 결재 완결 후 기결취소 불가 (재작성 필요)
- 정정 가능 조건: 객관적 증빙자료가 있는 경우에만 가능
- 생활통지표: 학업성적관리위원회 심의를 거쳐 학교장이 결정

[보건]
- 건강기록부관리: [학급담임]-[보건]-[건강기록부관리]
- 반별등록에서 {자료검증} 후 {마감} 버튼 생성
- 건강기록부마감: [학교별담당부서]-[보건]-[건강기록부관리]-[건강기록부마감]
- 건강검진: 초 1학년, 4학년만 실시

[개별화교육계획]
- 특수교육대상 학생 관련
- 개별화교육대상자 등록이 선행되어야 개별화교육계획 작성 가능

[입학/진학]
- 취학대상자관리: [입학]-[취학관리]-[취학대상자 관리]
- 진학학교확인: [입학]-[진학관리]-[진학학교확인]
- 졸업식 행사코드는 전국공통행사코드로 등록해야 졸업일자 자동 연동

[문의처]
- 경기도나이스지원센터: 1599-2578
- 교육부: 1600-8400
- 온라인: https://help.neis.go.kr

답변 규칙:
1. 항상 친절하고 공손한 말투 사용 (존댓말)
2. 매뉴얼에 있는 내용은 메뉴 경로와 함께 구체적으로 안내
3. 매뉴얼에 없는 내용은 "매뉴얼에서 확인되지 않는 내용입니다. 나이스지원센터(1599-2578)에 문의하시기 바랍니다." 안내
4. 답변은 간결하고 핵심적으로
5. 메뉴 경로는 [대메뉴]-[소메뉴] 형식으로 표시
6. 주요 주의사항은 ⚠️ 이모지와 함께 강조`;

const QUICK = [
  "진급처리 순서가 어떻게 되나요?",
  "학생부 정정대장 작성 방법",
  "출결 월별 마감은 어떻게 하나요?",
  "담임편성 권한 부여 방법",
  "졸업처리 순서 알려주세요",
  "학교자율시간이 무엇인가요?",
];

function formatMsg(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.*?)\]/g, "<span style='background:#e8f0fe;color:#1a56db;padding:1px 5px;border-radius:4px;font-size:0.85em;font-weight:600'>[$1]</span>")
    .replace(/\{(.*?)\}/g, "<span style='background:#fff3e0;color:#e65100;padding:1px 5px;border-radius:4px;font-size:0.85em;font-weight:600'>{$1}</span>")
    .replace(/⚠️(.*?)(\n|$)/g, "<div style='background:#fff8e1;border-left:3px solid #ffa000;padding:6px 10px;margin:6px 0;border-radius:0 6px 6px 0;font-size:0.92em'>⚠️$1</div>")
    .replace(/\n/g, "<br/>");
}

export default function App() {
  const [msgs, setMsgs] = useState([{
    role: "assistant",
    content: "안녕하세요! 😊\n\n저는 **2025학년도 경기도 초등학교 나이스(NEIS) 교무업무 매뉴얼** 기반 AI 도우미입니다.\n\n학적, 출결, 성적, 학생생활, 학생부, 보건 등 나이스 업무에 관한 궁금한 점을 편하게 질문해 주세요!"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setShowQuick(false);
    const next = [...msgs, { role: "user", content }];
    setMsgs(next);
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";
    setLoading(true);

    try {
      const apiMessages = [
        { role: "user", content: SYSTEM_PROMPT + "\n\n이제 사용자 질문에 답변해 주세요." },
        { role: "assistant", content: "네, 2025학년도 경기도 초등학교 나이스 교무업무 매뉴얼을 기반으로 친절하게 답변드리겠습니다." },
        ...next.slice(1).map(m => ({ role: m.role, content: m.content }))
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!res.ok) throw new Error(`오류: ${res.status}`);
      const data = await res.json();
      setMsgs(p => [...p, { role: "assistant", content: data.reply }]);
    } catch {
      setMsgs(p => [...p, {
        role: "assistant",
        content: "⚠️ 서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.\n\n직접 문의: 나이스지원센터 1599-2578"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100vh", background:"#f0f4f8", fontFamily:"'Apple SD Gothic Neo','Malgun Gothic','Segoe UI',sans-serif" }}>
      <div style={{ background:"linear-gradient(135deg,#1a56db,#0d3b9e)", color:"#fff", padding:"14px 20px", display:"flex", alignItems:"center", gap:12, boxShadow:"0 3px 10px rgba(0,0,0,0.25)", flexShrink:0 }}>
        <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🏫</div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:17 }}>나이스 교무업무 도우미</div>
          <div style={{ fontSize:12, opacity:0.82, marginTop:2 }}>2025학년도 경기도 초등학교 나이스 매뉴얼 기반 AI</div>
        </div>
        <div style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"4px 14px", fontSize:12, fontWeight:700 }}>AI 챗봇</div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px 16px", display:"flex", flexDirection:"column", gap:14 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start", alignItems:"flex-end", gap:8 }}>
            {m.role==="assistant" && (
              <div style={{ width:34, height:34, borderRadius:"50%", background:"#1a56db", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>🏫</div>
            )}
            <div
              style={{
                maxWidth:"74%", padding:"12px 16px", fontSize:14, lineHeight:1.7,
                boxShadow:"0 2px 8px rgba(0,0,0,0.08)",
                borderRadius: m.role==="user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: m.role==="user" ? "linear-gradient(135deg,#1a56db,#0d3b9e)" : "#fff",
                color: m.role==="user" ? "#fff" : "#1a1a2e",
              }}
              dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }}
            />
            {m.role==="user" && (
              <div style={{ width:34, height:34, borderRadius:"50%", background:"#e8f0fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>👤</div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"#1a56db", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏫</div>
            <div style={{ background:"#fff", borderRadius:"18px 18px 18px 4px", padding:"14px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ display:"flex", gap:5 }}>
                {[0,1,2].map(j => (
                  <div key={j} style={{ width:8, height:8, borderRadius:"50%", background:"#1a56db", animation:`bounce 1s ${j*0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {showQuick && (
          <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 2px 8px rgba(0,0,0,0.08)", marginTop:4 }}>
            <p style={{ fontSize:13, fontWeight:700, color:"#333", marginBottom:12 }}>💡 자주 묻는 질문을 선택해 보세요</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:8 }}>
              {QUICK.map((q, i) => (
                <button key={i} onClick={() => send(q)}
                  style={{ background:"#f5f8ff", border:"1.5px solid #c7d8f8", color:"#1a56db", borderRadius:10, padding:"9px 12px", fontSize:13, cursor:"pointer", textAlign:"left", lineHeight:1.45, fontFamily:"inherit" }}
                  onMouseOver={e => { e.currentTarget.style.background="#dce8ff"; e.currentTarget.style.borderColor="#1a56db"; }}
                  onMouseOut={e => { e.currentTarget.style.background="#f5f8ff"; e.currentTarget.style.borderColor="#c7d8f8"; }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ background:"#fff", padding:"12px 16px 14px", borderTop:"1px solid #dde5f0", flexShrink:0 }}>
        <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
          <textarea
            ref={taRef}
            value={input}
            onChange={e => { setInput(e.target.value); e.target.style.height="auto"; e.target.style.height=Math.min(e.target.scrollHeight,120)+"px"; }}
            onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); send(); } }}
            placeholder="나이스 관련 궁금한 점을 질문하세요… (Enter 전송 / Shift+Enter 줄바꿈)"
            rows={1}
            style={{ flex:1, border:"1.5px solid #d0d8e8", borderRadius:14, padding:"11px 14px", fontSize:14, resize:"none", outline:"none", fontFamily:"inherit", lineHeight:1.55, maxHeight:120 }}
            onFocus={e => e.target.style.borderColor="#1a56db"}
            onBlur={e => e.target.style.borderColor="#d0d8e8"}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{ background: loading||!input.trim() ? "#c5c5c5" : "linear-gradient(135deg,#1a56db,#0d3b9e)", color:"#fff", border:"none", borderRadius:14, padding:"11px 22px", fontSize:14, fontWeight:700, cursor: loading||!input.trim()?"not-allowed":"pointer", whiteSpace:"nowrap", flexShrink:0, fontFamily:"inherit" }}
          >
            {loading ? "⏳" : "전송 →"}
          </button>
        </div>
        <p style={{ fontSize:11, color:"#aaa", textAlign:"center", marginTop:8 }}>
          ☎ 나이스지원센터 <strong style={{color:"#666"}}>1599-2578</strong> &nbsp;|&nbsp; 교육부 <strong style={{color:"#666"}}>1600-8400</strong>
        </p>
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}`}</style>
    </div>
  );
}