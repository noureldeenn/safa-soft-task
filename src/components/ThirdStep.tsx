/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { AppContext } from '../Context'

export default function ThirdStep() {
  const { formValues, handleChange, handleBack, handleNext } = useContext(AppContext)
  const { companyLogo } = formValues

  const isError = useCallback(
    () =>
      Object.keys({ companyLogo }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, companyLogo]
  )
  console.log(companyLogo.value)
  return (
    <>
      <Stack width='100%' justifyContent='center' alignItems='center'>
        <img src='/placeholderImg.PNG' alt='' />
        <Typography>Only images with a size lower than 500 KB are allowed</Typography>

        <label
          htmlFor='companyLogo'
          style={{ backgroundImage: `url(${companyLogo.value})`, width: '100%', height: '100%' }}
        />
        <input
          id='companyLogo'
          type='file'
          value={companyLogo.value}
          name='companyLogo'
          onChange={handleChange}
          // hidden
        />
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant='contained' color='inherit' onClick={handleBack} sx={{ mr: 1, width: 100 }}>
          Back
        </Button>
        <Button
          variant='contained'
          sx={{ ml: 1, width: 200 }}
          disabled={isError()}
          color='primary'
          onClick={!isError() ? handleNext : () => null}
        >
          Next
        </Button>
      </Box>
    </>
  )
}
