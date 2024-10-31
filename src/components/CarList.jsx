import { useState, useEffect } from "react";    
import { deleteCar, fetchCars } from "./carapi";
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-material.css"; 
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import DeleteIcon from "@mui/icons-material/Delete"

function CarList() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false); // Boolean state for Snackbar visibility

    const colDefs = [ // Define column definitions separately
        { field: "brand", filter: true },
        { field: "model", filter: true },
        { field: "color", filter: true },
        { field: "fuel", filter: true, width: 100 },
        { field: "modelYear", filter: true, headerName: "Year", width: 120 },
        { field: "price", filter: true },
        {
            cellRenderer : params=> <EditCar handleFetch ={handleFetch} data={params.data}/>,
            width:120
        },
        {
            headerName: "Actions", // Adding a header name for clarity
            cellRenderer: params => (
                <Button variant ="contained" onClick={() => handleDelete(params.data._links.self.href)} color ="error"
                startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
            ),
        },
    ];

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        fetchCars()
            .then(data => setCars(data._embedded.cars)) 
            .catch(err => console.error(err));
    };

    const handleDelete = (url) => {
        if (window.confirm("Are you sure?")) {
            deleteCar(url)
                .then(() => {
                    handleFetch(); 
                    setOpen(true); 
                })
                .catch(err => console.error(err));
        }
    };

    return (
        
        <>
        <AddCar handleFetch={handleFetch}/>
            <div className="ag-theme-material" style={{ height: 500, width: '100%' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs} // Use colDefs here
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellFocus={true}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Car deleted"
            />
        </>
    );
}

export default CarList;
