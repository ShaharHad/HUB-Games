import { useState } from "react";
import SummeryGame, { SummeryGameType } from "./SummeryGame/SummeryGame";
import { useNavigate } from "react-router-dom";

interface Props {
  games_list: Array<SummeryGameType>;
  size: number;
}

const Games = ({ games_list, size }: Props) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 18;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = games_list.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(games_list.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage === nPage) return;
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      <div className={`row row-cols-1 row-cols-lg-${size} g-4 py-3`}>
        {records.map((game, index) => (
          <div className="col" key={index}>
            <a
              onClick={() => navigate(`/Game/:${game.id}`, { state: game.id })}
            >
              <SummeryGame game={game}></SummeryGame>
            </a>
          </div>
        ))}
      </div>
      <nav aria-label="...">
        <ul className="pagination pb-5 pt-3">
          <li className="page-item">
            <a
              className={`page-link ${currentPage === 1 ? `disabled` : ``}`}
              href="#"
              onClick={prevPage}
            >
              Previous
            </a>
          </li>
          {numbers.map((n, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === n ? `active` : ``}`}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a
              className={`page-link ${currentPage === nPage ? `disabled` : ``}`}
              href="#"
              onClick={nextPage}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Games;
