import logo from "../../../assets/logo.svg";
import style from "./NavigationBar.module.css";

const NewNavber = () => {
  return (
    <div className={`${style.navber}`}>
      <a className={`${style.logo}`}>
        <img src={logo} width={60} height={60} className="" />
        <span className="">HUB Games</span>
      </a>
      <label htmlFor="" className={`${style.icons}`}>
        <i className="bi bi-list"></i>
      </label>
      <nav>
        <ul className={`${style}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Favorites</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NewNavber;
