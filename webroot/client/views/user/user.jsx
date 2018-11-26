import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getUserQuery = gql`
{
  users {
    email
    username
    id
  }
}
`;

class User extends Component {
  render(){
    const { data: { users } } = this.props;
    if(users) {
      return(
        <div>
          <ul>
            {users.map((user) => {
              return (
                <li key={user.id}>
                  {user.username}
                  {user.email}
                  {user.password}
                  {user.salt}
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
}


export default graphql(getUserQuery)(User);
