import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import PlayPanel from './PlayPanel';
import StartPanel from './StartPanel';
import SettingsPanel from './SettingsPanel';
import InputPanel from './InputPanel';

const newPerson = {
  name: '',
}

const Hat = () => {

  const [persons, setPersons] = useState([]);
  const [game, setGame] = useState(null);
  //
  const [isCreateGame, setIsCreateGame] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const clear = (count) => {
    const newPersons = [];

    const countNumber = Number(count);
    for (let i = 0; i < (countNumber > 10 ? 10 : countNumber); i++) {
      newPersons.push({ ...newPerson });
    }
    setPersons(newPersons);
  }


  return (
    <>
      {!isCreateGame && !isInput
        ? (
          <StartPanel
            setIsCreateGame={setIsCreateGame}
            setIsInput={setIsInput}
          />
        )
        : null}
      {isCreateGame && !isInput
        ? (
          <SettingsPanel
            setIsCreateGame={setIsCreateGame}
            game={game}
            setGame={setGame}
            setIsInput={setIsInput}
          />
        )
        : null}
      {isInput
        ? (
          <InputPanel
            game={game}
            setGame={setGame}
            setIsInput={setIsInput}
          />
        )
        : null}
    </>
  )
}

export default Hat