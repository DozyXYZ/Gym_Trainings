import { TextField } from "@mui/material";

export default function CustomerForm({ customer, handleInputChange }) {
    return (
        <>
            <TextField
                required
                margin="dense"
                name="firstname"
                label="First Name"
                fullWidth
                value={customer.firstname}
                onChange={handleInputChange}
            />
            <TextField
                required
                margin="dense"
                name="lastname"
                label="Last Name"
                fullWidth
                value={customer.lastname}
                onChange={handleInputChange}
            />
            <TextField
                required
                margin="dense"
                name="streetaddress"
                label="Street Address"
                fullWidth
                value={customer.streetaddress}
                onChange={handleInputChange}
            />
            <TextField
                required
                margin="dense"
                name="postcode"
                label="Postcode"
                fullWidth
                value={customer.postcode}
                onChange={handleInputChange}
            />
            <TextField
                required
                margin="dense"
                name="city"
                label="City"
                fullWidth
                value={customer.city}
                onChange={handleInputChange}
            />
            <TextField
                required
                margin="dense"
                name="email"
                label="Email"
                fullWidth
                value={customer.email}
                onChange={handleInputChange}
            />
            <TextField
                required
                margin="dense"
                name="phone"
                label="Phone"
                fullWidth
                value={customer.phone}
                onChange={handleInputChange}
            />
        </>
    );
}