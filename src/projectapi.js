// module for all fetch
// import.meta.env.VITE_API_URL is the URL of the API

// fetch all customers
export function fetchCustomers() {
    return fetch(import.meta.env.VITE_API_URL + "customers")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fecth: " + response.statusText);
            }
            return response.json();
        });
}

// fetch one customer to link customer name to training
export function fetchOneCustomer(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch customer');
            }
            return response.json();
        });
}

// save new customer
export function saveCustomer(newCustomer) {
    return fetch(import.meta.env.VITE_API_URL + "customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in save: " + response.statusText);
            }
            return response.json();
        });
}

// edit customer
export function editCustomer(url, customer) {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in edit: " + response.statusText);
            }
            return response.json();
        });
}

// delete customer
export function deleteCustomer(url) {
    return fetch(url, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in delete: " + response.statusText);
            }
            return response.json();
        });
}

// fetch all trainings
export function fetchTrainings() {
    return fetch(import.meta.env.VITE_API_URL + "trainings")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fecth: " + response.statusText);
            }
            return response.json();
        });
}