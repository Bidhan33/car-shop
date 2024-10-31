import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateCar } from './carapi';
import EditIcon from "@mui/icons-material/Edit"


export default function EditCar(props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    modelYear: "",
    price: ""

  });

  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.data);
    setCar({
        brand: props.data.brand,
        model: props.data.model,
        color: props.data.color,
        fuel: props.data.fuel,
        modelYear: props.data.modelYear,
        price: props.data.price
    })
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlechange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const handleSave = () =>{
     updateCar(props.data._links.car.href, car)
    .then(() => {
        props.handleFetch();
        handleClose();
    })
    .catch(err => console.error(err))
  }
  

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} color='success'
    >Edit 
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="brand"
            label="Brand"
            value={car.brand}
            onChange={handlechange}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="model"
            label="Model"
            value={car.model}
            onChange={handlechange}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="color"
            label="Color"
            value={car.color}
            onChange={handlechange}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="fuel"
            label="Fuel"
            value={car.fuel}
            onChange={handlechange}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="modelYear"
            label="Year"
            value={car.modelYear}
            onChange={handlechange}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name="price"
            label="Price"
            value={car.price}
            onChange={handlechange}
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
