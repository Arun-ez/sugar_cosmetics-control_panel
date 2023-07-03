import {
    Box,
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'
import { useEffect } from 'react'



const OrderStepper = ({ active }) => {

    const steps = [
        { title: 'Confirmed' },
        { title: 'Shipped' },
        { title: 'In Transit' },
        { title: 'Delivered' },
    ]

    return (
        <Stepper size='md' colorScheme='blue' index={active} py={10}>
            {steps.map((step, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}

export { OrderStepper }