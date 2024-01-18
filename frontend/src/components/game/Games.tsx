import { useState } from "react";
import Game, { GameType } from "./Game";

interface Props {
  games_list: Array<GameType>;
  size: number;
}

const Games = ({ games_list, size }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 21;
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
    <div className="container mt-5">
      <div className={`row row-cols-1 row-cols-lg-${size} g-4 py-3`}>
        {records.map((game, index) => (
          <div className="col" key={index}>
            <Game game={game}></Game>
          </div>
        ))}
      </div>
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={prevPage}>
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
            <a className="page-link" href="#" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Games;
