import Btn from '../btn/btn';
import ModalWrapper from './modal-wrapper';
import './modal.scss';

function ReadyToPlayModal({ active, onSubmit, onCancel }) {
  if (!active) {
    return null;
  }

  return (
    <ModalWrapper title="STARTING A GAME" onCancel={onCancel} timer>
      <form className="modal-form" onSubmit={onSubmit}>
        <div>
          <p className="modal__question">Lobby owner started a game.</p>
          <p className="modal__question">Are you ready?</p>
        </div>
        <div className="modal__buttons-container">
          <Btn type="submit" className="btn-green-solid">
            I'M READY
          </Btn>
          <Btn className="btn-pink-solid" onClick={onCancel}>
            LEAVE
          </Btn>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default ReadyToPlayModal;
