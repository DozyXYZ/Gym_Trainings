import { useState, useEffect } from 'react';
import { deleteTraining, fetchTrainings } from '../projectapi';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Trainingadd from './TrainingAdd';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => { handleFetchTraining() }, []);

    const handleFetchTraining = () => {
        fetchTrainings()
            .then(data => {
                console.log("Fetched training data:", data);
                setTrainings(data);
            })
            .catch(err => console.error("Error fetching data: ", err));
    };

    const handleDelete = (url) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteTraining(url)
                .then(() => handleFetchTraining())
                .catch(error => {
                    console.error("Error deleting customer: ", error);
                    alert("An error occurred while deleting the customer!");
                })
        }
    };

    // to format the ass looking date type
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const columns = [
        {
            field: "date",
            sortable: true,
            valueFormatter: params => formatDate(params.value),
            floatingFilter: true,
            // calendar and range filter, cell format does not remove the time part
            // need to remove the time for the filter to match
            filter: "agDateColumnFilter",
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    const cellDate = new Date(cellValue);
                    // Strip the time part from the date
                    const cellDateWithoutTime = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
                    if (filterLocalDateAtMidnight.getTime() === cellDateWithoutTime.getTime()) {
                        return 0;
                    }
                    if (cellDateWithoutTime < filterLocalDateAtMidnight) {
                        return -1;
                    }
                    if (cellDateWithoutTime > filterLocalDateAtMidnight) {
                        return 1;
                    }
                }
            }
        },
        { field: "duration", headerName: "Duration (minutes)", sortable: true, filter: true, floatingFilter: true },
        { field: "activity", sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "Customer Name",
            valueGetter: params => params.data.customer.firstname + " " + params.data.customer.lastname,
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            width: 150,
            cellRenderer: params =>
                <Button
                    onClick={() => handleDelete(import.meta.env.VITE_API_URL + "trainings/" + params.data.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                >Delete
                </Button>
        }
    ];

    return (
        <>
            <div className="ag-theme-material" style={{ width: "1400px", height: "700px" }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationAutoPageSize={true}
                    floatingFilter={true}
                    suppressCellFocus={true}
                />

                <Trainingadd handleFetch={handleFetchTraining} />
            </div>
        </>
    );
}