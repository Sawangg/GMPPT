import React from 'react';
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography}  from '@material-ui/core';

function getSteps() {
  return ['Créer les énoncés', 'Créer les formules', 'Intégrer les modèles 3D'];
}

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div style={{width : "25%"}} className="center">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                  <Button variant="contained" color="primary" onClick={handleNext} >
                    {activeStep === steps.length - 1 ? 'Finir' : 'Suite'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0}>
          <Typography>Création des sujets finie, envoyer aux étudiants ? </Typography>
          <Button onClick={handleReset}>Envoyer</Button>
        </Paper>
      )}
    </div>
  );
}