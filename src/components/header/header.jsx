import GameTitle from '../game-title/game-title';
import LeaveGameBtn from '../leave-game-btn/leave-game-btn';
import LeaveGameModal from '../modals/leave-game/leave-game';
import { useState } from 'react';
import './header.scss';

function Header() {
  const [displayModal, setDisplayModal] = useState(false);

  return (
    <header className="game-header">
      <GameTitle className={'small'} />
      <LeaveGameBtn className={'game-page'} setModalActive={setDisplayModal} />
      <LeaveGameModal
        showModal={displayModal}
        setModalActive={setDisplayModal}
      />
    </header>
  );
}

export default Header;
