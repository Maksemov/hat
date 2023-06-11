import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import PlayPanel from './PlayPanel';

const newPerson = {
  name: '',
}

const Hat = () => {

  const [persons, setPersons] = useState([]);
  const [personsCount, setPersonsCount] = useState('4');
  const [playersCount, setPlayersCount] = useState('3');
  const [isPlay, setIsPlay] = useState(false)

  const onChangePerson = (i, e) => {
    setPersons(prev => {
      const newPersons = [...prev];
      newPersons[i].name = e.target.value;
      return newPersons;
    })
  }

  const save = (persons, count) => {
    const newPersons = [];

    const countNumber = Number(count);
    for (let i = 0; i < (countNumber > 10 ? 10 : countNumber); i++) {
      newPersons[i] = { ...(persons[i] || newPerson) };
    }
    setPersons(newPersons);
  }

  const play = async (persons) => {
    setIsPlay(true);
    let response = await fetch('http://localhost:5000/api/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(persons)
    });
    console.log(response);
  }

  const clear = (count) => {
    const newPersons = [];

    const countNumber = Number(count);
    for (let i = 0; i < (countNumber > 10 ? 10 : countNumber); i++) {
      newPersons.push({ ...newPerson });
    }
    setPersons(newPersons);
  }


  return (
    <Box
      sx={{
        w: '100%',
        display: 'flex',
        justifyContent: 'center',
        p: 2,
        gap: '20px',
        flexDirection: 'column',
      }}
    >
      <TextField
        id="playersCount"
        label="Количество игроков"
        value={playersCount}
        onChange={(e) => {
          setPlayersCount(e.targer.value)
        }}
      />
      <TextField
        id="personsCount"
        label="Количество личностей от игрока"
        value={personsCount}
        onChange={(e) => {
          setPersonsCount(e.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => save(persons, personsCount)}
      >
        Сохранить
      </Button>
      <Button
        variant="outlined"
        onClick={() => clear(personsCount)}
      >
        Очистить
      </Button>
      {persons.map((player, i) => (
        <TextField
          key={i}
          label={`${i + 1} личность`}
          value={player.name}
          onChange={(e) => onChangePerson(i, e)}
        />
      ))}
      <Button
        variant="contained"
        onClick={() => play(persons)}
      >
        Играем
      </Button>
      {!isPlay
        ? null
        : (
          <PlayPanel
            persons={persons}
          />
        )}
    </Box>
  )
}

export default Hat