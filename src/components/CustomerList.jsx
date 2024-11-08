import { useState, useEffect } from 'react';

import { fetchCustomers } from '../projectapi';
import { deleteCustomer } from '../projectapi';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Addcustomer from './CustomerAdd';
import Editcustomer from './CustomerEdit';

export default function Customerlist() {
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

    const handleDelete = (url) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteCustomer(url)
                .then(() => handleFetch())
                .catch(error => {
                    console.error("Error deleting customer: ", error);
                    alert("An error occurred while deleting the customer!");
                })
        }
    };

    const columns = [
        { field: "firstname", sortable: true, filter: true, floatingFilter: true, headerName: "First Name" },
        { field: "lastname", sortable: true, filter: true, floatingFilter: true, headerName: "Last Name" },
        { field: "streetaddress", sortable: true, filter: true, floatingFilter: true, headerName: "Street Address" },
        { field: "postcode", sortable: true, filter: true, floatingFilter: true, width: 150 },
        { field: "city", sortable: true, filter: true, floatingFilter: true },
        { field: "email", sortable: true, filter: true, floatingFilter: true },
        { field: "phone", sortable: true, filter: true, floatingFilter: true },
        {
            width: 150,
            cellRenderer: params => <Editcustomer customer={params.data} handleFetch={handleFetch} />
        },
        {
            width: 150,
            cellRenderer: params =>
                <Button
                    onClick={() => handleDelete(params.data._links.self.href)}
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
            <div className="ag-theme-material" style={{ width: "95%", height: "700px" }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationAutoPageSize={true}
                    floatingFilter={true}
                    suppressCellFocus={true}
                />
            </div>

            <Addcustomer handleFetch={handleFetch} />
        </>
    );
}