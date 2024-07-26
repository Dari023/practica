import React, { useEffect, useState, useRef } from 'react';
import api from '../servicios/api';


export const RestaurantDall = () => {
    const [detalles, setDetalles] = useState([])
    const [comentarios, setComentarios] = useState([])
    const nameRef = useRef()
    const descriptionRef = useRef()
    const rantinRef = useRef()
    

    const fetcdetalles = async () => {
        try{
            const verdetalles = await api.get('restaurants/')
            setDetalles(verdetalles.data)
        }catch(error){
            console.log(error.message);
        }
    }

    const fetcomentarios = async () => {
        try{
            const comentario = await api.get("/comments/")
            setComentarios(comentario.data)
        } catch(error){
            console.log(error.message);
        }
    }
    
    useEffect(() => {
        fetcdetalles()
    }, [])

    useEffect(() => {
        fetcomentarios()
    }, [])

    const AddComentario = async () =>{
        
        try {
            const agregar = await api.post('/comments/', {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
                rating: rantinRef.current.value,
                
            });

            setComentarios([...comentarios, agregar.data]);
            nameRef.current.value = '';
            descriptionRef.current.value = '';
            rantinRef.current.value = '';
        } catch (error) {
            console.log(error.message);
        }
        console.log(AddComentario);
    }

    const delateComen = async (id) => {
        try {
            await api.delete(`/comments/${id}`);
            setComentarios(comentarios.filter(c => c.id !== id));
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return(
        <>
            {detalles.map(g => (
                <div key={g.id} className="container mt-4 border p-2">
                    <h2>{g.name}</h2>
                    <p>{g.address}</p>
                    <img src={g.image} alt="Descripción de la imagen" />
                    <h3 className="mt-4">{g.average_rating}</h3>
                    <h3>Comments:</h3>
                    {comentarios.filter(c => c.restaurant  === g.id).map(c => {
                        return (
                        <ul key={c.id} className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <strong>{c.name}: {c.description}</strong>
                                </span>
                                <button className="btn btn-danger btn-sm" onClick={() => delateComen(c.id)}>
                                    Delete
                                </button>
                            </li>
                        </ul>
                        )
                      })}
                    <form className="mt-4">
                        <h3>Add a Comment</h3>
                        <div className="mb-3">
                            <label className="form-label" >Name:</label>
                            <input type="text" className="form-control" ref={nameRef} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <textarea className="form-control" ref={descriptionRef} required></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rating:</label>
                            <input type="number" min="1" max="5" className="form-control" ref={rantinRef} required />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={AddComentario}>Submit</button>
                    </form>


                    <button className="btn btn-primary mt-4">Edit Restaurant</button>
                </div>
            ))}
        </>
    )
}
