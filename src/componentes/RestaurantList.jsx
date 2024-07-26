import React, { useEffect, useState } from 'react';
import api from '../servicios/api';
import { RestaurantDall } from './RestaurantDetail';
import { Link, Route, Routes } from 'react-router-dom';

export const Restaurantlista = () => {
  const [generarlista, setGenerarlist] = useState([]);
  const fetchRestaurants = async () => {
    try {
      const listar = await api.get("/restaurants/");
      setGenerarlist(listar.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(generarlista);
 
  useEffect(() => {
    fetchRestaurants();
  }, []);
  
  const delate = async (id) =>{
    try{
        await api.delete(`/restaurants/${id}`)
        setGenerarlist(generarlista.filter(restaurant => restaurant.id !== id))
    }catch(error){
      console.log(error.message);
    }
  }


  return (
       <div className="container mt-4">
      <h1 className="mb-4">Restaurants</h1>
      <ul className="list-group">
        {generarlista.map(restaurant => (
          <li key={restaurant.id} className="list-group-item d-flex justify-content-between align-items-center">
             
             <Link>{restaurant.name}</Link>
             
            <button className="btn btn-danger btn-sm" onClick={() => delate(restaurant.id)}>Delete</button>
          </li>
        ))}
      </ul>
        <Routes>
        <Route path="/" element={<RestaurantDall />} />
        </Routes>
    </div>

  );
};
