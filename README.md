# OSS Week 12 — React Hooks Playground (Student Starter)

## 실행 방법

Node.js 20.19+ 또는 22.12+ 권장. 프로젝트 폴더에서 실행:

```bash
npm install
npm run dev
```

브라우저에 터미널의 Local URL을 열고 LAB 탭을 이동하세요. 제출 전 `npm run build`도 실행하세요.

## 수행 방법

1. `src/components/` 아래의 LAB 1~4 파일에 있는 `TODO`를 직접 완성합니다.
2. `src/App.jsx`, `src/App.css`는 공통 화면이므로 가급적 수정하지 않습니다.
3. 각 LAB의 동작 화면과 콘솔 결과를 기록합니다.
4. 한 LAB에서 다른 LAB으로 탭을 전환하면 기존 컴포넌트가 언마운트됩니다. Cleanup 결과를 관찰합니다.

## 이해도 확인 질문

1. `setCount(prev => prev + 1)`은 왜 유용한가?
2. `useEffect(fn, [])`과 `useEffect(fn)`은 어떻게 다른가?
3. Cleanup은 언제 실행되는가? 개발 환경 StrictMode 영향은?
4. `useState`와 `useRef`의 값 변경 시 렌더링 차이는?
5. LAB 2와 LAB 4에서 Timer를 관리하는 방식의 차이는?

## Project Structure: App.jsx와 주요 Lab 컴포넌트의 역할

- App.jsx : 메인 페이지에서 LAb 컨테이너들을 나타내고, LAB Component들을 export한다.
- lab1 : useEffect의 각 render, effect, cleanup 과정의 경과 시간을 타이머로 만들어서, app.jsx에서 Lab 1을 선택했을대 render한다.
- lab2 : useEffect를 사용해서, 타이머를 구현해서 app.jsx에서 lab 2를 선택했을떄 멈췄을떄 멈추고, 다시 켰을떄 키는 타이머를 app.jsx에 export한다.
- lab3 : focus / clear 버튼을 각각 눌렀을때 각각 기능이 인풋에 focus되고, 인풋란이 clear 되는걸 구현후, app.jsx에 export한다.
- lab4 : 이건 useRef와 useState의 차이점을 나타낸 timer를 만들어서, app.jsx에 export한다.

## useEffect: Effect, Dependency Array 및 Cleanup의 동작 원리

먼저 컴포넌트가 렌더링되었을때 useEffect를 사용한다. 그때 먼저 useEffect의 본문 코드가 작동한다. 그리고 의존성 배열이 변경될때마다 재렌더링 된다. 그리고 재렌더링될때 cleanup으로 이전 effect에서 진행했던 내용을 지운후 다시 렌더링한다.

## useRef: .current 속성과 useState의 차이

.curent 속성은 변경을 해도 재렌더링을 하지 않습니다. useState는 컴포넌트 데이터가 변경되었을때 자동으로 재렌더링되면서 시각적으로 컴포넌트 내용도 바뀐다.

## Code Analysis: useEffect와 useRef 관련 주요 코드 각 1개(5~15줄)를 선택하여 동작 원리 설명

const [running, setRunning] = useState(false);
// TODO 1: 타이머 ID를 유지할 timerRef 생성 (초기값 null)
const timerRef = useRef(null);
const start = () => {
// TODO 2: timerRef.current에 타이머가 있으면 중복 시작 방지
if (timerRef.current !== null) return;
timerRef.current = setInterval(() => {
setCount((prev) => prev + 1);
}, 1000);
// TODO 3: setInterval의 반환 ID를 timerRef.current에 보관
// TODO 4: 1초마다 count 증가, running을 true로 변경
setRunning(true);
};

먼저 running 으로 useState의 default값을 false로 선언한다. 초기 브라우저가 열릴때부터 아직 타이머가 시작될 수 없기때문이고, useRef를 사용해 timerRef의 초기값을 null로 선언했다. 이 또한 타이머의 id가 시작되지도 않았기 때문에 null로 될 수 밖에 없다. 조건문으로 timerRef의 현재값인 current가 null이 아닐때 리턴하는이유는 다시 start버튼을 눌렀을때 중복으로 계속 타이머가 시작되는걸 방지하기 위함이다. 중복 시작이 되면, 타이머가 start버튼을 유저가 눌렀을때 병렬로 생성 때문에 원래는 1초가 지났는데, 보는 걸로는 2초가 지나는 문제가 발생한다. 그후, setInterval 메서드 덕분에 1초가 지날때마다 setCount가 실행되서 초가 세지고, 그 반환결과로 timerRef에게 타이머 id를 반환한다. 그후 running을 true로 바꿔서 유저가 stop 버튼을 누를 수 있게 setRunning 코드를 사용한다.

## Lab 비교 분석

README에 다음 질문의 답을 작성합니다.

- useEffect의 Dependency Array가 필요한 이유는?
  => Dependency Array는 초기 컴포넌트가 렌더링될때 한번만 실행되기 때문에, 초기에는 useEffect의 의존성 배열은 렌더링될때, 아무것도 변하지 않고 그렇기에 이게 빈값을 가지고 나와야하기 떄문이다
- Cleanup을 사용하지 않으면 어떤 문제가 발생할 수 있는가?
  => 이전에 useReffect에 적혀져있는 것들, 타이머나 id값 같은 것들이 계속 실행되고, 이것은 더 큰 문제를 일으킬 수 있기 때문이다.
- useState와 useRef의 가장 중요한 차이는?
  => useState는 변경됐을때 바로 다시 렌더링하고, useRef는 .current를 변경됐을때 다시 재렌더링하지 않는다. 다만 useState의 set함수로 업데이트하거나, 부모 컴포넌트가 재렌더링될때 다시 재렌더링될 수 있다.
- LAB 2와 LAB 4의 Timer 관리 방식은 어떻게 다른가?
  => LAB 2는 useState를 사용해서, 화면에 나타나는 그대로 시간이 흘러가는 초에 맞춰서 값을 더하면서 구현했지만, LAB 4는 useRef를 사용함으로서 흘러가는 시간을 계속 더하다가 멈췄을때 .current를 사용함으로서 타이머 id를 사용해서 불필요한 재렌더링을 막기 위해서 사용한다.
