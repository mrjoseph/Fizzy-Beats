import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Query } from 'react-apollo';
import { Li, Image, ImageContainer } from './images.styles';

import gql from 'graphql-tag';
class Images extends Component {
  componentDidUpdate(){
    this.props.assets.refetch()
  }
  render(){
    const { loading, error, assets: { getAsset }, userId } = this.props;
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    if(getAsset) {
        const { files } = getAsset;
        return (
          <ImageContainer>{files.map(({ name, size, type }) => {
            if(type === 'audio/mp3'){
              return (
                <Li key={name}>
                  <audio controls>
                    <source src={`http://localhost:3003/static/${userId}/${name}`} type="audio/mpeg" />
                  </audio>
                </Li>
              )
            }
            if(type === 'image/jpeg'){
              return (
                <Li key={name}>
                <Image src={`http://localhost:3003/static/${userId}/${name}`} alt="" />
                </Li>
              )
            }
            return null;

          })}</ImageContainer>
        )
      } 
      return null;
  
    }
  

}
export const GET_ASSETS_QUERY = gql`
  query($userId: String!){
    getAsset(userId: $userId){
      files{
        name
        type
        size
      }
    }
  }
`;

export default graphql(GET_ASSETS_QUERY,{
  name: 'assets',
  options: (props) =>
    ({
      variables: {
        userId: props.userId
      }
    })
  
})(Images);
