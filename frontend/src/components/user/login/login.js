import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EyeOff from '../../../assets/icons/eye-off.svg';
import Eye from '../../../assets/icons/eye.svg';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-router-dom';

const useStyles = theme => ({
    root: {
        '& > *': {
            margin: '3em 0 3em 0',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '25em',
            maxWidth: '90%',
        },
    },
    form: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        maxWidth: '30em'
    },
    wideTextField: {
        margin: '2em 0 0 0',
        width: '100%'
    },
    buttonContainer: {
        padding: '1em 0 1em 0'
    },


    button: {
        width: '100%',
        margin: '1em 0 1em 0'
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    snackbar: {
        bottom: 90,

    },
    title:{
        padding:'1em'
    }
});

class Login extends Component {

    constructor(props) {
        super(props);
        /*initialize the amount of sizes to 1 size so it 
        can be incremented or decremented and the images is empty*/
        this.state = {
            fields: {
                email: '',
                password: '',
            },
            hasErrors: {
                email: false,
                password: false,
            },
            errors: {
                email: '',
                password: '',
            },
            resMessage: '',
            showPassword: false,
            showAlert: false,
            severityAlert: 'success',
            userRole: 'USER',
            redirect: false
        };
        //this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        //this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }
    // componentDidUpdate() {
    //     console.log(this.state)
    // }
    handleRedirect(){
        let userRole = this.state.userRole
        if (userRole === 'USER') {
            return <Redirect to="/" />
        } else {
            return <Redirect to="/admin" />
        }
    }

    handleClickShowPassword() {
        let showPassword = this.state.showPassword;
        this.setState({
            showPassword: !showPassword
        })
    }


    handleChangeField(event) {
        let fields = this.state.fields;
        fields[event.target.id || "category"] = event.target.value
        this.setState({
            fields
        });

    }
    handleCloseAlert = () => {
        this.setState({ showAlert: false })
    };


    async submitLoginForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let resMessage = ''
            let severityAlert = 'success'
            let decodedToken

            let redirect = this.state.redirect
            let fields = this.state.fields;

            await axios.post(process.env.REACT_APP_MAIN_IP + ':4000/api/users/login', {
                email: fields.email,
                password: fields.password

            })
                .then(function (response) {
                    localStorage.setItem('token', response.data.token);
                    response.data.success ? severityAlert = 'success' : severityAlert = 'error'
                    resMessage = response.data.message
                    decodedToken = jwt.decode(response.data.token)
                    localStorage.setItem('userEmail',decodedToken.email)
                    localStorage.setItem('username',decodedToken.name)
                    redirect = true


                    //console.log(response);
                })
                .catch(function (error) {
                    severityAlert = 'error'
                    resMessage = error.response.data.message
                    console.log(error)
                });
            if (severityAlert === 'error') {
                this.setState({
                    showAlert: true,
                    resMessage: resMessage,
                    severityAlert: severityAlert
                })
                return 0
            }

            

            var newState = {
                fields: {
                    email: '',
                    password: '',
                },
                hasErrors: {
                    email: false,
                    password: false,
                },
                errors: {
                    email: '',
                    password: '',
                },
                showAlert: true,
                resMessage: resMessage,
                severityAlert: severityAlert,
                userRole: decodedToken.role,
                redirect: redirect
            }
            this.setState(newState)

        }

    }

    validateForm() {
        let isValid = true
        let fields = this.state.fields;
        let errors = {};
        let hasErrors = {};


        if (typeof fields["email"] !== "undefined") {
            if (!fields["email"].match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                errors["email"] = "Ingrese un correo válido";
                hasErrors["email"] = true;
                isValid = false
            }
        }
        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/)) {
                errors["password"] = "La contraseña debe contener 8 caracteres, al menos una letra y un numero";
                hasErrors["password"] = true;
                isValid = false
            }
        }




        this.setState({
            hasErrors: hasErrors,
            errors: errors
        });
        return isValid


    }


    render() {

        const {
            resMessage,
            fields,
            hasErrors,
            errors,
            showAlert,
            severityAlert,
            showPassword,
            redirect} = this.state
        //console.log(images)
        //the value from styles is passed to props
        const { classes } = this.props;
        //value where the components will be displayed

        //call to function  

        return (

            <div className={classes.root}>
                {
                    redirect ?
                        this.handleRedirect()
                        :
                        null
                }
                <Paper>
                <Typography
                                className={classes.title}
                                variant="h6"
                                align="center"
                                color="textSecondary">
                                Iniciar sesión
                                </Typography>
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={this.submitLoginForm}>
                        {/*text fields*/}


                        <TextField
                            onChange={this.handleChangeField}
                            helperText={errors.email}
                            value={fields.email}
                            error={hasErrors.email}
                            className={classes.wideTextField} id="email"
                            label="E-mail" variant="outlined"
                        />
                        <FormControl variant="outlined" className={classes.wideTextField}>
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                onChange={this.handleChangeField}
                                helpertext={errors.password}
                                value={fields.password}
                                error={hasErrors.password}
                                id="password"
                                variant="outlined"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {showPassword ?
                                                <img src={Eye} alt="ver contraseña" />
                                                :
                                                <img src={EyeOff} alt="ocultar contraseña" />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={86} />
                            <Typography variant="caption" >
                                {errors.password}
                            </Typography>
                        </FormControl>
                        
                        <div className={classes.buttonContainer}>
                            <Button
                                type="submit"
                                className={classes.button}
                                variant="contained"
                                color="primary">
                                Iniciar sesión
                        </Button>
                        <Button
                                href="/reset"
                                className={classes.button}
                                variant="outlined"
                                color="secondary">
                                Olvidaste tu contraseña
                        </Button>
                            <Typography
                                variant="subtitle2"
                                align="center"
                                color="textSecondary">
                                O
                                </Typography>

                            <Button
                                href="/signup"
                                className={classes.button}
                                color="primary">
                                Crear cuenta
                        </Button>
                        </div>



                    </form>
                </Paper>
                <div>
                    <Snackbar
                        className={classes.snackbar}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={showAlert}
                        autoHideDuration={6000}
                        onClose={this.handleCloseAlert}
                    >

                        <Alert onClose={this.handleCloseAlert} severity={severityAlert}>
                            {resMessage}
                        </Alert>

                    </Snackbar>
                </div>

            </div>
        );
    }
}
//the class is exported using the styles defined
export default withStyles(useStyles)(Login)
