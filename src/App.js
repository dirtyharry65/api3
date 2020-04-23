import React  from 'react';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";
import './App.css';
import NavBar from './components/navbar/navBar';
import Home from './components/home/home';
import Schools from './components/schools/schools';
import CoursesState from './context/courses/CoursesState';
import Login from './components/login/login';
import AuthState from './context/auth/AuthState';
import SchoolsState from './context/schools/SchoolsState';

function App() {
  return (
    <AuthState>
      <SchoolsState>
        <CoursesState>
          <Router >
            <NavBar />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/dashboard" component={Schools} />
              <Route path="/cursussen" component={Home} />
            </Switch>
          </Router>
        </CoursesState>
      </SchoolsState>
    </AuthState>
  
  );
}

export default App;
