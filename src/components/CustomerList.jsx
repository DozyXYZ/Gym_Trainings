import { useState, useEffect } from 'react';
import { fetchCustomers } from '../projectapi';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => { handleFetch() }, []);

    const handleFetch = () => {
        fetchCustomers()
            .then(data => {
                console.log("Fetched customer data:", data);
                setCustomers(data._embedded.customers)
            })
            .catch(err => console.error("Error fetching data: ", err));
    };

    const columns = [
        { field: "firstname", sortable: true, filter: true, floatingFilter: true },
        { field: "lastname", sortable: true, filter: true, floatingFilter: true },
        { field: "streetaddress", sortable: true, filter: true, floatingFilter: true },
        { field: "postcode", sortable: true, filter: true, floatingFilter: true },
        { field: "city", sortable: true, filter: true, floatingFilter: true },
        { field: "email", sortable: true, filter: true, floatingFilter: true },
        { field: "phone", sortable: true, filter: true, floatingFilter: true }
    ];

    return (
        <>
            <div className="ag-theme-material" style={{ width: "1400px", height: "700px" }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationAutoPageSize={true}
                    floatingFilter={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
}