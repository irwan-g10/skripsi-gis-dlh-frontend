import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginInput() {
  const [nip, setNip] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onNipChangeHandler = (event) => {
    setNip(event.target.value);
  };
  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    await axios
      .post(`http://localhost:5000/api/pengguna/login`, { nip, password })
      .then((response) => {
        const { result } = response.data;
        if (result) {
          if (result.password === password) {
            alert("Berhasil Login");
            localStorage.setItem("id", result.id);
            localStorage.setItem("role", result.role);

            window.location.reload();
          } else {
            alert("Password salah");
          }
        } else {
          alert("NIP tidak ditemukan");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <form onSubmit={onSubmitHandler} className="login-input">
      <div className="my-3 text-start">
        <label htmlFor="nip" className="form-label">
          NIP
        </label>
        <input
          type="input"
          className="form-control"
          id="nip"
          placeholder="Masukan NIP ..."
          value={nip}
          onChange={onNipChangeHandler}
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
          value={password}
          onChange={onPasswordChangeHandler}
        ></input>
      </div>
      <div className="mb-3 m-3 d-grid">
        <button className="btn btn-primary">Masuk</button>
      </div>
    </form>
  );
}
// class LoginInput extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//     };

//     this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
//     this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
//     this.onSubmitHandler = this.onSubmitHandler.bind(this);
//   }

//   onEmailChangeHandler(event) {
//     this.setState(() => {
//       return {
//         email: event.target.value,
//       };
//     });
//   }

//   onPasswordChangeHandler(event) {
//     this.setState(() => {
//       return {
//         password: event.target.value,
//       };
//     });
//   }

//   async onSubmitHandler(event) {
//     event.preventDefault();

//     // await axios
//     //   .get(`http://localhost:5000/api/pengguna?password=${}`)
//     //   .then((response) => {
//     //     const result = response.data.result;
//     //     if (this.password === result.password && this.nip === result.nip) {
//     //       localStorage.setItem("id", result.id);
//     //       localStorage.setItem("role", result.role);
//     //     } else {
//     //       alert("NIP atau Password salah");
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     alert(error.message);
//     //   });

//     console.log(this.state.email);
//   }

//   render() {
//     return (
//       <form onSubmit={this.onSubmitHandler} className="login-input">
//         <div className="my-3 text-start">
//           <label htmlFor="nip" className="form-label">
//             NIP
//           </label>
//           <input
//             type="input"
//             className="form-control"
//             id="nip"
//             placeholder="Masukan NIP ..."
//             value={this.state.email}
//             onChange={this.onEmailChangeHandler}
//           />
//         </div>
//         <div className="mb-5 text-start">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="form-control"
//             placeholder="Masukan Password ..."
//             value={this.state.password}
//             onChange={this.onPasswordChangeHandler}
//           ></input>
//         </div>
//         <div className="mb-3 m-3 d-grid">
//           <button className="btn btn-primary">Masuk</button>
//         </div>
//       </form>
//     );
//   }
// }

export default LoginInput;
