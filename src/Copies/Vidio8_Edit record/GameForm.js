import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { saveGame,fetchGame } from './actions';
import  App  from './App';


class GameForm extends React.Component {
  state = {
   _id: this.props.game ? this.props.game._id : null,
    title: this.props.game ? this.props.game.title : '',
    cover: this.props.game ? this.props.game.cover : '',
    errors: {},
    loading: false,
    done: false
  }

componentWillReceiveProps = (nextProps) => {
   // console.log("YYYYYYYYY = "+nextProps.game._id);
    this.setState({
      _id: nextProps.game._id,
      title: nextProps.game.title,
      cover: nextProps.game.cover
    });
  }


componentDidMount = () => {

   // console.log("XXXXXXXXXXx= "+this.props.match.params._id);
    if (this.props.match.params._id) {
      this.props.fetchGame(this.props.match.params._id);
    }
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.title === '') errors.title = "Can't be empty";
    if (this.state.cover === '') errors.cover = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id,title, cover } = this.state;
      this.setState({ loading: true });
      this.props.saveGame({ _id,title, cover }).then(
        () => { this.setState({ done: true })},
        (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
      );
    }
  }

  render() {
    const form = (
      <div >
      <App />
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h2>Add new game</h2>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.title})}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            id="title"
          />
          <span>{this.state.errors.title}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.cover})}>
          <label htmlFor="cover">Cover URL</label>
          <input
            name="cover"
            value={this.state.cover}
            onChange={this.handleChange}
            id="cover"
          />
          <span>{this.state.errors.cover}</span>
        </div>

        <div className="field">
          {this.state.cover !== '' && <img src={this.state.cover} alt="cover" className="ui small bordered image"/>}
        </div>

        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
      </div>
    );
    return (
      <div>
        { this.state.done ? this.props.history.push("/games") : form }
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  // console.log("AAAAAAAA = "+JSON.stringify(props.match.params._id));
  if (props.match.params._id) {
    return {
      game: state.games.find(item => item._id === props.match.params._id)
    }
  }

  return { game: null };
}

export default connect(mapStateToProps,  { saveGame,fetchGame })(GameForm);