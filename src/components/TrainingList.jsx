import { useState, useEffect } from 'react';
import { fetchTrainings, fetchOneCustomer } from '../projectapi';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => { handleFetch() }, []);

    const handleFetch = () => {
        fetchTrainings()
            .then(data => {
                const trainings = data._embedded.trainings;
                // for each training, map function is used to create an array of promises
                // each promise is a fetchOneCustomer function call
                // once the customer data is fetched, it is merged with the training data
                // additional customerName property is added to the training object
                const customers = trainings.map(training =>
                    fetchOneCustomer(training._links.customer.href)
                        .then(customerData => ({
                            ...training,
                            customerName: customerData.firstname + " " + customerData.lastname
                        }))
                );
                return Promise.all(customers);
            })
            .then(trainingsWithCustomer => {
                console.log("Fetched trainings with customer name: ", trainingsWithCustomer);
                setTrainings(trainingsWithCustomer);
            })
            .catch(err => console.error("Error fetching data: ", err));
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
        { field: "customerName", headerName: "Customer Name", sortable: true, filter: true, floatingFilter: true }
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
            </div>
        </>
    );
}