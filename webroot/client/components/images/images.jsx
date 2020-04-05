import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Query } from 'react-apollo';
import { Li, Image, ImageContainer } from './images.styles';

import gql from 'graphql-tag';
class Images extends Component {
  componentDidUpdate(){
   // this.props.assets.refetch()
  }
  render(){
    console.log(this.props);
    // const { loading, error, assets: { getUser }, userId } = this.props;
    // if (loading) return "Loading...";
    // if (error) return `Error! ${error.message}`;
    // if(getUser) {
    //     const { file } = getUser.assets;
      
    //     return (
    //       <ImageContainer>{getAsset.assets.map(({ file }) => {
    //        const { name } = file;
    //         // if(type === 'audio/mp3'){
    //           return (
    //             <Li key={name}>
    //             name: {name} <br />
    //               <audio controls>
    //                 <source src={`http://localhost:3003/static/${userId}/${name}`} type="audio/mpeg" />
    //               </audio>
    //             </Li>
    //           )
    //         // }
    //         // if(type === 'image/jpeg'){
    //         //   return (
    //         //     <Li key={name}>
    //         //     <Image src={`http://localhost:3003/static/${userId}/${name}`} alt="" />
    //         //     </Li>
    //         //   )
    //         // }
    //         return null;

    //       })}</ImageContainer>
    //     )
    //    } 
      // return null;
      return <div>asdas</div>
  
    }
  

}
export const GET_ASSETS_QUERY = gql`
  query($userId: String!){
    getUser(userId: $userId){
      username
      id
      assets{
        userId
        file{
          name
          type
          size
        }
      }
    }
  }
`;
export default Images;
// export default graphql(GET_ASSETS_QUERY,{
//   name: 'assets',
//   options: (props) =>
//     ({
//       variables: {
//         userId: props.userId
//       }
//     })
  
// })(Images);
