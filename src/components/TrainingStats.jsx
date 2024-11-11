import { useState, useEffect } from "react";
import { fetchTrainings } from "../projectapi";
import { AgCharts } from "ag-charts-react";

export default function Trainingstats() {
    const [chartOptions, setChartOptions] = useState({
        height: 700,
        width: 1000,
        title: { text: "Training Statistics" },
        subtitle: { text: "Aegroto dum anima est, spes est" },
        data: [],
        series: [{
            type: "bar",
            xKey: "activity",
            yKey: "duration",
            yName: "Duration (minutes)",
        }],
        axes: [
            {
                type: "category",
                position: "bottom",
                title: { text: "Activity" }
            },
            {
                type: "number",
                position: "left",
                title: { text: "Duration (minutes)" }
            }
        ]
    });

    useEffect(() => { handleFetchTraining() }, []);

    const handleFetchTraining = () => {
        fetchTrainings()
            .then(trainingdata => {
                // console.log("Fetched training data:", trainingdata);
                setChartOptions(prevOptions => ({
                    ...prevOptions,
                    data: trainingdata.map(training => ({
                        activity: training.activity,
                        duration: training.duration
                    }))
                }));
            })
            .catch(err => console.error("Error fetching data: ", err));
    };

    return (
        <div>
            <AgCharts options={chartOptions} />
        </div>
    );
};