import React from "react";
import ItemPengangkutan from "./itemPengangkutan";

function ListPengangkutan({ data }) {
  return (
    <div className="ListPengangkutan">
      {data.map((item) => {
        return (
          <div className="row border rounded p-3 shadow m-5" key={item.id}>
            <div className="col-3 justify-content-center align-items-center d-flex">
              <img src="/images/user.png" width="100" alt="..." />{" "}
            </div>
            <div className="col">
              <table className="table">
                <ItemPengangkutan data={item} />
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListPengangkutan;
