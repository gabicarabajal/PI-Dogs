const { default: axios } = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env;
const { Router } = require('express');
// const { getAllDogs } = require('./controllers');
const express = require('express');


const router = Router();

router.get('/temperament', async (req, res) => {
    const tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments = tempApi.data.map(d => d.temperament);
    // console.log(temperaments);
    const temps = temperaments.toString().split(",");
    temps.forEach(e => {
        Temperament.findOrCreate({
            where: { name: e }
        })
    })

    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
});

router.use(express.json());

module.exports = router;