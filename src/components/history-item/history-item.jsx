import clsx from 'clsx';
import AnswerIcon from '../answer-icon/answer-icon';
import './history-item.scss';

function HistoryItem(props) {
  const { user, question, answers, guess } = props.question;
  const users = props.users;

  return (
    <div className="history-item">
      <div className={clsx('history-item__question', guess)}>
        {guess && <span className="my-guess">My guess</span>}
        <div className={clsx('history-item__avatar', user.avatar)}></div>
        <p>{question}</p>
      </div>
      <div className="history-item__icons-box">
        {users.map((user) => (
          <AnswerIcon
            key={user.player.id}
            user={user}
            status={
              answers
                ? answers.find((answer) => answer.userId === user.player.id)
                    .status
                : null
            }
          />
        ))}
      </div>
    </div>
  );
}

export default HistoryItem;
