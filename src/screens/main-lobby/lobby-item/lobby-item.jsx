import clsx from 'clsx';
import Btn from '../../../components/btn/btn';
import { useNavigate } from 'react-router-dom';
import './lobby-item.scss';
import { GAME_LOBBY } from '../../../constants/constants';

function LobbyItem({
  className,
  theme,
  numberOfPlayers,
  type,
  icon,
  setJoinLobbyActive,
}) {
  const navigate = useNavigate();
  const joinLobbyClickHandler = () => {
    if (type === 'Private') {
      setJoinLobbyActive(true);
    } else {
      navigate(GAME_LOBBY);
    }
  };

  return (
    <tr className={clsx('lobby-item', className)}>
      <td className="lobby-item__column">
        {icon && <div className="icon icon-green"></div>}
        {theme}
      </td>
      <td className="lobby-item__column">
        {icon && <div className="icon"></div>}
        {numberOfPlayers}
      </td>
      <td className="lobby-item__column type">
        {icon && <div className="icon"></div>}
        {type}
      </td>
      <td>
        <div className={clsx('btn-wrapper', className)}>
          <Btn
            className="btn-green-solid btn-rounded btn-with-fields"
            onClick={joinLobbyClickHandler}
          >
            JOIN
          </Btn>
        </div>
      </td>
    </tr>
  );
}

export default LobbyItem;
