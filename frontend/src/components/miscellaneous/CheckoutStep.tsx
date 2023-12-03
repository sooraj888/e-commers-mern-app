import {
  Box,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { MdLibraryAddCheck } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Shipping",
    // description: "Contact Info",
    icon: <MdLocalShipping />,
    path: "/shipping",
  },
  {
    title: "Confirm",
    // description: "Date & Time",
    icon: <MdLibraryAddCheck />,
    path: "/order/confirm",
  },
  {
    title: "Payment",
    // description: "Select Rooms",
    icon: <MdAccountBalanceWallet />,
    path: "/order/checkoutPayment",
  },
];

export default function CheckoutStep({ value }: { value: number }) {
  const { activeStep } = useSteps({
    index: value,
    count: steps.length,
  });
  const navigation = useNavigate();

  return (
    <Stepper
      size="lg"
      colorScheme="blue"
      index={activeStep}
      w={"80vw"}
      m={"2vmax 0px"}
      overflow={"scroll"}
    >
      {steps.map((step, index) => (
        <Step
          key={index}
          onClick={() => {
            navigation(step.path);
          }}
        >
          <StepIndicator>
            <StepStatus
              complete={step.icon}
              incomplete={step.icon}
              active={step.icon}
            />
          </StepIndicator>

          <Box flexShrink="0" padding={"md: auto 3vmax"}>
            <StepTitle>{step.title}</StepTitle>
            {/* <StepDescription>{step.description}</StepDescription> */}
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}
