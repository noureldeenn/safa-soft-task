import React, { useContext } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import Confirm from './Confirm'
import Success from './Success'
import { AppContext } from '../Context'
import ThirdStep from './ThirdStep'
import StepperComponent from './StepperComponent'

// Step titles
const labels = ['First Step', 'Second Step', 'Third Step', 'Confirmation']
const handleSteps = (step: number) => {
  switch (step) {
    case 0:
      return <FirstStep />
    case 1:
      return <SecondStep />
    case 2:
      return <ThirdStep />
    case 3:
      return <Confirm />
    default:
      throw new Error('Unknown step')
  }
}

const StepForm = () => {
  const { activeStep } = useContext(AppContext)

  return (
    <>
      {activeStep === labels.length ? (
        <Success />
      ) : (
        <Container maxWidth='md'>
          <StepperComponent activeStep={activeStep} steps={labels} />
          <Box sx={{ mt: 5 }}>
            <Typography variant='subtitle2' align='center' sx={{ mt: 2 }}>
              {activeStep === 0 && 'Tell us more about you.'}
              {activeStep === 1 && 'Verify your company'}
              {activeStep === 2 && 'Upload company logo'}
              {activeStep === 3 && 'All set ready?'}
            </Typography>
          </Box>
          <Paper variant='outlined' sx={{ my: { xs: 1, md: 3 }, p: { xs: 2, md: 3 } }}>
            {handleSteps(activeStep)}
          </Paper>
        </Container>
      )}
    </>
  )
}

export default StepForm
