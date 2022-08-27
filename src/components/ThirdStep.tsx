/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant='text' component='label' color='inherit'>
            <PhotoSizeSelectActualIcon sx={{ fontSize: '30px', color: 'grey' }} /> Upload a file
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
              hidden
            />
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button variant='contained' disabled={isError()} color='primary' onClick={!isError() ? handleNext : () => null}>
          Next
        </Button>
      </Box>
    </>
  )
}
