import clsx from 'clsx';
import './input.scss';

const Input = ({ className, ...attrs }) => {
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input className={clsx('input', className)} {...attrs} />
      </div>
    </div>
  );
};

export default Input;
