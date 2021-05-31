import React from 'react';
import { TextField } from '@material-ui/core';

function UserForm(props) {
    return (
        <div>
            <form>
                <div>
                    <TextField variant="outlined" label="Fornavn" />
                    <TextField variant="outlined" label="Efternavn" />
                </div>
                <div>
                    <div>
                        <TextField variant="outlined" label="Vej" />
                        <TextField variant="outlined" label="nummer" />
                    </div>
                    <div>
                        <TextField variant="outlined" label="postnummer" />
                        <TextField variant="outlined" label="By" />
                    </div></div>

                <TextField variant="outlined" label="Telefonnummer" />
                <TextField variant="outlined" label="Email" />
                <div>
                    <TextField variant="outlined" label="Interval ude" />
                    <TextField variant="outlined" label="Interval inde" />
                </div>
                <div>
                    <TextField variant="outlined" label="Pris inde" />
                    <TextField variant="outlined" label="Pris ude" />
                </div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Bemærkninger"
                    multiline
                    rowsMax={4}
                    variant="outlined"
                />
            </form>
        </div>
    );
}

export default UserForm;