import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signup, login, clearErrors } from "../../actions/session_actions";
import { closeModal, openModal } from "../../actions/modal_actions";
import "../modal/modal.scss";
import logo from "../../assets/repo-logo.png";

class SignupForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }



  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };


    this.props.signup(user).then((arg) => {
      if (Object.keys(this.props.errors).length === 0) {
        this.props.closeModal();
      }
    });
  }


  renderErrors() {
    return (
      <ul className="modal-ul">
        {Object.keys(this.props.errors).map((error, i) => (
          <li className="modal-li" key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <div className="modal-container">
        <form className="modal-form" onSubmit={this.handleSubmit}>
          <div className="modal-form-logo">
            <img src={logo} alt="logo" />
          </div>
          <h1 className="modal-header">Welcome to RepoCoin</h1>
          <br />
          <h3 className="modal-fields">Email</h3>
          <input
            className="modal-input"
            type="email"
            value={this.state.email}
            onChange={this.update("email")}
            placeholder="Email"
          />
          <h3 className="modal-fields">Username</h3>
          <input
            className="modal-input"
            type="text"
            value={this.state.username}
            onChange={this.update("username")}
            placeholder="Username"
          />
          <h3 className="modal-fields">Password</h3>
          <input
            className="modal-input"
            type="password"
            value={this.state.password}
            onChange={this.update("password")}
            placeholder="Password"
          />
          <h3 className="modal-fields">Confirm Password</h3>
          <input
            className="modal-input"
            type="password"
            value={this.state.password2}
            onChange={this.update("password2")}
            placeholder="Confirm Password"
          />
          <span className="modal-errors">{this.renderErrors()}</span>
          {/* <br /> */}
          <input className="modal-button" type="submit" value="Submit" />
          <br />
          <button
            className="modal-button"
            onClick={() => this.props.openModal("login")}
          >
            Go to Login
          </button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    formType: "signup",
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));