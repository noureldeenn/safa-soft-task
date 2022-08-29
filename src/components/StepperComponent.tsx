import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BusinessIcon from '@mui/icons-material/Business'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#1777fb'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#1777fb'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: '22px',
    border: '6px solid white',
    backgroundColor: '#f4f4f4',
    borderRadius: 1
  }
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ ownerState }) => ({
  backgroundColor: 'white',
  zIndex: 1,
  color: '#b0b0b0',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#ff5f59',
    border: '1px solid #ff5f59'
  }),
  ...(ownerState.completed && {
    color: '#0184fe',
    border: '1px solid #0184fe'
  })
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <AccountCircleOutlinedIcon sx={{ fontSize: 32 }} />,
    2: <BusinessIcon sx={{ fontSize: 32 }} />,
    3: <CollectionsOutlinedIcon sx={{ fontSize: 32 }} />,
    4: <VerifiedUserOutlinedIcon sx={{ fontSize: 32 }} />
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  )
}

type Props = {
  steps: string[]
  activeStep: number
}

export default function StepperComponent({ activeStep, steps }: Props) {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon} />
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
