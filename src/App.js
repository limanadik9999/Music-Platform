import React from 'react';
import './App.css';
import auth from "./services/auth";
import {HashRouter} from "react-router-dom";
import { Route, Switch, Redirect } from 'react-router-dom'
import MainPage from "./components/main-page/main-page";
import MyAppBar from "./components/menu/menu";
import Login from "./components/login/login";
import AlbumInfo from "./components/info/info";
import Register from "./components/register/register";
import Report1 from "./components/report1/report1"
import Report2 from "./components/report2/report2"

function LoggedRoutes() {
    return (
        <Switch>
            <Route path="/report1" component={Report1}/>
            <Route path="/report2" component={Report2}/>
            <Redirect from="*" to="/"/>
        </Switch>
    );
}


function ProtectedRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated() ?
                    <Component {...props} />
                    : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    )
            }
        />
    )
}

function App() {
  return (
      <HashRouter>
          <main>
              <div className={"container"}>
                  <MyAppBar />
                  <Switch>
                      <Route exact path="/" component={MainPage}/>
                      <Route path="/album/:id" component={AlbumInfo}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/register" component={Register}/>
                      <ProtectedRoute path="/" component={LoggedRoutes} />
                      <Redirect from="*" to="/"/>
                  </Switch>
              </div>
          </main>
      </HashRouter>
  );
}

export default App;
