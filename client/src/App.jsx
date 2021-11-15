import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Level1 from './components/Level1.jsx';
import Level2 from './components/Level2.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Level1 />} />
          <Route exact path='/level2' element={<Level2 />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
