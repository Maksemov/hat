import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const StartPanel = ({setIsCreateGame, setIsInput}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        onClick={(e) => setIsCreateGame(true)}
      >
        Создать игру
      </Button>
      <Button
        variant="contained"
        onClick={(e) => setIsInput(true)}
      >
        Подключиться
      </Button>
    </Box>
  )
}

export default StartPanel