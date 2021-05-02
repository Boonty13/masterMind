import './App.css';
import React, { useState } from 'react';
import { Input, Button, Badge } from 'reactstrap';

function App() {

  const [secretCode, setSecretCode] = useState(['bleu', 'vert', 'bleu', 'violet'])
  const [inputCode, setInputCode] = useState([])
  let proposition

  const handleClick = async () => {

    ///// Sending request to server //////
    const rawAnswer = await fetch('http://localhost:3001/validate-input', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputCode: ['bleu', 'vert', 'bleu', 'violet']
      })
    });
    const answer = await rawAnswer.json();
    console.log(answer)
  }

  const addColor = (color) => {
    let newInputCode = [...inputCode]
    newInputCode.push(color)
    console.log(color)
    setInputCode(newInputCode)

    proposition = newInputCode.map((color) => {
      return (
        <Badge style={{ backgroundColor: 'red', borderRadius: '50%', margin: '5px', width: '30px', height: '30px' }} onClick={() => { console.log('rouge') }}></Badge>
      )
    })
    console.log(proposition)
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <p>Ma proposition : {proposition}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', height: '70px' }}>

        <Badge style={{ backgroundColor: 'red', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('rouge') }}></Badge>
        <Badge style={{ backgroundColor: 'yellow', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('jaune') }}></Badge>
        <Badge style={{ backgroundColor: 'blue', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('bleu') }}></Badge>
        <Badge style={{ backgroundColor: 'violet', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('violet') }}></Badge>
        <Badge style={{ backgroundColor: 'orange', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('orange') }}></Badge>
        <Badge style={{ backgroundColor: 'green', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('vert') }}></Badge>

      </div>

      <Button color='info' onClick={() => handleClick()}>VALIDER</Button>
    </div>
  );
}

export default App;
