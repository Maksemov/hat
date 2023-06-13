import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const SettingsPanel = ({ setIsCreateGame, game, setGame, setIsInput }) => {

    const [personsCount, setPersonsCount] = useState(4);
    const [playersCount, setPlayersCount] = useState(3);


    const save = () => {

        const body = {
            personsCount: Number(personsCount),
            playersCount: Number(playersCount),
            token: crypto.randomUUID().slice(0, 7),
        }

        const url = 'https://server2-cyan.vercel.app/api/games';
        // const url = 'http://localhost:9001/api/games';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())  // или response.text() вместо response.json()
            .then(data => {
                console.log(data);
                setGame(data);

            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        if (game) {
            setPersonsCount(game.personsCount);
            setPlayersCount(game.playersCount);
        }
    }, [game])

    return (
        <Box
            sx={{
                width: '100%',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                gap: '20px',
                flexDirection: 'column',
            }}
        >
            <Button
                variant="text"
                onClick={() => setIsCreateGame(false)}
            >
                Назад
            </Button>
            <TextField
                sx={{
                    minWidth: '200px'
                }}
                id="playersCount"
                label="Кол-во игроков"
                type='Number'
                value={playersCount}
                onChange={(e) => {
                    setPlayersCount(e.target.value)
                }}
                inputProps={{
                    min: 1,
                    max: 10,
                }}
            />
            <TextField
                sx={{
                    minWidth: '200px'
                }}
                id="personsCount"
                label="Кол-во личностей от игрока"
                value={personsCount}
                onChange={(e) => {
                    setPersonsCount(e.target.value);
                }}
                type='Number'
                inputProps={{
                    min: 1,
                    max: 10,
                }}
            />
            <Button
                variant="contained"
                onClick={() => save(personsCount)}
            >
                Создать
            </Button>

            {game
                ? (
                    <>
                        <Typography variant="h6" component="div">
                            Игра создана
                        </Typography>
                        <TextField
                            label="Отправь токен игры друзьям"
                            value={game?.token || 'Нет токена'}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => setIsInput(true)}
                        >
                            Начать
                        </Button>
                    </>
                )
                : null}

        </Box>
    )
}

export default SettingsPanel