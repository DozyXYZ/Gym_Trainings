import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { saveTraining } from "../projectapi";

import TrainingForm from "./TrainingForm";

import { fetchCustomers } from "../projectapi";

export default function Trainingadd(props) {
    const [open, setOpen] = useState(false);

    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: "",
    });

    const [customers, setCustomers] = useState([]);

    useEffect(() => { handleFetch() }, []);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => {
                console.log("Fetched customer data:", data);
                setCustomers(data._embedded.customers);
            })
            .catch(err => console.error("Error fetching data: ", err));
    };

    const handleClickOpen = () => {
        setTraining({});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        saveTraining(training)
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.error("Error saving training: ", err));
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => {
        setTraining({ ...training, date: date ? date.toISOString() : null });
    };

    return (
        <>
            <Button variant="contained" color="success" onClick={handleClickOpen} startIcon={<AddIcon />}>Add Training</Button>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add Training</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Fill in the training details
                    </DialogContentText>

                    <TrainingForm training={training} customers={customers} handleInputChange={handleInputChange} handleDateChange={handleDateChange} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}