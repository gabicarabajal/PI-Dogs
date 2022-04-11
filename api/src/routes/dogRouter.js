const { Dog, Temperament } = require('../db');
const { Router } = require('express');
const router = Router();
const express = require('express');
const { getAllDogs } = require('../Controller/controllers');


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
    
    const fixedWeight= []
    const minWeight = min_weight.trim();
   const maxWeight = max_weight.trim();
   fixedWeight.push(minWeight, maxWeight)

   const heightFix = [];
   const heightMin = min_height.trim();
   const heightMax = max_height.trim();
   heightFix.push(heightMin, heightMax)

    let dogCreated = await Dog.create({
        name,
        height: heightFix,
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