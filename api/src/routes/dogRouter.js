const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();
const express = require('express');
const { getAllDogs } = require('../Controller/controllers');


router.post("/dog", async (req, res) => {
    const {
        name,
        height,
        weight,
        life_span,
        temperaments,
        image
    } = req.body

    const dogCreated = await Dog.create({
        name,
        height,
        weight,
        life_span,
        image
    });

    let temperamentDb = await Temperament.findAll({
        where: { name: temperaments }
    });

    dogCreated.addTemperament(temperamentDb);

    res.status(200).send("Dog created succesfully");
});

router.use(express.json());



module.exports = router;