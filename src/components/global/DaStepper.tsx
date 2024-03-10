"use client";
// ** React Imports
import { Icon, IconProps } from "@iconify/react";
import React, { ReactNode, useState } from "react";

// ** MUI Imports
import { StepConnector, stepConnectorClasses } from "@mui/material";
import MuiBox, { BoxProps } from "@mui/material/Box";
import Step from "@mui/material/Step";
import { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { alpha, styled, useTheme } from "@mui/material/styles";

interface Props {
  stepTitles: string[];
  stepDescription?: string[];
  steps: React.ComponentType<any>[];
  isWhite?: boolean;
}
const CIStepper = ({ stepTitles, stepDescription , steps, isWhite }: Props) => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0);

  // Handle Stepper
  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    if (activeStep !== 0) setActiveStep(activeStep - 1);
  };
  const handleFirst = () => {
    setActiveStep(0);
  };

  const getStepContent = (step: number) => {
    const Step = steps[step];
    return (
      // @ts-ignore
      <Step
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleFirst={handleFirst}
      />
    );
  };

  const renderContent = () => {
    return getStepContent(activeStep);
  };
  // Styled Box component
  const Box = styled(MuiBox)<BoxProps>(() => ({
    width: 20,
    height: 20,
    borderWidth: 3,
    borderRadius: "50%",
    borderStyle: "solid",
  }));
  const Icons = ({
    icon,
    sx,
    ...rest
  }: IconProps & { sx?: React.CSSProperties }) => {
    return <Icon icon={icon} fontSize="1.5rem" style={sx} {...rest} />;
  };

  const StepperCustomDot = (props: StepIconProps) => {
    // ** Props
    const { active, completed, error } = props;

    // ** Hooks
    const theme = useTheme();

    if (error) {
      return (
        <Icons
          icon="mdi:alert"
          fontSize={20}
          color={theme.palette.error.main}
          transform="scale(1.2)"
        />
      );
    } else if (completed) {
      return (
        <Icons
          icon="mdi:check-circle"
          fontSize={20}
          color={theme.palette.primary.main}
          transform="scale(1.2)"
        />
      );
    } else {
      return (
        <Box
          sx={{
            borderColor: active
              ? "primary.main"
              : alpha(theme.palette.primary.main, 0.3),
          }}
        />
      );
    }
  };
  const Connector = styled(StepConnector)(() => ({
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: isWhite ? "#fff" : "#0277BD",
      borderTopWidth: 3,
      borderRadius: "40px",
      opacity: "12%",
    },
  }));

  return (
    <div className="p-4 w-full">
      <Stepper activeStep={activeStep} connector={<Connector />}>
        {steps.map((step, index) => {
          return (
            <Step key={index}>
              <StepLabel StepIconComponent={StepperCustomDot}>
                <div className="flex">
                  <Typography
                    className={`${isWhite ? "#ffffff" : "#4C4E64"}${
                      activeStep == index ? "DE" : "61"
                    }`}
                    sx={{
                      fontWeight: "500",
                      fontSize: {
                        xs: "24px",
                        sm: "28px",
                        md: "32px",
                        lg: "36px",
                      },
                      lineHeight: "40px",
                      
                    }}
                  >{`0${index + 1}`}</Typography>

                  <div className="mt-auto mb-auto ml-2">
                    <div>
                      <Typography
                        className={`${isWhite ? "#ffffff" : "#4C4E64"}${
                      activeStep == index ? "DE" : "61"
                    }`}
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "21px",
                          letterSpacing: "0.1px",
                          display: {
                            xs: "none",
                            md: "block",
                          },
                        }}
                      >
                        {stepTitles[index]}
                      </Typography>
                      <Typography
                        className={`${isWhite ? "#ffffff" : "#4C4E64"}${
                      activeStep == index ? "DE" : "61"
                    }`}
                        sx={{
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "18px",
                          letterSpacing: "0.1px",
                          opacity: "0.5",
                          display: {
                            xs: "none",
                            md: "block",
                          },
                        }}
                      >
                        {stepDescription && stepDescription[index]}
                      </Typography>
                    </div>
                  </div>
                </div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {renderContent()}
    </div>
  );
};
CIStepper.getLayout = (page: ReactNode) => {
  page;
};

export default CIStepper;
