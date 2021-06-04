import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function UserForm(props) {
    const [user, setUser] = useState({...props.user})

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    const handleSubmit = (e) => {
        let newUser = props.user.id === ""
        console.log(newUser)
        if (newUser){
            setUser({
                ...user,
                created:Date.now(),
                id:10
            })
        } else{
            setUser({...user})
        }
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
            <form className="changeUser df-fdc" onSubmit={handleSubmit}>
                <div>
                    <TextField variant="outlined" label="Fornavn" name="firstname" onChange={onChange} value={user.firstname}/>
                    <TextField variant="outlined" label="Efternavn" name="lastname" onChange={onChange} value={user.lastname}/>
                </div>
                <div className="addressContainer">
                    <div className="df-fdr">
                        <TextField className="flex2" variant="outlined" label="Vej" name="street" onChange={onChange} value={user.street}/>
                        <TextField className="flex1" variant="outlined" label="nummer" name="streetnumber" onChange={onChange} value={user.streetnumber}/>
                    </div>
                    <div className="df-fdr">
                        <TextField className="flex1" variant="outlined" label="postnummer" name="zip" onChange={onChange} value={user.zip}/>
                        <TextField className="flex2" variant="outlined" label="By" name="city" onChange={onChange} value={user.city} />
                    </div>
                </div>

                <TextField variant="outlined" label="Telefonnummer" name="phone" onChange={onChange} value={user.phone}/>
                <TextField variant="outlined" label="Email" name="email" onChange={onChange} value={user.email}/>
                <div>
                    <TextField variant="outlined" label="Interval ude" name="intervalOutside" onChange={onChange} value={user.intervalOutside}/>
                    <TextField variant="outlined" label="Interval inde" name="intervalInside" onChange={onChange} value={user.intervalInside}/>
                </div>
                <div>
                    <TextField variant="outlined" label="Pris ude" name="priceOutside" onChange={onChange} value={user.priceOutside}/>
                    <TextField variant="outlined" label="Pris inde" name="priceInside" onChange={onChange} value={user.priceInside}/>
                </div>
                <TextField variant="outlined" label="Næste besøg" name="nextvisit" onChange={onChange} value={user.nextvisit}/>
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