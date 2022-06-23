import UsersContainer from '../../components/users-container/users-container';
import HistoryContainer from '../../components/history-container/history-container';
import GuessCharacterModal from '../../components/modals/guess-a-character/guess-a-character';
import Header from '../../components/header/header';
import { useContext, useEffect, useState } from 'react';
import ModalContext from '../../contexts/modal-context';
import './play-page.scss';
import { findGameById } from '../../services/games-service';
import GameDataContext from '../../contexts/game-data-context';
import { useNavigate } from 'react-router-dom';

function PlayPage() {
  const { gameData, setGameData, playerId } = useContext(GameDataContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [mode, setMode] = useState('ask');
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameData.data.status) navigate('/');
  });

  useEffect(() => {
    const checkStatus = setTimeout(async () => {
      setGameData(await findGameById(playerId, gameData.data.id));
    }, 1000);

    return () => clearTimeout(checkStatus);
  });

  const players = gameData.data.players;
  const currentPlayer =
    players && players.find((player) => player.player.name === playerId);
  const playersWithoutYou =
    players && players.filter((player) => player.player.name !== playerId);

  return (
    <div className="layout">
      <Header />
      <div className="content_wrapper">
        <ModalContext.Provider value={[displayModal, setDisplayModal]}>
          <UsersContainer
            mode={mode}
            currentPlayer={currentPlayer}
            players={playersWithoutYou}
          />
          <HistoryContainer mode={mode} setMode={setMode} />
          <GuessCharacterModal
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
          />
        </ModalContext.Provider>
      </div>
    </div>
  );
}

export default PlayPage;

/*
---------Modes-----------
'ask' - ask a question
'answer' - answer a question (3 buttons)
'guess' - answer a quessing question (2 buttons)
'wait' - waiting for response from other prayers after giving an answer
'response' - giving a response for the question ('yes' or 'no')
*/
