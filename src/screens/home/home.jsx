import GameTitle from '../../components/game-title/game-title';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameDataContext from '../../contexts/game-data-context';
import { useContext, useEffect, useState } from 'react';
import {
  WAITING_FOR_PLAYERS,
  SUGGESTING_CHARACTERS,
  LOADING,
  LOBBY,
} from '../../constants/constants';
import './home.scss';
import PlayersOnlineTitle from '../../components/players-online-title/players-online-title';
import AfterLogin from './AfterLogin';
import BeforeLogin from './BeforeLogin';

function Homepage() {
  const { gameData } = useContext(GameDataContext);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData.data.status === WAITING_FOR_PLAYERS) {
      navigate(LOADING);
    } else if (gameData.data.status === SUGGESTING_CHARACTERS) {
      navigate(LOBBY);
    }
  }, [gameData, navigate]);

  return (
    <ScreenWrapper>
      <GameTitle />
      <PlayersOnlineTitle />
      {isLogin ? (
        <AfterLogin setIsLogin={setIsLogin} />
      ) : (
        <BeforeLogin setIsLogin={setIsLogin} />
      )}
    </ScreenWrapper>
  );
}

export default Homepage;
