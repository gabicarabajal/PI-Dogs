import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../actions';
import s from '../styles/SearchBar.module.css';
import {FaPaw} from 'react-icons/fa';

export default function SearchBar({setPage}) {
    const dispatch = useDispatch();
    const [ name, setName ] = useState('');
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value);
        // console.log(name);
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogsByName(name))
        setPage(1)
        if (name.length === 0) {
            return alert("Please input a name to start the search");
          } else {
            dispatch(getDogsByName(name));
            setName(" ");
          }
    }



    return (
        <div className={s.container}>
            <input
               className={s.input}
               type='text'
               placeholder='Search...'
               onChange={(e) => handleInputChange(e)}
            />
            <button className={s.button} type='submit' onClick={(e) => handleSubmit(e)}  ><FaPaw/></button>
        </div>
    )
}