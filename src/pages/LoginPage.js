import React from "react";
import LoginInput from "../components/login/LoginInput";

function LoginPage() {
  return (
    <div className="container-fluid  full-height text-center d-flex justify-content-center align-items-center">
      a
      <div className="row">
        <div className="col  p-5 justify-content-center align-items-center d-flex">
          <img src="./images/dlh-logo.png" width="500" alt="..." />
        </div>
        <div className="col  p-5  justify-content-center align-items-center d-flex">
          <div className="border border-2  shadow p-3 mb-5  rounded p-5">
            <h1 className="text-center mb-5">Selamat Datang</h1>
            <LoginInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
