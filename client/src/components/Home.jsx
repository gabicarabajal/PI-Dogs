import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterByTemperament, getDogs, getTemperaments, FilterBySource, OrderByName, OrderByWeight } from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import Temperament from "./Temperament";



export default function Home () {
    
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);

    const [CurrentPage, setCurrentPage] = useState(1);
    const [DogsOnPage, setDogsOnPage] = useState(8);
    const indexLastDog = CurrentPage * DogsOnPage;
    const indexFirstDog = indexLastDog - DogsOnPage;
    const CurrentDogs = allDogs.slice(indexFirstDog, indexLastDog);
    const [orden, setOrden] = useState("")

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments())
    },[dispatch]); 
    
    const handleFilterByTemperament = (e) => {
        dispatch(FilterByTemperament(e.target.value))
        setCurrentPage(1)
    }

    const handleFilterBySource = (e) => {
        dispatch(FilterBySource(e.target.value))
    }

    const handleOrderByName = (e) => {
        dispatch(OrderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    const handleOrderByWeight = (e) => {
        dispatch(OrderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        
        <div>
            <h1>HOME</h1>
            <div>
                
                <div>
                    <Link to= "/dog">CREATE DOG</Link>
                </div>

                <div>        
                    
                    <select onChange={handleOrderByName}>
                        <option disabled selected>Alphabetical order</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                        
                    <select onChange={handleOrderByWeight}>
                        <option disabled selected>Filter by weight</option>
                        <option value="max_weight">Max</option>
                        <option value="min_weight">Min</option>
                    </select>
                        
                    <select onChange={handleFilterBySource}>
                        <option disabled selected>Filter by source</option>
                        <option value="Todos">All</option>
                        <option value="createdInDB">Created</option>
                        <option value="api">API</option>
                    </select>

                    <Temperament
                        allTemperaments={allTemperaments}
                        handleFilterByTemperament={handleFilterByTemperament}
                    />
                

                </div>


            </div>

            <Paginado
                DogsOnPage = { DogsOnPage }
                allDogs = { allDogs.length }
                paginado = { paginado }
            />

            <div>
                {CurrentDogs?.map(d => (  
                    <Card
                    key={d.id}
                    id={d.id} 
                    name={d.name} 
                    image={d.image} 
                    temperaments={d.temperaments} 
                    weight={d.weight}
                    />    
                ))}
            </div>
                
        </div>    
    )
}