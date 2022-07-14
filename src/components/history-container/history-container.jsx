import HistoryItem from '../history-item/history-item';
import QuestionForm from '../question-form/question-form';
import { useEffect, useRef, useState } from 'react';
import { users, history } from '../../store/mock-data';
import AnswerForm from '../answer-form/answer-form';
import MessageBlock from '../message-block/message-block';
import './history-container.scss';
import { answerQuestion, askQuestion } from '../../services/games-service';
import {
  ANSWERING,
  ASKING,
  GUESSING,
  RESPONSE,
  WAITING,
} from '../../constants/constants';
import { useContext } from 'react';
import GameDataContext from '../../contexts/game-data-context';

function HistoryContainer({ mode, currentPlayer }) {
  const { gameData, playerId } = useContext(GameDataContext);
  const [message, setMessage] = useState('yes');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [disabled, setDisabled] = useState(false);
  const bottomElement = useRef(null);

  useEffect(() => {
    const listBottom = bottomElement.current;

    if (!listBottom) return;

    listBottom.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  });

  const sendQuestionHandler = async () => {
    if (currentQuestion !== '') {
      history.push({ user: currentPlayer, question: currentQuestion });
      try {
        await askQuestion(playerId, gameData.id, currentQuestion);
        setCurrentQuestion('');
        setDisabled(true);
      } catch (error) {
        //to do: handle error
      }
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const answer = event.nativeEvent.submitter.value;
    setMessage(answer);
    try {
      await answerQuestion(playerId, gameData.id, answer);
    } catch (error) {
      //to do: handle error
    }
  };

  return (
    <div className="history">
      <div className="history_list">
        {history.map((item, index) => (
          <HistoryItem users={users} question={item} key={index} />
        ))}
        <div className="list_scroll_bottom" ref={bottomElement}></div>
      </div>
      {mode === ASKING && !disabled && (
        <QuestionForm
          setCurrentQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
          sendQuestion={sendQuestionHandler}
        />
      )}
      {(mode === ANSWERING || mode === GUESSING) && (
        <AnswerForm mode={mode} onClick={handleClick} />
      )}
      {(mode === RESPONSE || mode === WAITING) && (
        <MessageBlock mode={mode} message={message} />
      )}
    </div>
  );
}

export default HistoryContainer;
