import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Saved from "./pages/Saved";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Preview from "./pages/Preview";
import Search from "./pages/Search";
import Visuals from "./pages/Visuals";
import Nav from "./components/Nav";
import {/* getCookie, */ authenticateUser, logOut} from "./utils/handleSessions";
import "./style.css"

class App extends React.Component {
//  check cookie
//  getCookie();

  state = {
    authenticated: false,
    email: "",
    loading: false,
    logout: false,
    message: ""
  }

  authenticate = () => authenticateUser()
    .then(auth => this.setState({
      authenticated: auth.data, 
      loading: false,
      email: auth.data.email
    }))
    .catch(err => console.log(err))
  
  logout = () => logOut()
    .then(res => {
      console.log('redirecting');
      this.authenticate()
    })
    .catch(err => console.log(err))

  UNSAFE_componentWillMount(){
    this.authenticate();
  }
  
  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ (props) => (
      this.state.authenticated === true 
        ? <Component {...props} />
        : this.state.loading === true
          ?<div><p>Still loading...</p></div>
          : <Redirect to='/' />
    )} />
  )

  render(){

    return (
    <Router>
      <div>
        <Nav user={this.userName} authenticated={this.state.authenticated} logout={this.logout}/>
        <Switch>
          <Route exact path="/" render={(props) => <Preview {...props} state={this.state} />} />
          <Route path="/search" render={(props) => <Search {...props} state={this.state} />} />
          <Route path="/login" render={(props) => <Login {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />} />
          <Route path="/signup" render={(props) => <Signup {...props} authenticate={this.authenticate} authenticated={this.state.authenticated} />} />
          <Route path="/saved" render={(props) => <Saved {...props} email={this.state.email} state={this.state}/>} /> 
          <Route path='/demo' component={() => { 
     window.location.href = 'https://harpster11.github.io/newsit-news-polarizer-deck/'; 
     return null;
          }}/>
          <Route path="/visuals" render={(props) => <Visuals {...props} state={this.state} />} /> 
          <Route component={NoMatch} />
        </Switch>
      </div>
   </Router>
  )}
}

export default App;

