import UsersContainer from '../../components/users-container/users-container';
import HistoryContainer from '../../components/history-container/history-container';
import GuessCharacterModal from '../../components/modals/guess-a-character';
import Header from '../../components/header/header';
import { useContext, useEffect, useState } from 'react';
import ModalContext from '../../contexts/modal-context';
import './play-page.scss';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { askQuestion, findGameById } from '../../services/games-service';
import GameDataContext from '../../contexts/game-data-context';
import { useNavigate } from 'react-router-dom';
import { ANSWERING, ASKING } from '../../constants/constants';

function PlayPage() {
  const { gameData, setGameData, playerId } = useContext(GameDataContext);
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState(
    gameData.data.currentTurn === playerId ? ASKING : ANSWERING
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!gameData.data.status) navigate('/');
  // }, [gameData, navigate]);

  useEffect(() => {
    const checkStatus = setTimeout(async () => {
      setGameData(await findGameById(playerId, gameData.data.id));
    }, 1000);

    return () => clearTimeout(checkStatus);
  });

  const players =
    gameData.data.players &&
    gameData.data.players.map((player, index) => ({
      avatar: `avatar0${index + 1}`,
      ...player,
    }));
  const currentPlayer =
    players && players.find((player) => player.player.id === playerId);
  const playersWithoutYou =
    players && players.filter((player) => player.player.id !== playerId);

  const submitGuess = (event, guess) => {
    event.preventDefault();
    askQuestion(playerId, gameData.data.id, guess);
    setActive(false);
  };

  return (
    <ScreenWrapper className="lobby-screen">
      <Header type="play-game" />
      <div className="content_wrapper">
        <ModalContext.Provider value={[active, setActive]}>
          <UsersContainer
            mode={mode}
            currentPlayer={currentPlayer}
            players={playersWithoutYou}
          />
          <HistoryContainer mode={mode} setMode={setMode} />
          <GuessCharacterModal
            active={active}
            onSubmit={submitGuess}
            onCancel={() => setActive(false)}
          />
        </ModalContext.Provider>
      </div>
    </ScreenWrapper>
  );
}

export default PlayPage;

/*
---------Modes-----------
ASLING - ask a question
ANSWERING - answer a question (3 buttons)
GUESSING - answer a quessing question (2 buttons)
WAITING - waiting for response from other prayers after giving an answer
RESPONSE - giving a response for the question ('yes' or 'no')
*/
