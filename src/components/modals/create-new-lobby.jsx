import { useState, useEffect } from 'react';
import Btn from '../btn/btn';
import ModalWrapper from './modal-wrapper';
import './modal.scss';

function CreateNewLobbyModal({ active, onSubmit, onCancel }) {
  const [theme, setTheme] = useState('');
  const [number, setNumber] = useState('');
  const [privateLobby, setPrivateLobby] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      setTheme('');
      setNumber('');
      setPassword('');
      setPrivateLobby(false);
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <ModalWrapper title="CREATE NEW LOBBY" onCancel={onCancel}>
      <form className="modal-form" onSubmit={onSubmit}>
        <select
          name="lobbyTheme"
          className="modal__select-field"
          onChange={(event) => {
            setTheme(event.target.value);
          }}
        >
          <option className="d-none" value="">
            Lobby theme
          </option>
          <option value="Actors">Actors</option>
          <option value="Astronauts">Astronauts</option>
          <option value="Superheroes">Superheroes</option>
        </select>
        <select
          name="numberOfPlayers"
          className="modal__select-field"
          onChange={(event) => {
            setNumber(event.target.value);
          }}
        >
          <option className="d-none" value="">
            Number of players
          </option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <div className="modal__checkbox">
          <input
            id="lobbyType"
            className="checkbox-input"
            type="checkbox"
            value="Private"
            onChange={() => setPrivateLobby((state) => !state)}
          />
          <label htmlFor="lobbyType" className={privateLobby.toString()}>
            Private lobby
          </label>
        </div>
        {privateLobby && (
          <input
            className="modal__input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        )}
        <div className="modal__buttons-container">
          <Btn
            className="btn-green-solid btn-half"
            type="submit"
            disabled={
              !theme || !number || (privateLobby && password.length < 8)
            }
          >
            CREATE
          </Btn>
          <Btn className="modal__cancel-btn btn-half" onClick={onCancel}>
            CANCEL
          </Btn>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default CreateNewLobbyModal;
