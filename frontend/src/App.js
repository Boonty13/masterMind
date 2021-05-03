import './App.css';
import React, { useEffect, useState } from 'react';
import { Input, Button, Badge } from 'reactstrap';

function App() {

  const validColors = ['blue', 'green', 'yellow', 'violet', 'red', 'orange']
  const [secretCode, setSecretCode] = useState([])
  const [inputCode, setInputCode] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const [historicProp, setHistoricProp] = useState([])
  const [historicEval, setHistoricEval] = useState([])
  const [win, setWin] = useState(false)

  // ------------------------ //

  useEffect(() => {
    resetGame()
  }, [])

  // ------------------------ //

  const validateInput = async () => {
    const rawAnswer = await fetch('http://localhost:3001/validate-input', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputCode
      })
    })
    const answer = await rawAnswer.json();

    if (answer.result) {
      setHistoricProp([...historicProp, answer.inputCode])
      evaluate()
    }
    setErrorMsg(answer.errorMsg)
  }

  const evaluate = async () => {
    const rawAnswer = await fetch('http://localhost:3001/evaluate-input', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputCode,
        secretCode
      })
    })
    const answer = await rawAnswer.json()

    if (answer.result) {
      setHistoricEval([...historicEval, answer.evaluation])
      if (answer.evaluation[0] === 4) {
        setWin(true)
      }
    }
  }

  // ------------------------ //

  const resetGame = () => {
    setWin(false)
    setHistoricEval([])
    setHistoricProp([])
    setInputCode([])
    setSecretCode([getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()])
  }

  const getRandomColor = () => {
    return validColors[Math.floor(Math.random() * 6)]
  }

  const addColor = (color) => {
    let newInputCode = [...inputCode]
    newInputCode.push(color)
    setInputCode(newInputCode)
  }

  const deleteColor = (pins) => {
    let newInputCode = [...inputCode]
    newInputCode.splice(pins.target.id, 1)
    setInputCode(newInputCode)
  }

  let proposition = inputCode.map((color, i) => {
    return (
      <Badge key={`pins${i}`} id={i} style={{ backgroundColor: color, borderRadius: '50%', margin: '5px', width: '30px', height: '30px' }} onClick={(pins) => { deleteColor(pins) }}></Badge>
    )
  })

  let historic = historicProp.map((proposition, index) => {
    let blabla = proposition.map((color, i) => {
      return (
        <Badge key={`historicPins${i}`} style={{ backgroundColor: color, borderRadius: '50%', margin: '5px', width: '20px', height: '20px' }} ></Badge>
      )
    })
    if (historicEval[index]) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 12 }}>
          <p>Proposition {index + 1} : </p>
          {blabla}
          <p>---> BP: {historicEval[index][0]}, MP: {historicEval[index][1]}</p>
        </div>
      )
    }
  })

  // ------------------------ //

  return (
    <div className="App">
      {
        win ?
          <p>BRAVO !</p>
          :
          historicProp.length === 10 ?
            <p>Perdu ...</p>
            :
            <p></p>
      }

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <p>Ma proposition : </p>
        {proposition}
      </div>

      <p>{errorMsg}</p>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Badge style={{ backgroundColor: 'red', borderRadius: '50%', margin: '5px', width: '70px', height: '70px' }} onClick={() => { addColor('red') }}></Badge>
        <Badge style={{ backgroundColor: 'yellow', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('yellow') }}></Badge>
        <Badge style={{ backgroundColor: 'blue', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('blue') }}></Badge>
        <Badge style={{ backgroundColor: 'violet', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('violet') }}></Badge>
        <Badge style={{ backgroundColor: 'orange', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('orange') }}></Badge>
        <Badge style={{ backgroundColor: 'green', borderRadius: '50%', margin: '5px', width: '70px' }} onClick={() => { addColor('green') }}></Badge>
      </div>

      {historicProp.length < 10 && !win ?
        <Button color='info' onClick={() => validateInput()}>VALIDER</Button>
        :
        <Button color='info' onClick={() => resetGame()}>RECOMMENCER</Button>
      }
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {historic}
      </div>
    </div>
  );
}

export default App;
