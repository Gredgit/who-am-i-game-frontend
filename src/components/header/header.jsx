import GameTitle from '../game-title/game-title';
import Btn from '../btn/btn';
import LeaveGameModal from '../modals/leave-game';
import CountdownTimer from '../timer/timer-countdown/timer-countdown';
import clsx from 'clsx';
import { useCallback, useContext, useState } from 'react';
import './header.scss';
import CreateNewLobbyModal from '../modals/create-new-lobby';
import { GAME_LOBBY } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import GameDataContext from '../../contexts/game-data-context';

function Header({ className, type, lobby, startGame, timer }) {
  const { leaveGame } = useContext(GameDataContext);
  const [leaveModalActive, setLeaveModalActive] = useState(false);
  const [createModalActive, setCreateModalActive] = useState(false);
  const navigate = useNavigate();

  const createNewLobbySubmit = (event) => {
    event.preventDefault();
    setCreateModalActive(false);
    navigate(GAME_LOBBY);
  };

  const onTimerFinish = useCallback(async () => {
    navigate('/');
    await leaveGame();
  }, [leaveGame, navigate]);

  return (
    <header className={clsx('game-header', className)}>
      <GameTitle className={'small'} />
      {type === 'game-lobby' && (
        <>
          <div className="game-header__title">SUGGEST A CHARACTER</div>
          <div className="game-header__timer-wrapper">
            {!!timer && (
              <CountdownTimer
                inLobby={clsx({ 'in-lobby': type === 'game-lobby' })}
                time={timer}
                onFinish={onTimerFinish}
              />
            )}
          </div>
        </>
      )}
      {type === 'lobbies' && (
        <>
          <div>LOBBIES</div>
          <div className="create-btn-wrapper">
            <Btn
              className="btn-green-solid"
              onClick={() => setCreateModalActive(true)}
            >
              CREATE NEW LOBBY
            </Btn>
          </div>

          <CreateNewLobbyModal
            active={createModalActive}
            onSubmit={createNewLobbySubmit}
            onCancel={() => setCreateModalActive(false)}
          />
        </>
      )}

      {type === 'play-game' && (
        <>
          <div className="game-header__leave-btn-wrapper">
            <Btn
              className={['btn-pink-solid', 'btn-rounded']}
              onClick={() => setLeaveModalActive(true)}
            >
              LEAVE GAME
            </Btn>
          </div>

          <LeaveGameModal
            active={leaveModalActive}
            onCancel={() => setLeaveModalActive(false)}
          />
        </>
      )}

      {type === 'lobby' && (
        <>
          {startGame && (
            <CountdownTimer
              time={15}
              inLobby
              small="v-small"
              timeClassName="colored"
            />
          )}
          <div className="game-header__title">LOBBY:{lobby}</div>
        </>
      )}
    </header>
  );
}

export default Header;
