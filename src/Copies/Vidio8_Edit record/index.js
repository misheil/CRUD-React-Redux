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
import GameForm from './GameForm';
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
    <Route exact path='/games/new' component={GameForm} />
    <Route exact path='/game/:_id'  component={GameForm} />

    
  </div></Router>
  </ Provider>
    
  , document.getElementById('root'));

