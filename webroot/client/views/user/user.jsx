import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        Users {
            name
            id
        }
    }
`;

class User extends Component {
  render(){
    const { data: { users } } = this.props;
    console.log(users);
    if(books) {
      return(
        <div>
          <ul>
            {books.map((book) => {
              return (
                <li key={book.id}>{book.name}</li>
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

export default graphql(getBooksQuery)(User);