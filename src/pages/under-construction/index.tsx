import { Box, Stack, Typography } from '@mui/material'
import BackgroundImage from '@webapp/assets/images/content/background.jpg';
import Card from '@webapp/components/card';
import React from 'react'

const UnderConstructionPage: React.FunctionComponent = () => {
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
        <Typography variant="h1" align="center">
          En Construccion
        </Typography>
        <Typography variant="h2" align="center">
          Esta web se encuentra todavia en desarrollo
        </Typography>
        <Typography variant="h3" align="center">
          Para continuar tu compra puedes ingresar a la web de{' '}
          <a href="https://medicinevaperoom.catalog.kyte.site/" target="_blank" rel="noreferrer">
            Medicine Vape Room
          </a>
          {' '}actual. Gracias por tu comprension.
        </Typography>
        <Typography variant="h3" align="center">
          Proximamente estaremos en linea.
        </Typography>
        </Box>
      </Card>
    </Stack>
  )
}

export default UnderConstructionPage
