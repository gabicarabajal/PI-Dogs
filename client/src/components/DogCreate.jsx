import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postDog, getTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import s from '../styles/DogCreate.module.css';

export default function DogCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});
    const [button, setButton] = useState(true)

    const [input, setInput] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        life_span: '',
        image: '',
        temperaments: []
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
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
            min_height: '',
            max_height: '',
            min_weight: '',
            max_weight: '',
            life_span: '',
            image: '',
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

    useEffect(()=>{
        if (input.name.length > 0 && input.min_height.length > 0  && input.max_height.length > 0 && input.min_weight.length > 0 && input.max_weight.length > 0) setButton(false)
        else setButton(true)
    }, [input, setButton])

    return (
        <div className={s.container}>
            
            <Link className={s.home_btn} to="/home"><h3>Home</h3></Link>
            
            <div className={s.form_container}>
                <h1>Create your dog!</h1>
            
            <form className={s.form} onSubmit={handleSubmit} id="form">
                <div className={s.name_lifespan_img_container}>
                    <input autoComplete="off"
                        type="text"
                        value={input.name}
                        name ="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="Name..."
                        />
                    </div>

                <div className={s.error}>{errors.name && <p>{errors.name}</p>}</div>
                
                <div className={s.weight_height_container}>
                <div className={s.min_container}>
                    <input autoComplete="off"
                        type="text"
                        value={input.min_height}
                        name ="min_height"
                        onChange={(e) => handleChange(e)}
                        placeholder="Min height..."
                        />
                    </div>
                

                <div className={s.max_container}>
                    <input autoComplete="off"
                        type="text"
                        value={input.max_height}
                        name ="max_height"
                        onChange={(e) => handleChange(e)}
                        placeholder="Max height..."
                        />
                    </div>
                
                </div>
                <div className={s.error}>{errors.height && <p>{errors.height}</p>}</div>
                
                <div className={s.weight_height_container}>
                <div className={s.min_container}>
                    <input autoComplete="off"
                        type="text"
                        value={input.min_weight}
                        name ="min_weight"
                        onChange={(e) => handleChange(e)}
                        placeholder="Min weight..."
                        />
                    </div>
                

                <div className={s.max_container}>
                    <input autoComplete="off"
                        type="text"
                        value={input.max_weight}
                        name ="max_weight"
                        onChange={(e) => handleChange(e)}
                        placeholder="Max weight..."
                        />
                    </div>
                
                </div>
                <div className={s.error}>{errors.weight && <p>{errors.weight}</p>}</div>
                
                <div className={s.name_lifespan_img_container}>
                    <input autoComplete="off"
                        type="text"
                        value={input.life_span}
                        name ="life_span"
                        onChange={(e) => handleChange(e)}
                        placeholder="Expected lifespan... ex: 14 - 16"
                        />
                    </div>
                <div className={s.error}>{errors.life_span && <p>{errors.life_span}</p>}</div>
                
                <div className={s.name_lifespan_img_container}>
                    <input autoComplete="off"
                        type="text"
                        value={input.image}
                        name ="image"
                        onChange={(e) => handleChange(e)}
                        placeholder="Image URL..."
                        />
                </div>

                <div className={s.h2_container}>
                    <h2>Select Temperaments</h2>
                </div>

                <div className={s.select_container}>
                    <select className={s.temps_select} onChange={handleSelect}>
                        <option disabled selected>Temperaments</option>
                        {temperaments.map(d => (
                    
                        <option value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>
                
                <br />

                

            </form>

            </div>

            <div className={s.create_btn_container}>
                <button className={s.create_btn} disabled={button} type="submit" form="form">Create Dog</button>
            </div>

            <div className={s.temps_container}>
                <div className={s.temps_h1_container}>
                    <h1>Temperaments</h1>
                </div>
                <div className={s.selected_temps_container}>  
                    {input.temperaments.map(el =>
                        <div className={s.added_temp}>
                            <p>{el}</p>
                            <div className={s.temps_btn_overlay}>
                                <button className={s.temps_btn} onClick={() => handleDelete(el)}><i class="gg-close-o"></i></button>
                            </div>
                        </div>
                    )}
                </div>
                      
            </div>
            
        </div>
    )
}

const validate = (input) => {
    let errors = {}
    if(!input.name){
        errors.name = `The name is required.(It shouldn't contain numbers)`
    }
    if(!input.min_height || !input.max_height){
        errors.height = `The weight is required.(It should be: ej '20 to 30')`
    }
    if(!input.min_weight || !input.max_weight){
        errors.weight = `The weight is required.(It should't be words)`
    }
    if(!input.life_span){
        errors.life_span = 'The lifespan is required'
    }
    return errors;
}