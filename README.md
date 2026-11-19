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
