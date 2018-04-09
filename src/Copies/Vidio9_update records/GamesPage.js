import React from 'react';
import { connect } from 'react-redux';
import GamesList from './GamesList';
// import PropTypes from 'prop-types'
import { fetchGames } from './actions';
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
			
			<GamesList games={this.props.games} />
			</div>
			)
	}
}


function mapStateToProps(state){
	return{
	games: state.games
	}
};
export default connect (mapStateToProps,{fetchGames})(GamesPage);