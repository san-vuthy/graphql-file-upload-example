import React from 'react';
import logo from './logo.svg';
import './App.css';
import   gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const UploadFile = () => (
  <Mutation
    mutation={gql`
      mutation($file: Upload!) {
        upload_image(file: $file) {
          name
        }
      }
    `}
  >
    {mutate => (
      <input
        type="file"
        required
        onChange={({
          target: {
            validity,
            files: [file]
          }
        }) => validity.valid && mutate({ variables: { file } })
              .then(res => console.log(res.data))
      }
      />
    )}
  </Mutation>
)

function App() {
  return (
    <div className="App">
      {UploadFile()}
    </div>
  );
}

export default App;
