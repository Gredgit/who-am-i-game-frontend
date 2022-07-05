import Btn from '../../components/btn/btn';
import PlayerCard from '../../components/player-card/player-card';
import LeaveGameModal from '../../components/modals/leave-game';
import SelectCharacterModal from '../../components/modals/select-character';
import Header from '../../components/header/header';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLAY, PROCESSING_QUESTION, READY } from '../../constants/constants';
import './lobby.scss';
import GameDataContext from '../../contexts/game-data-context';
import { findGameById, suggestCharacter } from '../../services/games-service';

function Lobby() {
  const { gameData, playerId, setGameData } = useContext(GameDataContext);
  const [leaveModalActive, setLeaveModalActive] = useState(false);
  const [suggestModalActive, setSuggestModalActive] = useState(false);
  const [suggestBtn, setSuggestBtn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = setTimeout(async () => {
      setGameData(await findGameById(playerId, gameData.data.id));
    }, 1000);

    return () => clearTimeout(checkStatus);
  });

  useEffect(() => {
    if (!gameData.data.status) navigate('/');

    if (gameData.data.status === PROCESSING_QUESTION) {
      navigate(PLAY);
    }
  }, [gameData, navigate]);

  const players =
    gameData.data.players &&
    gameData.data.players.map((player, index) => ({
      nickname: player.player.name || `Player ${index + 1}`,
      avatar: `avatar0${index + 1}`,
      ...player,
    }));

  const currentPlayer =
    players && players.find((player) => player.player.id === playerId);
  const playersWithoutYou =
    players && players.filter((player) => player.player.id !== playerId);

  const submitCharacter = (event, playerName, characterName) => {
    event.preventDefault();
    suggestCharacter(playerId, gameData.data.id, playerName, characterName);
    setSuggestModalActive(false);
    setSuggestBtn(false);
  };

  return (
    <ScreenWrapper>
      <div className="input-screen">
        <Header type="game-lobby" />
        <div className="input-screen__player">
          <div className="input-screen__player-card-wrapper">
            {currentPlayer &&
              (console.log('players', gameData.data.players),
              (
                <PlayerCard
                  avatarClassName={currentPlayer.avatar}
                  name={currentPlayer.nickname}
                  playerStatusClassName={
                    currentPlayer.state === READY ? 'yes' : 'unsure'
                  }
                  isYou
                />
              ))}
            {playersWithoutYou ? (
              playersWithoutYou.map((player) => (
                <PlayerCard
                  key={player.player.id}
                  avatarClassName={player.avatar}
                  name={player.nickname}
                  playerStatusClassName={
                    player.state === READY ? 'yes' : 'unsure'
                  }
                />
              ))
            ) : (
              <h1>Something went wrong</h1>
            )}
          </div>
          <div className="input-screen__btn-wrapper">
            {suggestBtn && (
              <Btn
                className={['btn-green-solid']}
                onClick={() => {
                  setSuggestModalActive(true);
                }}
              >
                Suggest a character
              </Btn>
            )}
            <Btn
              className={['btn-pink-solid']}
              onClick={() => setLeaveModalActive(true)}
            >
              LEAVE GAME
            </Btn>
          </div>
        </div>
        <LeaveGameModal
          active={leaveModalActive}
          onCancel={() => setLeaveModalActive(false)}
        />
        <SelectCharacterModal
          player={currentPlayer && currentPlayer.nickname}
          active={suggestModalActive}
          onSubmit={submitCharacter}
          onCancel={() => setSuggestModalActive(false)}
        />
      </div>
    </ScreenWrapper>
  );
}

export default Lobby;
