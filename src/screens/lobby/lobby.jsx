import Btn from '../../components/btn/btn';
import PlayerCard from '../../components/player-card/player-card';
import LeaveGameModal from '../../components/modals/leave-game';
import SelectCharacterModal from '../../components/modals/select-character';
import Header from '../../components/header/header';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import Spinner from '@atlaskit/spinner';
import { useCallback, useContext, useState } from 'react';
import { READY } from '../../constants/constants';
import './lobby.scss';
import GameDataContext from '../../contexts/game-data-context';
import { suggestCharacter } from '../../services/games-service';
import useGameData from '../../hooks/useGameData';
import usePlayers from '../../hooks/usePlayers';

function Lobby() {
  const { gameData, playerId } = useContext(GameDataContext);
  const [leaveModalActive, setLeaveModalActive] = useState(false);
  const [suggestModalActive, setSuggestModalActive] = useState(false);
  const [suggestBtn, setSuggestBtn] = useState(true);

  useGameData();
  const { currentPlayer, playersWithoutCurrent } = usePlayers();

  const submitCharacter = useCallback(
    async (playerName, characterName) => {
      await suggestCharacter(
        playerId,
        gameData.id || sessionStorage.gameId,
        playerName.trim(),
        characterName.trim()
      );
      setSuggestModalActive(false);
      setSuggestBtn(false);
    },
    [playerId, gameData.id]
  );

  return (
    <ScreenWrapper>
      <div className="input-screen">
        {currentPlayer && currentPlayer.nickname ? (
          <>
            <Header
              className="suggest-character"
              type="game-lobby"
              timer={gameData.timer || 120}
            />
            <div className="input-screen__player">
              <div className="input-screen__player-card-wrapper">
                {currentPlayer && (
                  <PlayerCard
                    avatarClassName={currentPlayer.avatar}
                    name={currentPlayer.nickname}
                    playerStatusClassName={
                      currentPlayer.state === READY ? 'yes' : 'unsure'
                    }
                    isYou
                  />
                )}
                {playersWithoutCurrent.map((player) => (
                  <PlayerCard
                    key={player.player.id}
                    avatarClassName={player.avatar}
                    name={player.nickname}
                    playerStatusClassName={
                      player.state === READY ? 'yes' : 'unsure'
                    }
                  />
                ))}
              </div>
              <div className="input-screen__btn-wrapper">
                {suggestBtn && currentPlayer && currentPlayer.state !== READY && (
                  <Btn
                    className={['btn-green-solid']}
                    onClick={() => setSuggestModalActive(true)}
                  >
                    Suggest a character
                  </Btn>
                )}
                <Btn
                  className={['btn-pink-solid']}
                  onClick={() => {
                    setLeaveModalActive(true);
                  }}
                >
                  LEAVE GAME
                </Btn>
              </div>
            </div>
          </>
        ) : (
          <div className="spinner-wrapper">
            <Spinner appearance="invert" />
          </div>
        )}
        <LeaveGameModal
          active={leaveModalActive}
          onCancel={() => setLeaveModalActive(false)}
        />
        {currentPlayer && (
          <SelectCharacterModal
            player={currentPlayer.nickname}
            active={suggestModalActive}
            onSubmit={submitCharacter}
            onCancel={() => setSuggestModalActive(false)}
          />
        )}
      </div>
    </ScreenWrapper>
  );
}

export default Lobby;
