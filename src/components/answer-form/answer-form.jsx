import Btn from '../btn/btn';
import { ReactComponent as Check } from '../../assets/svg/check-icon-btn.svg';
import { ReactComponent as Question } from '../../assets/svg/question-icon-btn.svg';
import { ReactComponent as Cross } from '../../assets/svg/cross-icon-btn.svg';
import './answer-form.scss';
import { NO, NOT_SURE, YES } from '../../constants/constants';

function AnswerForm(props) {
  let btnRow = null;

  if (props.mode === 'answer') {
    btnRow = (
      <form className="row" onSubmit={props.onClick}>
        <Btn
          type="submit"
          className="btn-green-solid btn-third"
          name="answer"
          value={YES}
        >
          <Check fill="#1e1b18" />
          YES
        </Btn>
        <Btn type="submit" className="btn-pink-solid btn-third" value={NO}>
          <Cross fill="#1e1b18" />
          NO
        </Btn>
        <Btn
          type="submit"
          className="btn-orange-solid btn-third"
          value={NOT_SURE}
        >
          <Question fill="#1e1b18" />
          DON'T KNOW
        </Btn>
      </form>
    );
  }

  if (props.mode === 'guess') {
    btnRow = (
      <form className="row" onSubmit={props.onClick}>
        <Btn type="submit" className="btn-green-solid btn-half" value={YES}>
          <Check fill="#1e1b18" />
          YES
        </Btn>
        <Btn type="submit" className="btn-pink-solid btn-half" value={NO}>
          <Cross fill="#1e1b18" />
          NO
        </Btn>
      </form>
    );
  }

  return btnRow;
}

export default AnswerForm;
