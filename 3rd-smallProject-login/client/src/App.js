import { Router } from "express";
import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <link to='/'>Home</link>
          </li>
          <li>
            <link to='/about'>About</link>
          </li>
          <li>
            <link to='/dashboard'>Dashboard</link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>

      {/* <Switch>
        <Route exact path="/" component={Home} />    (4)
        <Route path="/about" component={Photo} />
        <Route path="/dashboard" component={Rooms} />
      </Switch> */}
    </BrowserRouter>
  );
}

export default App;
