//import './App.css';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
//import CssBaseline from '@mui/material/CssBaseline'

import React from 'react';
import Header from './features/header/Header'
import { ADD_QUESTION, LEADERBOARD, LOGIN } from './routes'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import NewQuestion from './pages/NewQuestion'
import Leaderboard from './pages/Leaderboard'
import { AuthProvider, RequireAuth } from './features/auth'

function App() {
    return (
        <AuthProvider>
            {/*   <CssBaseline />*/}
            <Header />
            <Routes>
                <Route path='/' element={<RequireAuth>
                    <Home />
                </RequireAuth>} />
                <Route path={LOGIN} element={<Login />} />
                <Route path={ADD_QUESTION} element={<RequireAuth>
                    <NewQuestion />
                </RequireAuth>} />
                <Route path={LEADERBOARD} element={<RequireAuth>
                    <Leaderboard />
                </RequireAuth>} />
            </Routes>
        </AuthProvider>
        //<div className="App">
        //  <header className="App-header">
        //    <img src={logo} className="App-logo" alt="logo" />
        //    <Counter />
        //    <p>
        //      Edit <code>src/App.js</code> and save to reload.
        //    </p>
        //    <span>
        //      <span>Learn </span>
        //      <a
        //        className="App-link"
        //        href="https://reactjs.org/"
        //        target="_blank"
        //        rel="noopener noreferrer"
        //      >
        //        React
        //      </a>
        //      <span>, </span>
        //      <a
        //        className="App-link"
        //        href="https://redux.js.org/"
        //        target="_blank"
        //        rel="noopener noreferrer"
        //      >
        //        Redux
        //      </a>
        //      <span>, </span>
        //      <a
        //        className="App-link"
        //        href="https://redux-toolkit.js.org/"
        //        target="_blank"
        //        rel="noopener noreferrer"
        //      >
        //        Redux Toolkit
        //      </a>
        //      ,<span> and </span>
        //      <a
        //        className="App-link"
        //        href="https://react-redux.js.org/"
        //        target="_blank"
        //        rel="noopener noreferrer"
        //      >
        //        React Redux
        //      </a>
        //    </span>
        //  </header>
        //</div>
    );
}

export default App;
