import React, { useEffect } from 'react';
import { Route, NavLink, Switch, useHistory } from 'react-router-dom';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import InfoIcon from '@material-ui/icons/Info';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import './App.scss';
import Header from './Header/Header';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import SingleAnalysis from './Components/SingleAnalysis/SingleAnalysis';
import FileAnalysis from './Components/FileAnalysis/FileAnalysis';
import Info from './Components/Info/Info';
import Developer from './Components/Developer/Developer';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
const { ipcRenderer } = window.require('electron');

function App() {
  const history = useHistory();

  useEffect(() => {
    ipcRenderer.on('screenChange', (e, number) => {
      var route = null;
      if (number === 0 && !window.location.href.endsWith("/"))
        route = "/";
      else if (number === 1 && !window.location.href.endsWith("/singleAnalysis"))
        route = "/singleAnalysis";
      else if (number === 2 && !window.location.href.endsWith("/fileAnalysis"))
        route = "/fileAnalysis";
      else if (number === 3 && !window.location.href.endsWith("/info"))
        route = "/info";
      else if (number === 4 && !window.location.href.endsWith("/developer"))
        route = "/developer";
      if (route !== null)
        history.push(route);
    });
  }, [history]);

  return (
    <div className="app">
      <Header />
      <div style={{ height: "calc(100% - 48px)", display: 'flex' }}>

        <div className="sideBar">
          <NavLink to="/singleAnalysis" className="sideBardiv" activeClassName="active">
            <div className="icons">
              <SentimentSatisfiedAltIcon className="icon" />
              <SentimentVeryDissatisfiedIcon className="icon" />
            </div>
            <div className="name">
              Single Analysis
            </div>
          </NavLink>
          <NavLink to="/fileAnalysis" className="sideBardiv" activeClassName="active">
            <div className="icons">
              <SentimentSatisfiedAltIcon className="icon" />
              <SentimentVeryDissatisfiedIcon className="icon" />
            </div>
            <div className="name">
              File Analysis
            </div>
          </NavLink>
          <NavLink to="/info" className="sideBardiv" activeClassName="active">
            <InfoIcon className="icon" />
            <div className="name">
              Info
            </div>
          </NavLink>
          <NavLink to="/developer" className="sideBardiv" activeClassName="active">
            <DeveloperModeIcon className="icon" />
            <div className="name">
              Developer
            </div>
          </NavLink>
        </div>

        <div style={{ height: "100%", width: "calc(100% - 100px)" }}>
          <Route render={({ location }) => (
            <SwitchTransition className="transition" mode="out-in">
              <CSSTransition
                key={location.key}
                timeout={450}
                classNames="fade"
              >
                <Switch location={location}>
                  <Route path="/singleAnalysis" component={SingleAnalysis} />
                  <Route path="/fileAnalysis" component={FileAnalysis} />
                  <Route path="/info" component={Info} />
                  <Route path="/developer" component={Developer} />
                  <Route path="/" component={WelcomePage} />
                </Switch>
              </CSSTransition>
            </SwitchTransition>
          )} />
        </div>
      </div>
    </div>
  );
}

export default App;
