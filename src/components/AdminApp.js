import React from "react";
import AdminPage from "../pages/AdminPage";
import PenggunaPage from "../pages/PenggunaPage";
import PengangkutPage from "../pages/PengangkutPage";
import LoginPage from "../pages/LoginPage";

class AdminApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localID: localStorage.getItem("id"),
      localRole: localStorage.getItem("role"),
    };
  }

  async componentDidMount() {}

  render() {
    // if (this.state.localID === null) {
    //   return (
    //     <div className="AdminApp">
    //       <LoginPage />
    //     </div>
    //   );
    // } else {
    //   if (this.state.role === "admin") {
    return (
      <div className="AdminApp">
        <AdminPage />
      </div>
    );
    //   } else if (this.state.role === "pengangkut") {
    //     return (
    //       <div className="AdminApp">
    //         <PengangkutPage />
    //       </div>
    //     );
    //   }
    // }
  }
}

export default AdminApp;
