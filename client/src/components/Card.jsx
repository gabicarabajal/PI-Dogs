import React from 'react';

export default function Card({image, name, temperaments, weight, id}){
    
    let fixedTemps = []
    temperaments?.forEach((el) => fixedTemps.push(el.name))
    
    
    return (
        <div>
            <div>
                <a href={`http://localhost:3000/dogs/${id}`}><h3>More details</h3></a>
            </div>
            <div>
                <h2>{name}</h2>
                <p>{fixedTemps?.join(', ')}</p>
                <h5>{weight[0]} and {weight[1]} Kg</h5>
            </div>
            <div>
                <img src={image} width='300' height='300' alt='img not found'/>
            </div>
        </div>
    );
}