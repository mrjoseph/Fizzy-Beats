import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { ADD_USER_MUTATION, GET_USER_QUERY } from '../../graphql/queries/queries';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Anna Havunta',
      password: 'password',
      // confirmPassword: '',
      email: 'anna.havunta@gmail.com'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  currentUsers(){
    const { getUserQuery: { users } } = this.props;
    if(users) {
      return(
          <div>
            <ul>
              {users.map((user) => {
                return (
                    <li key={user.id}>
                      <b>Username: </b>{user.username}{', '}{user.email}{', '}{user.password}
                    </li>
                );
              })}
            </ul>
          </div>
      );
    } return (
        <div>loading</div>
    )
  }
  handleSubmit(e){
    e.preventDefault();
    const { addUser } = this.props;

    const { username, email, password } = this.state;
    console.log(username, email, password);
    addUser(
        { variables:
              { username,
                email,
                password
              },
          refetchQueries: [{ query: GET_USER_QUERY }]
        },
    );
  }

  render(){
    return(
        <div>
          {this.currentUsers()}
          <form id="add-book" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>Username:</label>
              <input type="text" onChange={(e) => this.setState({username: e.target.value})} value={this.state.username}/>
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="text" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email}/>
            </div>
            <div className="field">
              <label>Password:</label>
              <input type="text" onChange={(e) => this.setState({password: e.target.value})} value={this.state.password}/>
            </div>

            <button>Sign up</button>
          </form>
        </div>
    );
  }
}

export default compose(
    graphql(GET_USER_QUERY, {name: "getUserQuery"}),
    graphql(ADD_USER_MUTATION, {name: "addUser"}),
)(Register);

