import React from 'react';
import classnames from 'classnames';
import { regUser } from './actions';
import  App  from './App';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FileUpload } from 'redux-file-upload';

class RegisterForm extends React.Component {
  state = {
    username: '',
    pws:  '',
    errors: {},
    redirect: false,
    loading: false
  }

regUser = ({ title, cover }) => {
   const { username, pws } = this.state;
   console.log("regUser +++++++++ ="+this.state);
      return this.props.regUser({ username, pws }).then(
        () => { this.setState({ redirect: true })},
      );
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
    if (this.state.username === '') errors.username = "Can't be empty!!";
    if (this.state.pws === '') errors.pws = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { username, pws } = this.state;

      this.setState({ loading: true });
       
      this.regUser({ username, pws })
        .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    }
  }



  render() {
    const form = (
      <div >
      <App />
      <form className={classnames('ui', 'form')} onSubmit={this.handleSubmit}>
        <h2>Register Form </h2>

        {!! this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.username})}>
          <label htmlFor="username">User Name</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
          />
          <span>{this.state.errors.username}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.pws})}>
          <label htmlFor="pws">Password</label>
          <input type="Password"
            name="pws"
            value={this.state.pws}
            onChange={this.handleChange}
            id="pws"
          />
          <span>{this.state.errors.pws}</span>

         

        </div>

 
        

        <div className="field">
          <button className="ui primary button">Register</button>
        </div>
      </form>
      </div>
    );
    return (
      <div>
      

{
        
          
this.state.redirect ?

      <Redirect to="/games" /> :              
            form

        }

        
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  if (props.match.params._id) {
    console.log("ZZZZZZZZZZZZ  "+JSON.stringify(state.users[0]));
    return {
      user: state.users.find(item => item._id === props.match.params._id)     
    }
  }

  return { user: null };
}

export default connect(mapStateToProps, { regUser })(RegisterForm);

