import React, { useCallback, useContext } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import { AppContext } from '../Context'

export default function SecondStep() {
  const { formValues, handleChange, handleBack, handleNext, variant, margin } = useContext(AppContext)
  const { companyName, address, email, country, city, companyPhone } = formValues

  const isError = useCallback(
    () =>
      Object.keys({ companyName, address, email, country, city, companyPhone }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, companyName, address, email, country, city, companyPhone]
  )

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Company Name'
            name='companyName'
            placeholder='Enter Your Company Name'
            value={companyName.value}
            onChange={handleChange}
            error={!!companyName.error}
            helperText={companyName.error}
            required={companyName.required}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Address'
            name='address'
            placeholder='Enter Your Address'
            value={address.value}
            onChange={handleChange}
            error={!!address.error}
            helperText={address.error}
            required={address.required}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Email'
            name='email'
            placeholder='Enter Your Email'
            type='email'
            value={email.value}
            onChange={handleChange}
            error={!!email.error}
            helperText={email.error}
            required={email.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true
            }}
            label='Country'
            name='country'
            value={country.value}
            onChange={handleChange}
            error={!!country.error}
            helperText={country.error}
            required={country.required}
          >
            <option value=''> </option>
            <option value='20'>Egypt</option>
            <option value='80'>England</option>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='City'
            name='city'
            select
            SelectProps={{
              native: true
            }}
            placeholder='Enter your city'
            value={city.value}
            onChange={handleChange}
            error={!!city.error}
            helperText={city.error}
            required={city.required}
          >
            <option value=''> </option>
            <option value='5'>cairo</option>
            <option value='6'>Giza</option>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Company Phone'
            name='companyPhone'
            type='number'
            placeholder='i.e: 01156825347'
            value={companyPhone.value}
            onChange={handleChange}
            error={!!companyPhone.error}
            helperText={companyPhone.error}
            required={companyPhone.required}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position='start'
                  sx={{ borderRight: '1px solid grey', pl: '3px', height: '56px', width: '50px' }}
                >
                  <Typography sx={{ height: '100%' }}>+ 20</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Company Phone'
            name='companyPhone'
            type='number'
            placeholder='i.e: 01156825347'
            value={companyPhone.value}
            onChange={handleChange}
            error={!!companyPhone.error}
            helperText={companyPhone.error}
            required={companyPhone.required}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position='start'
                  sx={{ borderRight: '1px solid grey', pl: '3px', height: '56px', width: '50px' }}
                >
                  <Typography sx={{ height: '100%' }}>+ 20</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

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
