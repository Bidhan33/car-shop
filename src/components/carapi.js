export function fetchCars() {  
    return fetch(import.meta.env.VITE_API_URL)
    .then(responese => {
     if(!responese.ok){
         throw new Error("Failed to fetch cars" + responese.statusText);
     }
       return responese.json();
     })
    }

    export function deleteCar(url) {
        return fetch(url, {method: "DELETE"})
        .then(response => {
            if(!response.ok){
                throw new Error("Error in delete: " + response.statusText);
            }
            return response.json();
        })  
    }

    export function saveCar(newCar){
        fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body:JSON.stringify(newCar)
        })
        .then(response => {
            if(!response.ok)
                throw new Error("Error in SAVING: " + response.statusText);
            
            return response.json();
        })
    }

    export function updateCar(url, updateCar){
    return fetch(url, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body:JSON.stringify(updateCar)
    })
    .then(response => {
        if(!response.ok)
            throw new Error("Error in SAVING: " + response.statusText);
        
        return response.json();
    })
}