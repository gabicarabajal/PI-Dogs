import React from 'react';
import s from '../styles/Paginado.module.css';


export default function Paginado({ DogsOnPage, allDogs, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allDogs/DogsOnPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <div className={s.container}>
            <ul>
                { pageNumbers?.map(n => (
                    <li className={s.li} onClick={() => paginado(n)} key={n}>
                        <a className={s.btn} >{n}</a>
                    </li>

                ))}
            </ul>
        </div>
    )
}