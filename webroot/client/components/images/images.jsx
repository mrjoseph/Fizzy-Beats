import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
const Images = ({ userId }) => {
    return     <Query query={GET_ASSETS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      const { files } = data.getAssets[0];
      
      return (
        <div>{
            files.map(({name}) => {
            return (
              <img key={name} src={`http://localhost:3003/static/${userId}/${name}`} alt="" />
            )
          })
        }</div>
      );
    }}
    </Query>
}
export const GET_ASSETS_QUERY = gql`
  query {
    getAssets{
    files {
      name
    }
  }
 }
`;

export default Images;