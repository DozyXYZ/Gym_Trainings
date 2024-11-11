import { useState } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { editCustomer } from "../projectapi";
import Customerform from "./CustomerForm";

export default function Editcustomer(props) {
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
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        editCustomer(props.customer._links.self.href, customer)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error("Error saving customer: ", err));
        handleClose();
    };

    return (
        <>
            <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen} startIcon={<EditIcon />}>Edit</Button>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Edit Customer</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Edit the customer details
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