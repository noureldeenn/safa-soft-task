import React, { useCallback, useContext, useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { AppContext } from '../Context'

export default function FirstStep() {
  const { formValues, handleChange, handleNext, variant, margin } = useContext(AppContext)
  const { fullName, email, country, phone, password, confirmPassword } = formValues

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ fullName, email, country, phone, password, confirmPassword }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, fullName, email, country, phone, password, confirmPassword]
  )

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Full Name'
            name='fullName'
            placeholder='Enter Your full name'
            value={fullName.value}
            onChange={handleChange}
            error={!!fullName.error}
            helperText={fullName.error}
            required={fullName.required}
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
            label='Phone number'
            name='phone'
            type="number"
            placeholder='i.e: 01156825347'
            value={phone.value}
            onChange={handleChange}
            error={!!phone.error}
            helperText={phone.error}
            required={phone.required}
            InputProps={{
              endAdornment: <InputAdornment position='end'>+ 20</InputAdornment>
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name='password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            value={password.value}
            onChange={handleChange}
            error={!!password.error}
            helperText={password.error}
            required={password.required}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword.value}
            onChange={handleChange}
            error={!!confirmPassword.error}
            helperText={confirmPassword.error}
            required={confirmPassword.required}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
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
