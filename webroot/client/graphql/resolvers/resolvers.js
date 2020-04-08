import gql from 'graphql-tag';
export const resolvers = {
  Query: {
    audio: (_, variables, {cache}) => {
     // const tog = cache.readFragment({ id, fragment });
      console.log('what the fuck is going on')
    }
  },
    Mutation: {
      setTextColor: (_, variables, {cache}) => {
        console.log(variables)
        const newTextColor = { value: !variables.color,   __typename: "TextColor"};
        const data = { textColor: newTextColor };
        cache.writeData({ data })
        return newTextColor;
      },
      playAudio: (_, {name, userId, id}, {cache}) => {
        const newAudio = {
          name,
          userId,
          id,
          __typename: "Audio"
        };

      console.log(newAudio)
        const data = { audio: newAudio };
        cache.writeData({ data })
        return newAudio;
      },
      toggleAudio: (_,variables,{cache}) => {
        
        resetAudioPLayer(variables.assetsId, cache);
    
        const id = `ToggleAudio:${variables.id}`;
        const fragment = gql`
          fragment toggled on ToggleAudio {
            toggle
            id
            status
          }
        `;
        const tog = cache.readFragment({ id, fragment });
        const toggle = {
          assetsId: variables.assetsId,
          toggle: variables.toggle,
          id: variables.id,
          status: variables.status,
          __typename: "ToggleAudio"
        }
      
        const data = { toggleAudio: toggle };
        cache.writeData({ data })
        return toggle;
      }
    }
  };
  

  const resetAudioPLayer = (assetsId, cache) => {
    return assetsId.forEach((items, index, array) => {
      let toggle;
      const id = `ToggleAudio:${items}`;
      const fragment = gql`
        fragment toggled on ToggleAudio {
          toggle
          id
          status
        }
      `;
      const tog = cache.readFragment({ id, fragment });
      if(tog !== null) {
        toggle = {
          ...tog,
          toggle: false,
          assetsId: array,
          status: 'pause',
          __typename: "ToggleAudio"
        }
        const data = { toggleAudio: toggle }
        cache.writeData({ data })
      }
    })
  }