import React, {useState, useEffect } from 'react';
import {Paper , Stepper , Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm ';
import { Payment } from '@material-ui/icons';
import {commerce} from '../../../lib/commerce';
import {Link, useHistory} from 'react-router-dom'

const steps = ['Shipping address', 'Payment Details']

const Checkout = ({cart, order, error, onCaptureCheckout}) => {
    const [activeStep , setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setisFinished] = useState(false);
    const history = useHistory()
    const classes = useStyles()
    console.log(cart)
    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
            } catch {
                history.pushState('/')
            }
          };
    
          generateToken();
        }
    }, [cart]);
    
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
    
    const next = (data) => {
        setShippingData(data)
        nextStep()
    }
    const timeout = () => {
        setTimeout(() => {
            setisFinished(true)
        }, 3000)
    }
    let Confirmation = () => order.customer ? (
        <>
           <div>
               <Typography variant="h5">Thank you for your purchase,fisrtName, lastName</Typography>
               <Divider className={classes.divider} />
               <Typography variant="subtitle2">Order ref: ref</Typography>
           </div>
           <br />
           <Button component={Link} to="/" variant="outlined" type="button">back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">back to Home</Button>
         </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    if(error) {
        <>
            <Typography variant="h5">error: {error}</Typography>
            <Button component={Link} to="/" variant="outlined" type="button">back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} backStep={backStep} shippingData={shippingData} checkoutToken={checkoutToken} timeout={timeout}/>
    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}/>   
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation />: checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
