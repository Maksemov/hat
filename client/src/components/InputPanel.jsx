import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PlayPanel from './PlayPanel';
import config from '../config';

const api = config.api;

const newPerson = {
    name: '',
}

const InputPanel = ({ game, setIsInput, setGame }) => {
    const [persons, setPersons] = useState([]);
    const [token, setToken] = useState('');
    const [isPlay, setIsPlay] = useState(false)


    const onChangePerson = (i, e) => {
        setPersons(prev => {
            const newPersons = [...prev];
            newPersons[i].name = e.target.value;
            return newPersons;
        })
    }

    useEffect(() => {
        if (game) {
            const newPersons = [];
            for (let i = 0; i < (game.personsCount); i++) {
                newPersons[i] = { ...newPerson };
            }
            setPersons(newPersons);
        }
    }, [game])

    const connectToGame = () => {

        const url = `${api}/games?token=${token}`;
        fetch(url)
            .then(response => response.json())  // или response.text() вместо response.json()
            .then(data => {
                console.log(data[0]);
                setGame(data[0]);

            })
            .catch(error => console.error(error))
    }

    const play = async (persons) => {
        const url = `${api}/persons`;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(persons),
        });
        setIsPlay(true);
        console.log(response);
    }

    return (
        <Box
            sx={{
                width: '100%',
                maxHeight: '100%',
                flexWrap: 'wrap',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                gap: '20px',
                flexDirection: 'column',
            }}
        >
            {/* <Button
                variant="outlined"
                onClick={() => clear(personsCount)}
            >
                Очистить
            </Button> */}
            <TextField
                label="Токен игры"
                value={game?.token || 'Нет токена'}
                InputProps={{
                    readOnly: true,
                }}
            />
            <Button
                variant="text"
                onClick={() => setIsInput(false)}
            >
                Назад
            </Button>
            {!game
                ? (
                    <TextField
                        label="Введите токен"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                )
                : null}

            {persons.map((player, i) => (
                <TextField
                    key={i}
                    label={`${i + 1} личность`}
                    value={player.name}
                    onChange={(e) => onChangePerson(i, e)}
                />
            ))}
            {!game
                ? (
                    <Button
                        variant="contained"
                        onClick={() => connectToGame()}
                    >
                        Подключиться
                    </Button>
                )
                : null}
            {game
                ? (
                    <Button
                        variant="contained"
                        onClick={() => play(persons)}
                    >
                        Отправить
                    </Button>
                )
                : null}

            {!isPlay
                ? null
                : (
                    <PlayPanel
                        game={game}
                    />
                )}
        </Box>
    )
}

export default InputPanel