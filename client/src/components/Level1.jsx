import React from 'react';
import { Input, Button, Progress, Divider } from 'antd';
import { level1 } from '../data.js';

class Level1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      timeOut: false,
      timer: 10,
      round: 0,
      randomTense: '',
      wrongAnswer: '',
      wrongAnswers: []
    };
    this.getRandomTense = this.getRandomTense.bind(this);
    this.startTimeOut = this.startTimeOut.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkMatched = this.checkMatched.bind(this);
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

  handleRestart() {
    this.setState({ timer: 10, timeOut: false, wrongAnswer: '' });
    this.startTimeOut();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('hello')

    if (this.state.timeOut) {
      return alert('Please click restart button to keep going');
    }
    if (!this.state.value.trim()) {
      return alert('Please type something first');
    }

    this.setState({ value: '', wrongAnswer: '' });

    this.checkMatched();
  }

  checkMatched() {
    (this.state.randomTense === 'simple' ? level1[this.state.round].simple : level1[this.state.round].past)
      === this.state.value ?
      this.setState({ round: this.state.round + 1, timer: 10, wrongAnswer: '' }, () => {
        this.getRandomTense();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.setState({ timeOut: true });
        }, 10000);

      })
      :
      this.setState({
        wrongAnswer: this.state.randomTense === 'simple' ? `${level1[this.state.round].simple}`
          : `${level1[this.state.round].past}`
      }, () => {
        this.setState({
          round: this.state.round + 1, timer: 10, wrongAnswers: this.state.wrongAnswers.concat(level1[this.state.round].voca)
        });
        this.getRandomTense();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.setState({ timeOut: true });
        }, 10000);
      });
  }

  render() {
    return (
      <div style={{ padding: '1rem', border: '1px solid grey', borderRadius: '4px', maxWidth: 400, margin: '3rem, auto' }} >
        <h1>Vocabulary Quiz</h1>
        <Progress percent={0} status='active' />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>LEVEL 1</h2>
          <h2>1/5</h2>
        </div>
        <span style={{ marginBottom: 0, color: 'grey' }}>Infinitive</span>
        <h2>Voca</h2>
        <div style={{ fontSize: '1rem' }}>Answer the voca's <span style={{ color: 'red' }}>past participle</span></div>
        <form style={{ padding: '1rem 0' }} onSubmit={this.handleSubmit}>
          <div style={{ display: 'flex' }}>
            <Input name='value' onChange={this.handleChange} id='voca' type="text" />
          </div>
          <Button className type='submit' onClick={this.handleSubmit}>Submit</Button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={this.state.timer <= 8 ? true : false}>5</Button>
          <Button disabled={this.state.timer <= 6 ? true : false}>4</Button>
          <Button disabled={this.state.timer <= 4 ? true : false}>3</Button>
          <Button disabled={this.state.timer <= 2 ? true : false}>2</Button>
          <Button disabled={this.state.timer <= 0 ? true : false}>1</Button>
          <Button onClick={this.handleRestart} style={{ display: this.state.timeOut ? 'block' : 'none' }}>Click to Restart!</Button>
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
      </div >
    );
  }
}

export default Level1;
