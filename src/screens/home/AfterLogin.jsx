import { useContext } from 'react';
import Btn from '../../components/btn/btn';
import GameDataContext from '../../contexts/game-data-context';
import { createGame } from '../../services/games-service';
import {
  MAIN_LOBBY,
  NUMBER_OF_PLAYERS,
  PROFILE,
} from '../../constants/constants';
import { useNavigate } from 'react-router-dom';

function AfterLogin({ setIsLogin }) {
  const { setGameData, playerId } = useContext(GameDataContext);
  const navigate = useNavigate();

  return (
    <div className="after-login-wrapper">
      <div className="profile">
        <div className="profile__title">welcome</div>
        <div className="profile__body">
          <div className="profile__avatar"></div>
          <div className="profile__name">GreenDean</div>
          <div className="profile__edit-icon"></div>
        </div>
      </div>
      <Btn
        className={'btn-blue-outline'}
        onClick={async () => {
          setGameData(await createGame(playerId, NUMBER_OF_PLAYERS));
        }}
      >
        PLAY QUICK GAME
      </Btn>
      <Btn
        className={'btn-blue-outline'}
        onClick={() => {
          navigate(MAIN_LOBBY);
        }}
      >
        Lobbies
      </Btn>
      <Btn
        className={'btn-blue-outline'}
        onClick={() => {
          navigate(PROFILE);
        }}
      >
        profile
      </Btn>
      <Btn
        className={'btn-pink-outline'}
        onClick={() => {
          setIsLogin(false);
        }}
      >
        log out
      </Btn>
    </div>
  );
}

export default AfterLogin;
