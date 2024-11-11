import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';

export default function TrainingForm({ training, customers, handleDateChange, handleInputChange }) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date"
                    value={training.date ? dayjs(training.date) : null}
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

