import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import axios from 'axios'
import Button from '@mui/material/Button'
import { AppContext } from '../Context'

export default function Confirm() {
  const { formValues, handleBack, handleNext } = useContext(AppContext)

  console.log(formValues)

  const handleSubmit = async () => {
    const form = new FormData()

    form.append('user_email', formValues?.email?.value)
    form.append('user_password', formValues?.password?.value)
    form.append('user_password_confirmation', formValues?.confirmPassword?.value)
    form.append('lang', 'ar')
    form.append('company_name', formValues?.companyName?.value)
    form.append('company_address', formValues?.address?.value)
    form.append('company_phone', formValues?.companyPhone?.value)
    form.append('company_business_email', formValues?.email?.value)
    form.append('company_avatar', formValues?.companyLogo?.value)
    form.append('company_country_id', formValues?.country?.value)
    form.append('company_city_id', formValues?.city?.value)
    form.append('user_full_name', formValues?.fullName?.value)
    form.append('user_phone', formValues?.phone?.value)

    const response = await axios({
      method: 'post',
      url: 'https://id.safav2.io.safavisa.com/register',
      data: form,
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })

    console.log(response)
    // Show last component or success message
    handleNext()
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
      <Button sx={{ mr: 1 }} onClick={handleBack}>
        Back
      </Button>
      <Button variant='contained' color='success' onClick={handleSubmit}>
        Confirm & Continue
      </Button>
    </Box>
  )
}
