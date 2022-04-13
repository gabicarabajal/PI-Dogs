const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();
const express = require('express');

router.post("/dog", async (req, res) => {
    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image
    } = req.body

    const weightFix = [];
    const weightMin = min_weight.trim();
    const weightMax = max_weight.trim();
    weightFix.push(weightMin, weightMax);

    const heightFix = [];
    const heightMin = min_height.trim();
    const heightMax = max_height.trim();
    heightFix.push(heightMin, heightMax);

    let dogCreated = await Dog.create({
        name,
        height: heightFix,
        weight: weightFix,
        life_span,
        image: image ? image : 'https://i.pinimg.com/564x/c7/d8/1f/c7d81f201e1149c9c1879e5839ed28ea.jpg'
    })

    let temperamentDb = await Temperament.findAll({
        where: { name: temperaments }
    })

    dogCreated.addTemperament(temperamentDb);

    res.status(200).send("Dog created succesfully.");
});

router.use(express.json());



module.exports = router;