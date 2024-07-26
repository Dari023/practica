import React, { useRef } from 'react';
import api from '../servicios/api';

export const AgrearRes = () => {
    const nameRef = useRef();
    const addressRef = useRef();
    const imagenRef = useRef();

    const addRestaurant = async (e) => {
        e.preventDefault();
        const namer = nameRef.current.value;
        const addressr = addressRef.current.value;
        const imager = imagenRef.current.files[0];
        console.log(namer);

        const formData = new FormData();
        formData.append('name', namer);
        formData.append('address', addressr);
        formData.append('image', imager);

        try {
            await api.post('/restaurants/', formData);
            alert('Restaurante creado');
            nameRef.current.value = '';
            addressRef.current.value = '';
            imagenRef.current.value = '';
            window.location.href = 'home';
        } catch (error) {
            console.log(error.message);
        }
    };
    return(
        <div className="container mt-4 border p-2">
        <h2>Create Restaurant</h2>
        <form>
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" className="form-control" ref={nameRef} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Address:</label>
                <input type="text" className="form-control" ref={addressRef} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Image:</label>
                <input type="file" className="form-control" ref={imagenRef} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={addRestaurant}>Submit</button>
        </form>
    </div>
    )
}