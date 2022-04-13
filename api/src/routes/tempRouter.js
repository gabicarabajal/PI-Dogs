const { default: axios } = require('axios');
const { Temperament } = require('../db');
const { API_KEY } = process.env;
const { Router } = require('express');
const express = require('express');


const router = Router();

router.get('/temperament', async (req, res) => {
    const tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments = tempApi.data.map(d => d.temperament);
    // console.log(temperaments);
    const temps = temperaments.toString().split(",");
    // console.log(temps);
    temps.forEach(e => {
        let i = e.trim()
        Temperament.findOrCreate({
            where: { name: i }
        })
    })
    //bring all
    const allTemperaments = await Temperament.findAll();
    res.status(200).send(allTemperaments);
});

router.use(express.json());

module.exports = router;