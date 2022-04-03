import React from 'react';

export default function Temperament({allTemperaments, handleFilterByTemperament}){
    return (
        <select onChange={handleFilterByTemperament}>
            <option>Temperaments</option>
            <option value='Todos'>All</option>
            {allTemperaments && allTemperaments.map(temp => (
                <option value={temp.name}>{temp.name}</option>
            ))}
        </select>
    ) 
};