import LobbyItem from './lobby-item/lobby-item';
import Header from '../../components/header/header';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import JoinLobbyModal from '../../components/modals/join-lobby-modal';
import TableColumnTitle from './table-column-title/table-column-title';
import Btn from '../../components/btn/btn';
import {
  GAME_LOBBY,
  NUMBER_OF_PLAYERS_FILTER,
  THEME_FILTER,
  TYPE_FILTER,
} from '../../constants/constants';
import { useState } from 'react';
import './main-lobby.scss';
import { useNavigate } from 'react-router-dom';

function MainLobby() {
  const [themeFilter, setThemeFilter] = useState(THEME_FILTER);
  const [numberFilter, setNumberFilter] = useState(NUMBER_OF_PLAYERS_FILTER);
  const [typeFilter, setTypeFilter] = useState(TYPE_FILTER);

  const [themeDropdown, setThemeDropdown] = useState(false);
  const [numberDropdown, setNumberDropdown] = useState(false);
  const [typeDropdown, setTypeDropdown] = useState(false);

  const [joinLobbyActive, setJoinLobbyActive] = useState(false);
  const navigate = useNavigate();

  const resetFiltersHandler = () => {
    setThemeFilter((state) =>
      state.map((filter) => ({ ...filter, checked: false }))
    );
    setNumberFilter((state) =>
      state.map((filter) => ({ ...filter, checked: false }))
    );
    setTypeFilter((state) =>
      state.map((filter) => ({ ...filter, checked: false }))
    );
  };

  const closeDropdown = (event) => {
    if (
      !event.target.className.includes('table-header__column') &&
      event.target.tagName !== 'INPUT' &&
      event.target.tagName !== 'LABEL'
    ) {
      setThemeDropdown(false);
      setNumberDropdown(false);
      setTypeDropdown(false);
    }
  };

  const joinLobbySubmit = () => {
    setJoinLobbyActive(false);
    navigate(GAME_LOBBY);
  };

  return (
    <ScreenWrapper className="lobby-screen">
      <Header type="lobbies" />
      <table className="main-lobby" onClick={closeDropdown}>
        <thead className="table-header">
          <tr className="table-header__info">
            <TableColumnTitle
              name="Theme"
              filtersGroup={themeFilter}
              setFilter={setThemeFilter}
              displayDropdown={themeDropdown}
              setDisplayDropdown={setThemeDropdown}
            >
              Theme
            </TableColumnTitle>
            <TableColumnTitle
              name="NumbersOfPlayers"
              filtersGroup={numberFilter}
              setFilter={setNumberFilter}
              displayDropdown={numberDropdown}
              setDisplayDropdown={setNumberDropdown}
            >
              Number of Players
            </TableColumnTitle>
            <TableColumnTitle
              className="type"
              name="Type"
              filtersGroup={typeFilter}
              setFilter={setTypeFilter}
              displayDropdown={typeDropdown}
              setDisplayDropdown={setTypeDropdown}
            >
              Type
            </TableColumnTitle>
            <th>
              <Btn
                className="btn-green-solid btn-rounded btn-with-fields"
                onClick={resetFiltersHandler}
              >
                RESET FILTERS
              </Btn>
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <LobbyItem
              key={num}
              theme="Actors"
              numberOfPlayers={`${num}/12 players`}
              type={num % 3 === 0 ? 'Public' : 'Private'}
              setJoinLobbyActive={setJoinLobbyActive}
            />
          ))}
        </tbody>
      </table>
      <JoinLobbyModal
        active={joinLobbyActive}
        onSubmit={joinLobbySubmit}
        onCancel={() => setJoinLobbyActive(false)}
      />
    </ScreenWrapper>
  );
}

export default MainLobby;
