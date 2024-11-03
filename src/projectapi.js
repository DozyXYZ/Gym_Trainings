// module for all fetch
// import.meta.env.VITE_API_URL is the URL of the API

export function fetchCustomers() {
    return fetch(import.meta.env.VITE_API_URL + "customers")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fecth: " + response.statusText);
            }
            return response.json();
        })
}

// to link customer name to training
export function fetchOneCustomer(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch customer');
            }
            return response.json();
        });
}

export function fetchTrainings() {
    return fetch(import.meta.env.VITE_API_URL + "trainings")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in fecth: " + response.statusText);
            }
            return response.json();
        })
}