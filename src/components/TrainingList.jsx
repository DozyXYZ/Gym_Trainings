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
                // console.log("Fetched training data:", data);
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        return date.toLocaleDateString('en-GB', options).replace(",", "");
    };

    const columns = [
        {
            field: "date",
            sortable: true,
            valueFormatter: params => formatDate(params.value),
            floatingFilter: true,
            filter: "agDateColumnFilter",
            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    const cellDate = new Date(cellValue);
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