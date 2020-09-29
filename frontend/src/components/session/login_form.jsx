import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/session_actions";
import { closeModal, openModal } from "../../actions/modal_actions";
import "../modal/modal.scss";
import logo from "../../assets/repo-logo.png";

class LoginForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleAdmin = this.handleAdmin.bind(this);
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Render the session errors if there are any
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

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(user).then((arg) => {
      if (Object.keys(this.props.errors).length === 0) {
        this.props.closeModal();
      }
    });
  }

  handleDemo(e) {
    e.preventDefault();
    this.props
      .login({
        username: "demouser",
        password: "password",
      })
      .then(this.props.closeModal);
  }

  handleAdmin(e) {
    e.preventDefault();
    this.props
      .login({
        username: "adminuser",
        password: "password",
      })
      .then(this.props.closeModal);
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
          <h1 className="modal-header">Welcome Back</h1>
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
          <span className="modal-errors">{this.renderErrors()}</span>
          {/* <br /> */}
          <input
            className="modal-button"
            id="login-modal-button"
            type="submit"
            value="Submit"
          />
          <br />
          <button
            className="modal-button"
            id="login-modal-button"
            onClick={this.handleAdmin}
          >
            Admin Login
          </button>
          <br />
          <button
            className="modal-button"
            id="login-modal-button"
            onClick={this.handleDemo}
          >
            Demo Login
          </button>
          <br />
          <button
            className="modal-button"
            onClick={() => this.props.openModal("signup")}
          >
            Go to Signup
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ errors }) => {
  return {
    formType: "login",
    errors: errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    closeModal: () => dispatch(closeModal()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));