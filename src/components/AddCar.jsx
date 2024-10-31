import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { saveCar } from './carapi';
import AddIcon from '@mui/icons-material/Add';

export default function AddCar(props) {
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
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlechange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
  }

  const handleSave = () =>{
    saveCar(car)
    
    .then(() => {
        props.handleFetch();
        handleClose();
    })
    .catch(err => console.error(err))
  }
  

  return (
    <>
      <Button
  variant="outlined"
  onClick={handleClickOpen}
  startIcon={<AddIcon />}
  sx={{
    backgroundColor: 'yellow',
    color: 'black',
    borderColor: 'yellow',
    '&:hover': {
      backgroundColor: 'green',
      color: 'white',
      borderColor: 'green',
    },
  }}
>
  Add Car
</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Car</DialogTitle>
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
