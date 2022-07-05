import clsx from 'clsx';
import { useState, useEffect } from 'react';
import Btn from '../btn/btn';
import ModalWrapper from './modal-wrapper';
import './modal.scss';

function JoinLobbyModal({ active, onSubmit, onCancel }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const password = 'password';

  useEffect(() => {
    return () => {
      setInputValue('');
    };
  }, [active]);

  if (!active) {
    return null;
  }

  const inputPasswordHandler = (event) => {
    setInputValue(event.target.value);
    setError('');
  };

  const joinLobbySubmit = (event) => {
    event.preventDefault();

    if (inputValue !== password) setError('error');
    else {
      setError('');
      onSubmit();
    }
  };

  return (
    <ModalWrapper
      title="JOIN LOBBY"
      onCancel={() => {
        onCancel();
        setError('');
      }}
    >
      <form className="modal-form" onSubmit={joinLobbySubmit}>
        <p className="p">This is private lobby: Enter the password</p>
        <input
          className={clsx('modal__input-field', error)}
          type="password"
          placeholder="Password"
          onChange={inputPasswordHandler}
        />
        {error && <p className="error-message ">Wrong password</p>}
        <div className="modal__buttons-container">
          <Btn
            className="btn-green-solid btn-half"
            type="submit"
            disabled={inputValue.length < 3}
          >
            JOIN
          </Btn>
          <Btn
            className="modal__cancel-btn btn-half"
            onClick={() => {
              onCancel();
              setError('');
            }}
          >
            CANCEL
          </Btn>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default JoinLobbyModal;
