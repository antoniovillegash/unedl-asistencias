import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '../../../assets/icons/add.svg';
import MinusIcon from '../../../assets/icons/minus.svg';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = theme => ({
    root: {
        '& > *': {
            margin: '3em 0 3em 0',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '35em',
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
    smallTextField: {
        margin: '2em 2em 0 0',
        width: '40%',
        minWidth: '10em'
    },
    buttonSelect: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    pairedTextField: {
        margin: '0 2em 0 0',
        width: '50%',
        minWidth: '8em',
    },
    pairedField: {
        marginTop: '1em',
    },
    fileInputContainer: {
        marginTop: '2em',
        width: '100%',
        height: '5em'
    },
    linksContainer: {
        backgroundColor: '#eaeaea',
        padding: '1em',
        marginTop: '1em',
        borderRadius: '6px'
    },
    linksButtonContainer: {
        marginTop: '1em',
    },
    linksButton: {
        backgroundColor: '#ffffff',
        margin: '0 4px ',
        left: 'calc(100% - 88px)'
    },
    buttonContainer: {
        display: 'flex',
        flexFlow: 'wrap',
        justifyContent: 'end',
        padding: '1em 0 0 0 '
    },
    button: {
        margin: '0 0 2em 2em',

    },
    imagesSection: {
        display: 'flex',
        flexFlow: 'wrap',
        margin: '1em 0 2em 0',
        justifyContent: 'space-evenly'
    },
    imageContainer: {
        height: 'auto',
        width: '30%',
    },
    imagesToUpload: {
        height: '10em',
        width: 'auto',
        borderRadius: '4px'
    },
    removeImagesButtonContainer: {
        top: '3em',
        right: '0em',
        position: 'relative',
        display: 'flex',
        justifyContent: 'end',
    },
    removeImagesButton: {
        backgroundColor: '#eaeaea',
    },
    removeImageIcon: {
        transform: 'rotate(45deg)',
    },
    title: {
        padding: '1em 0 1em 0'
    }
});

class createArticle extends Component {

    constructor(props) {
        super(props);
        /*initialize the amount of links to 1 size so it 
        can be incremented or decremented and the images is empty*/
        this.state = {
            amountOfLinks: [1],
            showSelect: false,
            fields: {
                name: localStorage.getItem('username'),
                shift: '',
                lesson: '',
                subject: '',
                links: {
                    1: ''
                },
                isPermanent: {
                    1: false
                }
            },
            hasErrors: {
                shift: false,
                lesson: false,
                subject: false,
                links: {
                    1: false
                },
            },
            errors: {
                shift: '',
                lesson: '',
                subject: '',
                links: {
                    1: ''
                }
            },
            showAlert: false,
            severityAlert: 'success',
            selectedDate: new Date()
        };
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.handleOnClickAddLink = this.handleOnClickAddLink.bind(this);
        this.handleOnClickRemoveLink = this.handleOnClickRemoveLink.bind(this);
        this.submitArticleForm = this.submitArticleForm.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleChangeFieldPermanent = this.handleChangeFieldPermanent.bind(this);
        this.handleChangeFieldLink = this.handleChangeFieldLink.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

    }


    componentDidUpdate() {
        console.log(this.state)
    }
    /*Metod to read the files frmo the input file and put it 
        into the state images*/



    handleOnClickAddLink() {
        let amountOfLinks = this.state.amountOfLinks;
        let fields = this.state.fields;
        let errors = this.state.errors;
        let hasErrors = this.state.hasErrors;

        fields.links[amountOfLinks.length + 1] = '';
        fields.isPermanent[amountOfLinks.length + 1] = false;
        errors.links[amountOfLinks.length + 1] = '';
        hasErrors.links[amountOfLinks.length + 1] = false;

        amountOfLinks.concat((amountOfLinks.length));
        this.setState(prevState => ({
            amountOfLinks: [...prevState.amountOfLinks, amountOfLinks.length + 1],
            fields,
            errors,
            hasErrors
        }))
    }

    handleOnClickRemoveLink() {
        let amountOfLinks = this.state.amountOfLinks;
        let fields = this.state.fields;
        let errors = this.state.errors;
        let hasErrors = this.state.hasErrors;


        delete fields.links[amountOfLinks[amountOfLinks.length - 1]]
        delete fields.isPermanent[amountOfLinks[amountOfLinks.length - 1]]
        delete errors.links[amountOfLinks[amountOfLinks.length - 1]]
        delete hasErrors.links[amountOfLinks[amountOfLinks.length - 1]]

        amountOfLinks.splice(-1);
        this.setState({ amountOfLinks, fields, errors, hasErrors })
    }


    handleChangeFieldLink = (index, event) => {
        let fields = this.state.fields;
        fields.links[event.target.id] = event.target.value
        this.setState({
            fields
        });
    };
    handleChangeFieldPermanent = (index, event) => {
        let fields = this.state.fields;
        fields.isPermanent[event.target.id] = !fields.isPermanent[event.target.id]
        this.setState({
            fields
        });
    };

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


    async submitArticleForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let resMessage = ''
            let severityAlert = 'success'
            let fields = this.state.fields;
            let links = [];
            

            for (const index of this.state.amountOfLinks) {
                links.push({
                    link: fields.links[index],
                    isPermanent: fields.isPermanent[index]
                })
            }
            
            await axios.post(process.env.REACT_APP_MAIN_IP + ':4000/api/attendance', {
                name: fields.name,
                shift: fields.shift,
                lesson: fields.lesson,
                subject: fields.subject,
                links: links,

            }, {
                headers: {
                    Authorization: 'bearer ' + localStorage.getItem('token')
                }
            })
                .then(function (response) {
                    resMessage = response.data.message
                    response.data.success ? severityAlert = 'success' : severityAlert = 'error'
                    //console.log(response);
                })
                .catch(function (error) {
                    //console.log(error);
                });
            if (severityAlert === 'error') {
                this.setState({
                    showAlert: true,
                    resMessage: resMessage,
                    severityAlert: severityAlert
                })
                return 0
            }
            

            var emptyState = {

                resMessage: resMessage,
                amountOfLinks: [1],
                showSelect: false,
                fields: {
                    name: localStorage.getItem('username'),
                    shift: '',
                    lesson: '',
                    subject: '',
                    links: {
                        1: ''
                    },
                    isPermanent: {
                        1: false
                    }
                },
                hasErrors: {
                    shift: false,
                    lesson: false,
                    subject: false,
                    links: {
                        1: false
                    },
                },
                errors: {
                    shift: '',
                    lesson: '',
                    subject: '',
                    links: {
                        1: ''
                    }
                },
                selectedDate: new Date(),
                showAlert: true,
                severityAlert: severityAlert

            }

        
        // fields = {};
        // fields["name"] = "";
        // fields["shift"] = "";
        // fields["subject"] = "";
        // fields["subject"] = "";
        // fields["links"] = "";
        // fields["isPermanent"] = "";
        this.setState(emptyState);
    }

}

validateForm() {
    let isValid = true
    let fields = this.state.fields
    let hasErrors = {
        links: {}
    };
    let errors = {
        links: {}
    };


    if (!fields["shift"]) {
        errors["shift"] = "Ingrese el turno";
        hasErrors["shift"] = true;
        isValid = false
    }
    if (typeof fields["shift"] !== "undefined") {
        if (!fields["shift"].match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
            errors["shift"] = "Ingrese caracteres válidos";
            hasErrors["shift"] = true;
            isValid = false
        }
    }
    if (!fields["lesson"]) {
        errors["lesson"] = "Ingrese un nombre de asignatura";
        hasErrors["lesson"] = true;
        isValid = false
    }
    if (typeof fields["lesson"] !== "undefined") {
        if (!fields["lesson"].match(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
            errors["lesson"] = "Ingrese caracteres válidos";
            hasErrors["lesson"] = true;
            isValid = false
        }
    }

    if (!fields["subject"]) {
        errors["subject"] = "Seleccione una categoría";
        hasErrors["subject"] = true;
        isValid = false
    }
    if (typeof fields["subject"] !== "undefined") {
        if (!fields["subject"].match(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
            errors["subject"] = "Ingrese caracteres válidos";
            hasErrors["subject"] = true;
            isValid = false
        }
    }
    this.state.amountOfLinks.forEach(index => {





    });




    this.setState({
        hasErrors: hasErrors,
        errors: errors
    });
    return isValid


}

handleDateChange = (date) => {
    this.setState({
        selectedDate: date
    })
};

render() {


    const {
        resMessage,
        amountOfLinks,
        fields,
        hasErrors,
        errors,
        showAlert,
        severityAlert,
        selectedDate } = this.state
    //console.log(images)
    //the value from styles is passed to props
    const { classes } = this.props;
    //value where the components will be displayed

    //call to function  

    return (
        <div className={classes.root}>
            <Paper>

                <form className={classes.form} noValidate autoComplete="off" onSubmit={this.submitArticleForm}>
                    {/*text fields*/}
                    <Typography
                        className={classes.title}
                        variant="h6"
                        align="left"
                        color="textPrimary">
                        {localStorage.getItem('username')}
                    </Typography>

                    <Typography
                        variant="body1"
                        align="left"
                        color="textPrimary">
                        Importante
                                </Typography>
                    <Typography
                        variant="subtitle1"
                        align="left"
                        color="textSecondary">
                        Horas presenciales por semana = horas virtuales por semana
                                </Typography>
                    <br /><br />
                    <Typography
                        variant="subtitle1"
                        align="left"
                        color="textSecondary">
                        materia de 1 a 3 hrs = 1hr por semana
                                </Typography>
                    <br />
                    <Typography
                        variant="subtitle1"
                        align="left"
                        color="textSecondary">
                        materia de 4 a 5 hrs = 2hr por semana
                                </Typography>
                    <br />
                    <Typography
                        variant="subtitle1"
                        align="left"
                        color="textSecondary">
                        materia de 6 a 7 hrs = 3hr por semana
                                </Typography>
                    <br />
                    <Typography
                        variant="subtitle1"
                        align="left"
                        color="textSecondary">
                        materia de 8 a 9 hrs = 4hr por semana
                                </Typography>
                    <br />


                    <TextField
                        onChange={this.handleChangeField}
                        helperText={errors.shift}
                        value={fields.shift}
                        error={hasErrors.shift}

                        className={classes.wideTextField} id="shift"
                        label="*Turno" variant="outlined" />
                    <Typography
                        className={classes.wideTextFieldLabel}
                        variant="body1"
                        align="left"
                        color="textPrimary">

                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            className={classes.smallTextField}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="*Fecha"
                            value={selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>


                    <TextField
                        onChange={this.handleChangeField}
                        helperText={errors.lesson}
                        value={fields.lesson}
                        error={hasErrors.lesson}

                        className={classes.wideTextField} id="lesson"
                        label="*Asignatura" variant="outlined" />

                    <TextField
                        onChange={this.handleChangeField}
                        helperText={errors.subject}
                        value={fields.subject}
                        error={hasErrors.subject}

                        className={classes.wideTextField} id="subject"
                        label="*Tema" variant="outlined" />


                    <div className={classes.linksContainer}>
                        {amountOfLinks.map((index) =>
                            <div className={classes.pairedField} key={index}>

                                <Typography variant="subtitle1" paragraph>
                                    {'Enlace ' + index}

                                </Typography>


                                <TextField
                                    onChange={(event) => this.handleChangeFieldLink(index, event)}
                                    value={fields.links[index]}
                                    className={classes.pairedTextField}
                                    id={index.toString()}
                                    label={'Enlace'}
                                    variant="outlined"
                                    error={hasErrors.links[index]}
                                    helperText={errors.links[index]} />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={fields.isPermanent[index]}
                                        id={index.toString()}
                                        onChange={(event) => this.handleChangeFieldPermanent(index, event)}
                                        name="checkedA" />}
                                    label="permanente"
                                />
                                {/* <TextField
                                        onChange={(event) => this.handleChangeFieldPermanent(index, event)}
                                        value={fields.isPermanent[index]}
                                        className={classes.pairedTextField}
                                        id={index.toString()}
                                        label={'Cantidad'}
                                        variant="outlined"
                                        error={hasErrors.isPermanent[index]}
                                        helperText={errors.isPermanent[index]} /> */}
                            </div>
                        )}
                        <div className={classes.linksButtonContainer}
                            key="buttons">
                            <IconButton
                                size="medium"
                                aria-label="add"
                                className={classes.linksButton}
                                onClick={this.handleOnClickAddLink}>
                                <img src={AddIcon} alt="icono agregar talla" />
                            </IconButton>
                            <IconButton
                                disabled={this.state.amountOfLinks > 0}
                                aria-label="minus"
                                className={classes.linksButton}
                                onClick={this.handleOnClickRemoveLink}>
                                <img src={MinusIcon} alt="icono quitar talla" />
                            </IconButton>
                        </div>
                    </div>

                    <div className={classes.buttonContainer}>

                        <Button
                            type="submit"
                            className={classes.button}
                            variant="contained"
                            color="primary">
                            Guardar
                        </Button>
                    </div>

                </form>
            </Paper>
            <div>
                <Snackbar
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
export default withStyles(useStyles)(createArticle)
