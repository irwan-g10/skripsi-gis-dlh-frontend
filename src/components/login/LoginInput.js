import React from "react";
import PropTypes from "prop-types";

class LoginInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    console.log(this.state.email);
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler} className="login-input">
        <div className="my-3 text-start">
          <label htmlFor="nip" className="form-label">
            NIP
          </label>
          <input
            type="input"
            className="form-control"
            id="nip"
            placeholder="Masukan NIP ..."
            value={this.state.email}
            onChange={this.onEmailChangeHandler}
          />
        </div>
        <div className="mb-5 text-start">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Masukan Password ..."
            value={this.state.password}
            onChange={this.onPasswordChangeHandler}
          ></input>
        </div>
        <div className="mb-3 m-3 d-grid">
          <button className="btn btn-primary">Masuk</button>
        </div>
      </form>
    );
  }
}

export default LoginInput;
