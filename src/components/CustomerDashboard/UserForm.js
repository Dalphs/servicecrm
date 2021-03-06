import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import UserService from "../../services/user.service"

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

    const getChangedValues = (oldObject, newObject) => {
        console.log(oldObject)
        console.log(newObject)
        let keys = Object.keys(oldObject)
        let changedValues = {}
           keys.forEach((key) => {
            if(newObject.hasOwnProperty(key)){
              console.log("newObject has key: " + key)
            if(oldObject[key] !== newObject[key])
              changedValues[key] = newObject[key]
            }
        })
              
              
        return changedValues
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newUser = props.user.id === ""
        let res
        if (newUser){
            setUser({
                ...user
            })
            res = await UserService.createCustomer(user)
            props.saveUser(res.data)
        } else{
            setUser({...user})
            res = await UserService.updateCustomer({...getChangedValues(props.user, user), id:user.id})
            props.saveUser(res.data.customer)
        }
        console.log(res.data)
        
    }

    const onChange= (e) => {
        const value = e.target.value;
        console.log(`${e.target.name}: ${value}`)
        console.log(props.user)
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
                <TextField variant="outlined" label="N??ste bes??g" name="nextvisit" onChange={onChange} value={user.nextvisit}/>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Bem??rkninger"
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