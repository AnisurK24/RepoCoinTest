import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";


import { logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

import Search from './search'
import logo from "../../assets/repo-logo.png";


import './navbar.scss'

class NavBar extends React.Component {
  constructor(props) {
    super();
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      if (this.props.isAdmin) {
        return (
          <div>
            <Link to={"/deleted/cars"}><button className="navbutton"><p>Deleted Cars</p></button></Link>&nbsp;&nbsp;
            <Link to={"/profile"}><button className="navbutton"><p>Profile</p></button></Link>&nbsp;&nbsp;
            <button className="navbutton" onClick={this.logoutUser}><p>Log Out</p></button>
          </div>
        )
      } else {
        return (
          <div>
            <Link to={"/profile"}><button className="navbutton"><p>Profile</p></button></Link>&nbsp;&nbsp;
            <button className="navbutton" onClick={this.logoutUser}><p>Log Out</p></button>
          </div>
        );
      }
    } else {
      return (
          <div>
            <button
              className="navbutton"
              onClick={() => this.props.openModal("signup")}
            >
              <p>Sign Up</p>
            </button>
            <button
              className="navbutton"
              onClick={() => this.props.openModal("login")}
            >
              <p>Log In</p>
            </button>
           </div>
      );
    }
  }

  render() {
    return (
      <div className="nav-bar-container">
        <div className="nav-bar-logged-in">
          <div className="nav-bar-form-logo-icon">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div>
            <Search />
          </div>
          <div>{this.getLinks()}</div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  if (state.session.user) {
    return {
      loggedIn: state.session.isAuthenticated,
      isAdmin: state.session.user.isAdmin
    }
  } else {
    return {
      loggedIn: state.session.isAuthenticated,
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  openModal: (modal) => dispatch(openModal(modal)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));