import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button, TextField } from "@material-ui/core";
import "./stepper.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#E4897B",
  },
  button: {
    backgroundColor: "#E4897B",
    marginRight: theme.spacing(1),
  },
  backButton: {
    backgroundColor: "#FFFF",
    color: "#E4897B",
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  active: {
    color: "#E4897B",
    fontWeight: "bold",
  },
  completed: {
    color: "#E4897B",
    fontWeight: "bold",
  },
  steps: {
    backgroundColor: "#E4897B",
  },
}));

function getSteps() {
  return ["Información", "Detalles", "Revisar"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <>
          <TextField label="Nombre" required className="col-md-6 px-4 my-2" />
          <TextField label="Apellido" required className="col-md-6 px-4 my-2" />
          <TextField label="Edad" required className="col-md-6 px-4 my-2" />
          <TextField
            label="Correo electrónico"
            required
            className="col-md-6 px-4 my-2"
          />
          <TextField label="Teléfono" required className="col-md-6 px-4 my-2" />
          <TextField
            label="Dirección"
            required
            className="col-md-6 px-4 my-2"
          />
          <TextField label="Genero" required className="col-md-6 px-4 my-2" />
          <TextField label="Escuela" required className="col-md-6 px-4 my-2" />
        </>
      );
    case 1:
      return (
        <>
          <TextField label="Ciudad" className="col-md-6 px-4 my-2" />
          <TextField label="País" className="col-md-6 px-4 my-2" />
          <TextField label="Estado" className="col-md-6 px-4 my-2" />
          <TextField label="Trabajo" className="col-md-6 px-4 my-2" />
          <TextField label="CURP" className="col-md-6 px-4 my-2" />
          <TextField label="Verificación" className="col-md-6 px-4 my-2" />
        </>
      );
    case 2:
      return (
        <>
          <h2>Resumen</h2>
          <p>Nombre: Juan Pérez</p>
          <p>Correo electrónico: juanperez@example.com</p>
          <p>Título: Vendo bicicleta</p>
          <p>Precio: $200</p>
        </>
      );
    default:
      return "Unknown step";
  }
}

export default function StepperExample() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
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
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <h2>Gracias por enviar la información</h2>
            <Button onClick={handleReset} className={classes.button}>
              Reiniciar
            </Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Atrás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Enviar" : "Siguiente"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
