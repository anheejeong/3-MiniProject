import React, { useState, useEffect } from "react";
import { authService } from "../myFirebase";
// console.log(firebase);
import AppRouter from "./Router";

function App() {
  // 사용자 관리 => onAuthStateChanged 필요
  // 사용자의 로그인 상태 변화를 관찰하는 관찰자를 추가함(event Listener)
  const [init, setInit] = useState(false);  // firebase가 프로그램을 초기화하길 기다려야 함
  // authService.currentUser를 default 값으로 넣어줌으로써 현재 로그인 여부 판별 가능 가능
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 여부 확인 가능!
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);  // init이 false라면 AppRouter를 숨기게 됨
    });
  }, [])

  // 로그인 오류 => 아래 코드를 찍어보면 firebase 로그인 시간 발생 차이 때문에 바로 로그인 여부를 알 수 없음
  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser)
  // }, 2000);

  return (
    <React.Fragment>
      {init && < AppRouter isLoggedIn={isLoggedIn} />}
      {!init && "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} twitter-clone</footer>
    </React.Fragment>
  );
}

export default App;
