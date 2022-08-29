import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import StepForm from './components/StepForm'

const theme = createTheme()

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container component='main' maxWidth='xl' sx={{ bgcolor: 'grey.100', py: 6 }}>
        <StepForm />
    </Container>
  </ThemeProvider>
)

export default App
