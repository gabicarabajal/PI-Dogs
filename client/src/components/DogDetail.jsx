import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';
import s from '../styles/DogDetail.module.css';

export default function DogDetail() {

    const dispatch = useDispatch();
    let { id } = useParams()
    console.log(id)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])

    const myDog = useSelector((state) => state.detail)

    let temps = []
    myDog[0]?.temperaments?.forEach((t) => temps.push(t.name));

    return (
        <div className={s.container}>
            <Link to='/home'>
                <button className={s.button}>Home</button>
            </Link>
            {
                myDog.length > 0 ?
                    <div className={s.dog_container}>
                        <div className={s.img_container}>
                            <img src={myDog[0].image} alt='Imagen' height='300' width='300' />
                        </div>
                        <div className={s.details_container}>
                            <div className={s.h1_container}>
                                <h1>{myDog[0].name}</h1>
                            </div>
                            <div className={s.dog_info}>
                                <h2>HEIGHT:</h2><h4>Between {myDog[0].height} cm</h4>
                                <h2>WEIGHT:</h2><h4>Between {myDog[0].weight[0]} and {myDog[0].weight[1]} Kg</h4>
                                <h2>LIFESPAN:</h2><h4>Between {myDog[0].life_span}</h4>
                            </div>
                            <div className={s.temperaments_container}>
                                <h2>TEMPERAMENTS:</h2>
                                {temps.map(t => <div className={s.temp}>
                                    {t}
                                </div>)}
                            </div>
                        </div>
                    </div>
                    :
                    <p>Loading...</p>
            }
        </div>
    )
}