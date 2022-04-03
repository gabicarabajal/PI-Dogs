const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();
const express = require('express');
const { getAllDogs } = require('../Controller/controllers');


router.post("/dog", async (req, res) => {
    let {
        name,
        height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image
    } = req.body
    
    const fixedWeight= []
    const minWeight = min_weight.trim();
   const maxWeight = max_weight.trim();
   fixedWeight.push(minWeight, maxWeight)

    let dogCreated = await Dog.create({
        name,
        height,
        weight: fixedWeight,
        life_span,
        image: image ? image :'https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg'
    })

    let temperamentDb = await Temperament.findAll({
        where: { name: temperaments }
    })

    dogCreated.addTemperament(temperamentDb);

    res.status(200).send("Dog created succesfully");
});

router.use(express.json());



module.exports = router;