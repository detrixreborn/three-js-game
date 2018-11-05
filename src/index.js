import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from "./GameComponent";

ReactDOM.render(
  <GameContainer/>,
  document.getElementById('app')
);

module.hot.accept();