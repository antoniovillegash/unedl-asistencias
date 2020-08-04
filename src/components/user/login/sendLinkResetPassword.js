import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
        padding: '4em 0 1em 0'
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
            },
            hasErrors: {
                email: false,
            },
            errors: {
                email: '',
            },
            resMessage: '',
            showAlert: false,
            severityAlert: 'success',
            userRole: 'USER',
        };
        //this.componentDidUpdate = this.componentDidUpdate.bind(this);
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
    

    handleClickShowPassword() {
        let showPassword = this.state.showPassword;
        this.setState({
            showPassword: !showPassword
        })
    }


    handleChangeField(event) {
        let fields = this.state.fields;
        fields[event.target.id] = event.target.value
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

            let fields = this.state.fields;
            console.log({
                url:process.env.REACT_APP_MAIN_IP +':'+ (process.env.PORT || '3000'),
                email: fields.email,

            })

            await axios.post(process.env.REACT_APP_MAIN_IP + '/api/users/reset', {
                url:process.env.REACT_APP_MAIN_IP +':'+ (process.env.PORT || '3000') ,
                email: fields.email,

            })
                .then( (response)=> {
                    response.data.success ? severityAlert = 'success' : severityAlert = 'error'
                    resMessage = response.data.message
                    


                    //console.log(response);
                })
                .catch((error)=> {
                    severityAlert = 'error'
                    resMessage = error.response.data.message
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
                },
                hasErrors: {
                    email: false,
                },
                errors: {
                    email: '',
                },
                showAlert: true,
                resMessage: resMessage,
                severityAlert: severityAlert,
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
            } = this.state
        //console.log(images)
        //the value from styles is passed to props
        const { classes } = this.props;
        //value where the components will be displayed

        //call to function  

        return (

            <div className={classes.root}>
                
                <Paper>
                <Typography
                                className={classes.title}
                                variant="h6"
                                align="center"
                                color="textSecondary">
                                Cambiar contraseña
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
                        <Typography
                                variant="subtitle1"
                                color="primary">
                                Se enviará un enlace a su correo para restaurar la contraseña 
                                </Typography>
                        
                        
                        <div className={classes.buttonContainer}>
                            <Button
                                type="submit"
                                className={classes.button}
                                variant="contained"
                                color="primary">
                                Enviar correo
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
