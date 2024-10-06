import React from "react";

function LoginPage() {
  return (
    <div className="container-fluid  full-height text-center d-flex justify-content-center align-items-center">
      a
      <div className="row">
        <div className="col  p-5 justify-content-center align-items-center d-flex">
          <img src="/images/dlh-logo.png" width="500" alt="..." />
        </div>
        <div className="col  p-5  justify-content-center align-items-center d-flex">
          <div className="border border-2  shadow p-3 mb-5  rounded p-5">
            <h1 className="text-center mb-5">Selamat Datang</h1>
            <div class="my-3 text-start">
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div class="mb-5 text-start">
              <label for="inputPassword5" class="form-label">
                Password
              </label>
              <input
                type="password"
                id="inputPassword5"
                class="form-control"
                aria-describedby="passwordHelpBlock"
              ></input>
            </div>
            <div class="mb-3 m-3 d-grid">
              <button type="button" class="btn btn-primary">
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
