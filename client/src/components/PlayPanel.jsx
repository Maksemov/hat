import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import config from '../config';

const api = config.api;

let timer = null;

const PlayPanel = ({ game }) => {

  const [person, setPerson] = useState(null);
  const [playPersons, setPlayPersons] = useState([])
  const [seconds, setSeconds] = useState(5)

  // const updatePerson = () => {
  //   debugger
  //   const index = Math.floor(Math.random() * playPersons.length);
  //   setPerson(playPersons[index].name);
  //   const newPlayPersons = playPersons.filter((person, i) => index !== i);
  //   setPlayPersons(newPlayPersons);
  //   timer = setInterval(() => {
  //     debugger
  //     setSeconds(prev => prev - 1)
  //   }, 1000)
  // }

  // const updateRound = () => {
  //   setPlayPersons([...persons]);
  //   setPerson('');
  //   if (timer) {
  //     clearInterval(timer);
  //   }
  //   setSeconds(5)
  // }

  // useEffect(() => {
  //   if (seconds === 0) {
  //     debugger
  //     if (timer) {
  //       clearInterval(timer);
  //     }
  //   }
  // }, [seconds])

  // useEffect(() => {
  //   if (game) {
  //     const url = `${api}/persons`;
  //     fetch(url)
  //       .then(response => response.json())  // или response.text() вместо response.json()
  //       .then(data => {
  //         console.log(data);
  //         debugger
  //         setPlayPersons(data)
  //       })
  //       .catch(error => console.error(error))
  //   }
  // }, [game])

  const updatePerson = () => {
    const url = `${api}/person?game=${game._id}`;
    fetch(url)
      .then(response => response.json())  // или response.text() вместо response.json()
      .then(data => {
        console.log(data);
        setPerson(data)
      })
      .catch(error => console.error(error))

  }

  return (
    <Box
      sx={{
        display: 'flex',
        w: '100%',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        // disabled={!playPersons.length}
        onClick={(e) => updatePerson()}
      >
        Показать имя
      </Button>
      <Typography variant="h4" component="div">
        {seconds}
      </Typography>
      <Typography variant="h4" component="div">
        {person?.name}
      </Typography>
      {/* {playPersons.length
        ? null
        : (
          <Button
            variant="contained"
            onClick={(e) => updateRound()}
          >
            Новый раунд
          </Button>
        )} */}
    </Box>
  )
}

export default PlayPanel