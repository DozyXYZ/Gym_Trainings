import { useState, useEffect } from "react";
import { fetchTrainings } from "../projectapi";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const localizer = momentLocalizer(moment);

export default function Trainingcalendar() {
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

    const events = trainings.map(training => {
        const start = new Date(training.date);
        const end = new Date(start.getTime() + training.duration * 60000);
        return {
            title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
            start: start,
            end: end
        };

    });

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 800 }}
            />
        </div>
    );
};