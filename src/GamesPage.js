import React from 'react';
import { connect } from 'react-redux';
import GamesList from './GamesList';
import PropTypes from 'prop-types'

// In big application divide actions into separet action files
import { fetchGames,deleteGame } from './actions';
import  App  from './App';

class GamesPage extends React.Component{
	componentDidMount(){
		this.props.fetchGames();
	}
	render(){
		return(
			<div>
			<App />
			<h1>Games List </h1>
			
			<GamesList games={this.props.games} deleteGame={this.props.deleteGame} />
			</div>
			)
	}
}



GamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired
}

// To get the content of redux store to this page using connet

function mapStateToProps(state){
	return{
	games: state.games
	}
};
export default connect (mapStateToProps,{fetchGames,deleteGame})(GamesPage);