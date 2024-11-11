# Crimson Training

Crimson Training is a React-based web application for managing customer training sessions. It provides functionalities to add, edit, delete, and view training sessions and customer details. The application also includes a calendar view for training sessions and statistical charts for training data.

REST API: https://juhahinkula.github.io/personaltrainerdocs/

## Features

- **Customer Management**: Add, edit, delete, and view customer details.
- **Training Management**: Add, edit, delete, and view training sessions.
- **Calendar View**: View training sessions in a calendar format.
- **Statistics**: View training statistics in a bar chart.

## Project Structure

. ├── .env ├── .gitignore ├── eslint.config.js ├── index.html ├── package.json ├── public/ ├── README.md ├── src/ │ ├── App.jsx │ ├── components/ │ │ ├── CustomerAdd.jsx │ │ ├── CustomerEdit.jsx │ │ ├── CustomerForm.jsx │ │ ├── CustomerList.jsx │ │ ├── TrainingAdd.jsx │ │ ├── TrainingCalendar.jsx │ │ ├── TrainingForm.jsx │ │ ├── TrainingList.jsx │ │ ├── TrainingStats.jsx │ ├── main.jsx │ ├── projectapi.js ├── vite.config.js

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd personaltrainer
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your API URL:
    ```env
    VITE_API_URL=<your-api-url>
    ```

## Running the Application

To start the development server, run:
```sh
npm run dev
