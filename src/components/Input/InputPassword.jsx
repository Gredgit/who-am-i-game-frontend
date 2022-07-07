import clsx from 'clsx';
import { useState } from 'react';
import './input.scss';

const InputPassword = ({ className, error, ...attrs }) => {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const showPassClick = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type={toggleShowPassword ? 'text' : 'password'}
          className={clsx('input', className, { error })}
          {...attrs}
        />
        <div
          className={toggleShowPassword ? 'eye-slash-icon' : 'eye-icon'}
          onClick={showPassClick}
        ></div>
      </div>
      {error && <div className="inputError">{error}</div>}
    </div>
  );
};

export default InputPassword;
