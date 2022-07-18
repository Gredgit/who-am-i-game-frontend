import './answer-icon.scss';
import { ReactComponent as ReactCheck } from '../../assets/svg/check.svg';
import { ReactComponent as ReactQuestion } from '../../assets/svg/question-mark.svg';
import { ReactComponent as ReactCross } from '../../assets/svg/x.svg';
import clsx from 'clsx';

function AnswerIcon({ status, avatar }) {
  let icon = null;
  const classes = 'icon_status';

  switch (status) {
    case 'YES':
      icon = <ReactCheck className={classes} />;
      break;
    case 'NO':
      icon = <ReactCross className={classes} />;
      break;
    default:
      icon = <ReactQuestion className={classes} />;
      break;
  }

  return (
    <div className="icon_wrapper">
      <div className={clsx('player__card-avatar', avatar)}></div>
      {status && icon}
    </div>
  );
}

export default AnswerIcon;
