import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveGame, fetchGame, updateGame } from './actions';
import GameForm from './GameForm';

class GameFormPage extends React.Component {

  state = {
    redirect: false
  }

//we did this in the case if we clicked on edit game and the refresh the page to prevent from loos data follow this 1 step
  componentDidMount = () => {
    if (this.props.match.params._id) {
      this.props.fetchGame(this.props.match.params._id);
    }
  }

  saveGame = ({_id, title, cover }) => {
    if (_id) {
      return this.props.updateGame({ _id, title, cover }).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
      return this.props.saveGame({ title, cover }).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    return (
      <div>
        {
          // console.log("zzzzzz= "+JSON.stringify(this.props.game) )
          
this.state.redirect ?

      <Redirect to="/games" /> :              
           <GameForm
            game={this.props.game}
            saveGame={this.saveGame}
          />

        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  if (props.match.params._id) {
    console.log("ZZZZZZZZZZZZ  "+JSON.stringify(state.games[0]));
    return {
      game: state.games.find(item => item._id === props.match.params._id)     
    }
  }

  return { game: null };
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameFormPage);