import React from "react";

class AdminOptionBar extends React.Component {
  render() {
    return (
      <div className="AdminOptionBar">
        <div class="container text-center mb-5">
          <div class="row">
            <div class="col ">
              <div
                class="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                  checked
                />
                <label class="btn btn-outline-secondary" for="btnradio1">
                  Radio 1
                </label>

                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autocomplete="off"
                />
                <label class="btn btn-outline-secondary" for="btnradio2">
                  Radio 2
                </label>
              </div>
            </div>
            <div class="col">
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminOptionBar;
