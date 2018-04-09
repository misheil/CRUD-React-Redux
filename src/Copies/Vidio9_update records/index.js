import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import GamesPage from './GamesPage';
import GameFormPage from './GameFormPage';
import Home from './Home';


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


ReactDOM.render(
  
    <Provider store={store}>
    <Router><div>
    <Route exact path='/' component={Home} />
    <Route exact path='/games' component={GamesPage} />
    <Route exact path='/games/new' component={GameFormPage} />
    <Route exact path='/game/:_id'  component={GameFormPage} />

    
  </div></Router>
  </ Provider>
    
  , document.getElementById('root'));

