import logo from "../../../assets/logo.svg";
import "./nav_style.css";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-3">
      <a className="navbar-brand">
        <img
          src={logo}
          width={60}
          height={60}
          className="d-inline-block align center"
        />
        <span className="fw-bolder fs-4">HUB Games</span>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarID"
        aria-controls="navbarID"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarID">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a
              className="nav-link"
              href={"#"}
              // data-bs-toggle="tooltip"
              // title="Home"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              // data-bs-toggle="tooltip"
              // title="Favorites"
            >
              Favorites
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              // data-bs-toggle="tooltip"
              // title="Logout"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
