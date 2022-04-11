import React from 'react';
import s from '../styles/Card.module.css';

export default function Card({image, name, temperaments, weight, id}){
    
    let fixedTemps = []
    temperaments?.forEach((el) => fixedTemps.push(el.name))
    
    
    return (
        <div className={s.card}>
            <div className={s.card2}>
            <div className={s.img_container}>
                <img className={s.img} src={image}  alt='img not found'/>
            </div>
            <div className={s.overlay}>
                <a href={`http://localhost:3000/dogs/${id}`}><h3>Details</h3></a>
            </div>
            <div className={s.data_container}>
                <h2>{name}</h2>
                <p>{fixedTemps?.join(', ')}<br />
                    {weight[0]} and {weight[1]} Kg
                </p>
    
            </div>
            </div>
        </div>
    );
}