import { useState } from "react";
import Lab1EffectTimer from "./components/Lab1_EffectTimer.jsx";
import Lab2TimerControl from "./components/Lab2_TimerControl.jsx";
import Lab3InputFocus from "./components/Lab3_InputFocus.jsx";
import Lab4RefTimer from "./components/Lab4_RefTimer.jsx";

const labs = [
  {
    id: "1",
    name: "LAB 1",
    subtitle: "useEffect Timer",
    Component: Lab1EffectTimer,
  },
  {
    id: "2",
    name: "LAB 2",
    subtitle: "Start / Stop / Cleanup",
    Component: Lab2TimerControl,
  },
  {
    id: "3",
    name: "LAB 3",
    subtitle: "useRef Input Focus",
    Component: Lab3InputFocus,
  },
  { id: "4", name: "LAB 4", subtitle: "useRef Timer", Component: Lab4RefTimer },
];

export default function App() {
  const [active, setActive] = useState("1"); // Hooks : state 렌더링 수정
  const chosen = labs.find((lab) => lab.id === active); // find() : ?? : 특정한 상태를 가진 데이터 엘리먼트를 구별하여 첫번째 요소만 찾을때. find 를 사용한다. 근데 find()와 map의 차이점? map의 반환값 : 배열, find의 반환값 : 조건에 만족하는 첫번쨰 엘리먼트(조건에 맞는 엘리먼트가 찾아졌을때 바로 동작을 멈춘다)
  const CurrentLab = chosen.Component; // chosen 엘리먼트의 속성중 하나인 Component를 불러옴

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">OPEN SOURCE STUDIO · WEEK 12</p>
        <h1>조현웅 22500698</h1>
        <p>useEffect · Cleanup · useRef — 4개의 독립된 Lab</p>
      </header>

      <nav className="tabs" aria-label="실습 선택">
        {labs.map((lab) => (
          <button
            key={lab.id}
            type="button"
            className={active === lab.id ? "tab active" : "tab"}
            onClick={() => setActive(lab.id)}
            aria-current={active === lab.id ? "page" : undefined}
          >
            <b>{lab.name}</b>
            <span>{lab.subtitle}</span>
          </button>
        ))}
      </nav>

      <section className="lab-panel">
        <div className="section-heading">
          <span className="pill">{chosen.name}</span>
          <h2>{chosen.subtitle}</h2>
        </div>
        <CurrentLab />
      </section>
      <footer>
        랩을 전환하면 이전 Lab은 언마운트됩니다. Timer Cleanup을 확인해 보세요.
      </footer>
    </main>
  );
}
