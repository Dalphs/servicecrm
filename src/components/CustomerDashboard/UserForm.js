import React, {useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function UserForm(props) {
    const [user, setUser] = useState({
        "id":"",
        "firstname":"",
        "lastname":"",
        "street":"",
        "streetnumber":"",
        "zip":"",
        "city": "",
        "phone":"",
        "email":"",
        "intervalInside":"",
        "intervalOutside":"",
        "priceInside":"",
        "priceOutside":"",
        "nextvisit":"",
        "visits":[],
        "note":"",
        "created":""
    })

    const handleSubmit = (e) => {
        setUser({
            ...user,
            created:Date.now(),
            id:10
        })
        props.saveUser(user)
        e.preventDefault()
    }

    const onChange= (e) => {
        const value = e.target.value;
        console.log(`${e.target.name}: ${value}`)
        setUser({
            ...user,
            [e.target.name]:value
        })
    }

    const classes = useStyles();
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField variant="outlined" label="Fornavn" name="firstname" onChange={onChange} value={user.firstname}/>
                    <TextField variant="outlined" label="Efternavn" name="lastname" onChange={onChange} value={user.lastname}/>
                </div>
                <div>
                    <div>
                        <TextField variant="outlined" label="Vej" name="street" onChange={onChange} value={user.street}/>
                        <TextField variant="outlined" label="nummer" name="streetnumber" onChange={onChange} value={user.streetnumber}/>
                    </div>
                    <div>
                        <TextField variant="outlined" label="postnummer" name="zip" onChange={onChange} value={user.zip}/>
                        <TextField variant="outlined" label="By" name="city" onChange={onChange} value={user.city} />
                    </div>
                </div>

                <TextField variant="outlined" label="Telefonnummer" name="phone" onChange={onChange} value={user.phone}/>
                <TextField variant="outlined" label="Email" name="email" onChange={onChange} value={user.email}/>
                <div>
                    <TextField variant="outlined" label="Interval ude" name="intervalOutside" onChange={onChange} value={user.intervalOutside}/>
                    <TextField variant="outlined" label="Interval inde" name="intervalInside" onChange={onChange} value={user.intervalInside}/>
                </div>
                <div>
                    <TextField variant="outlined" label="Pris inde" name="priceOutside" onChange={onChange} value={user.priceOutside}/>
                    <TextField variant="outlined" label="Pris ude" name="priceInside" onChange={onChange} value={user.priceInside}/>
                </div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Bemærkninger"
                    multiline
                    rowsMax={4}
                    variant="outlined"
                    name="note" 
                    onChange={onChange} 
                    value={user.note}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    type="submit"
                    >
                        Save
                </Button>
            </form>
        </div>
    );
}

export default UserForm;