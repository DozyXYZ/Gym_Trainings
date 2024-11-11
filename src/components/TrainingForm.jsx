import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';

export default function Trainingform({ training, customers, handleDateChange, handleInputChange }) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Date - Time"
                    value={training.date ? dayjs(training.date) : dayjs()}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                />
            </LocalizationProvider>

            <TextField
                required
                margin="dense"
                name="duration"
                label="Duration"
                fullWidth
                value={training.duration}
                onChange={handleInputChange}
            />

            <TextField
                required
                margin="dense"
                name="activity"
                label="Activity"
                fullWidth
                value={training.activity}
                onChange={handleInputChange}
            />

            <TextField
                select
                required
                margin="dense"
                name="customer"
                label="Customer"
                fullWidth
                value={training.customer || ''}
                onChange={handleInputChange}
            >
                {customers.map((customer) => (
                    <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                        {customer.firstname} {customer.lastname}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
};

