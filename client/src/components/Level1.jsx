import React from 'react';
import { Input, Button, Progress, Divider } from 'antd';
import { level1 } from '../data.js';

class Level1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentWord: '',
      timeOut: false,
      timer: 10,
      round: 0,
      tense: '',
      wrongAnswer: '',
      wrongAnswres: []
    };
    this.getRandomTense = this.getRandomTense.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
  }

  componentDidMount() {
    this.getRandomTense();
    this.startTimeOut();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  startTimeOut() {
    this.timeout = setTimeout(() => {
      this.setState({ timeOut: true })
    }, 10000);

    this.interval = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 })
    }, 1000);
  }

  getRandomTense() {
    const tenseArray = ['simple', 'past'];
    const randomIndex = Math.floor(Math.random() * 2);
    this.setState({ tense: tenseArray[randomIndex] });
  }

  render() {
    return (
      <div style={{ padding: '1rem', border: '1px solid grey', borderRadius: '4px', maxWidth: 400, margin: '3rem, auto' }}>
        <h1>Vocabulary Quiz</h1>
        <Progress percent={0} status='active' />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>LEVEL 1</h2>
          <h2>1/5</h2>
        </div>
        <span style={{ marginBottom: 0, color: 'grey' }}>Infinitive</span>
        <h2>Voca</h2>
        <div style={{ fontSize: '1rem' }}>Answer the voca's <span style={{ color: 'red' }}>past participle</span></div>
        <form style={{ padding: '1rem 0' }}>
          <div style={{ display: 'flex' }}>
            <Input name='value' onChange value id='voca' type="text" />
          </div>
          <Button className type='submit' onClick>Submit</Button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button>5</Button>
          <Button>4</Button>
          <Button>3</Button>
          <Button>2</Button>
          <Button>1</Button>
          <Button>Click to Restart!</Button>
        </div>

        <Divider />

        <h3>Wrong! Correct answer: </h3>
        <div>
          <li style={{ display: 'block' }}>
            <p>
              icon answer
            </p>
          </li>
        </div>
        <h1>Review the wrong answers!</h1>
        <div>
          <ul>
            <li>answer</li>
            <li>answer</li>
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button>Retry</Button>
          <Button>Level 2</Button>
        </div>
      </div>
    );
  }
}

export default Level1;
