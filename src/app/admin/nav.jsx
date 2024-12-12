import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import style from "./styles/nav.module.css";
import { useState } from "react";

const NavBar = ({ dropDown, setDropDown, setSearch, show, hide }) => {
  const [searchedData, setSearchedData] = useState(null);
  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearchedData(value);
    console.log(value);
  };
  const Search = () => {
    setSearch(searchedData);
    console.log(searchedData);
  };
  return (
    <div className={style.nav}>
      {!dropDown ? (
        <div
          className={`btn btn-primary ${style.btnPrimary}`}
          onClick={() => setDropDown(!dropDown)}
        >
          <button type="button" className={style.button}>
            {hide}
          </button>
          <FaAngleUp size={20} />
        </div>
      ) : (
        <div
          className={`btn btn-primary ${style.btnPrimary}`}
          onClick={() => setDropDown(!dropDown)}
        >
          <button type="button" className={style.button}>
            {show}
          </button>
          <FaAngleDown size={20} />
        </div>
      )}
      {!dropDown && (
        <form
          className={`form-inline my-2 my-lg-0 ${style.searchBar}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by name or by department"
            aria-label="Search"
            onChange={handleOnChange}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={Search}
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
};

export default NavBar;
