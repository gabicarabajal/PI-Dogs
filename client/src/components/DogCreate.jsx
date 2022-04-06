import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postDog, getTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function DogCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);
    const [button, setButtton] = useState(true);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        height: '',
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: []
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperaments: [...input.temperaments,
                            e.target.value]
        })
        console.log(input)
    }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert('Dog create succefully!')
        setInput({
            name: '',
            height: '',
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        })
        navigate('/home');
    }
    
    function handleDelete(el){
        setInput({
            ...input,
            temperaments: input.temperaments.filter(t => t !== el)
        })
    }
    
    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    return (
        <div>
            <Link to='/home'>
                <button>Back</button>
            </Link>
            <h1>Create your dog!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                       type='text'
                       value={input.name}
                       name='name'
                       onChange={handleChange}
                    />
                </div> 
                <div>   
                    <label>Height:</label>
                    <input 
                       type='text'
                       value={input.height}
                       name='height'
                       onChange={handleChange}
                    />
                </div>
                <div>    
                    <label>Min Weight:</label>
                    <input 
                       type='text'
                       value={input.min_weight}
                       name='min_weight'
                       onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Max Weight:</label>
                    <input
                       type='text'
                       value={input.max_weight}
                       name='max_weight'
                       onChange={handleChange}
                    />
                </div>
                <div>    
                    <label>Life span:</label>
                    <input 
                       type='text'
                       value={input.life_span}
                       name='life_span'
                       onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input 
                       type='text'
                       value={input.image}
                       name='image'
                       onChange={handleChange}
                    />
                </div>
                <div>
                    <h2>Select temperaments</h2>
                </div>
                <div>
                    <select onChange={(e) => handleSelect(e)}>
                        <option>Temperaments</option>
                        {temperaments.map(t => (
                            <option value={t.value}>{t.name}</option>
                        ))}
                    </select>
                    <ul>
                        <li>
                            {input.temperaments.map(el => el + ', ')}
                        </li>
                    </ul>
                </div>
                <button type='submit'>Create dog</button>
            </form>
        </div>
    )

}

const validate = (input) => {
    let errors = {}
    if(!input.name){
        errors.name = `The name is required.(It shouldn't contain numbers)`
    }
    if(!input.height){
        errors.height = `The weight is required.(It should be: ej '20 to 30')`
    }
    if(!input.weight || !input.weight){
        errors.weight = `The weight is required.(It should't be words)`
    }
    if(!input.life_span){
        errors.life_span = 'The lifespan is required'
    }
    return errors;
}