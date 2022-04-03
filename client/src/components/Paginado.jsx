import React from 'react';


export default function Paginado({ DogsOnPage, allDogs, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allDogs/DogsOnPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <div>
            <ul>
                { pageNumbers?.map(n => (
                    <li onClick={() => paginado(n)} key={n}>
                        <a >{n}</a>
                    </li>

                ))}
            </ul>
        </div>
    )
}