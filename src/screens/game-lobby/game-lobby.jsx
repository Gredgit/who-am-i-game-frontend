import { useState } from 'react';
import Btn from '../../components/btn/btn';
import Header from '../../components/header/header';
import LeaveGameModal from '../../components/modals/leave-game';
import PlayerCard from '../../components/player-card/player-card';
import ReadyToPlayModal from '../../components/modals/ready-to-play';
import { READY } from '../../constants/constants';
import { currentUser, users } from '../../store/mock-data';
import './game-lobby.scss';

function GameLobby() {
  const [leaveModalActive, setLeaveModalActive] = useState(false);
  const [readyPlayModalActive, setReadyPlayModalActive] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [lobbyOwner] = useState(true);

  const theme = 'Actors';
  const type = 'Public';
  const link = 'https://payco.link/25841';
  const number = '5';
  const maxNumber = '12';
  const players = users;

  const onSubmit = (event) => {
    event.preventDefault();
    setReadyPlayModalActive(false);
  };

  return (
    <div className="lobby-screen">
      <Header type="lobby" lobby={299483} startGame={startGame} />
      <div className="lobby-screen__content-wrapper">
        <div className="lobby-screen__players-list">
          <div className="lobby-screen__header">
            <div>{theme}</div>
            <div>{maxNumber} players</div>
            <div>{type}</div>
            <div>{link}</div>
            <div className="button-wrapper">
              <Btn className="btn-green-solid btn-rounded btn-with-fields">
                SHARE
              </Btn>
            </div>
          </div>
          <div className="players-number">
            {number}/{maxNumber} players
          </div>
          {currentUser && (
            <PlayerCard
              key={currentUser.id}
              avatarClassName={currentUser.avatar}
              name={currentUser.nickname}
              playerStatusClassName={
                currentUser.state === READY ? 'yes' : 'unsure'
              }
              isYou
              lobbyOwner={lobbyOwner}
            />
          )}
          {players ? (
            players.map((player, index) => (
              <PlayerCard
                key={player.player.id}
                avatarClassName={player.avatar}
                name={player.nickname}
                playerStatusClassName={
                  player.state === READY ? 'yes' : 'unsure'
                }
                lobbyOwner={index === 1 && !lobbyOwner}
              />
            ))
          ) : (
            <h1>Something went wrong</h1>
          )}
        </div>
        <div className="btns-wrapper">
          {lobbyOwner ? (
            startGame ? (
              <Btn
                className="btn-pink-solid"
                onClick={() => setStartGame(false)}
              >
                CANCEL
              </Btn>
            ) : (
              <>
                <Btn
                  className="btn-green-solid"
                  onClick={() => setStartGame(true)}
                >
                  Start a game
                </Btn>
                <Btn
                  className="btn-pink-solid"
                  onClick={() => setReadyPlayModalActive(true)}
                >
                  TERMINATE LOBBY
                </Btn>
              </>
            )
          ) : (
            <Btn
              className={['btn-pink-solid']}
              onClick={() => setLeaveModalActive(true)}
            >
              LEAVE GAME
            </Btn>
          )}
        </div>
      </div>
      <LeaveGameModal
        active={leaveModalActive}
        onCancel={() => setLeaveModalActive(false)}
      />
      <ReadyToPlayModal
        active={readyPlayModalActive}
        onCancel={() => setLeaveModalActive(true)}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default GameLobby;
