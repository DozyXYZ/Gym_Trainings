import { useState } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { saveCustomer } from "../projectapi";
import Customerform from "./CustomerForm";

export default function Addcustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const handleClickOpen = () => {
        const newCustomer = {
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        }
        setCustomer(newCustomer);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        saveCustomer(customer)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error("Error saving customer: ", err));
    };

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Button variant="contained" color="success" onClick={handleClickOpen} startIcon={<AddIcon />}>Add Customer</Button>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add Customer</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Fill in the customer details
                    </DialogContentText>

                    <Customerform customer={customer} handleInputChange={handleInputChange} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}