const { Router } = require('express');
const { getAllDogs } = require('../Controller/controllers');
const router = Router();
const express = require('express');



router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let allDogs = await getAllDogs();
    if (name) {
        let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send('Sorry, we cant found the dog.');
    }
    else {
        res.status(200).send(allDogs);
    }
});



router.get("/dogs/:idRaza", async (req, res) => {
    const idRaza = req.params.idRaza;
    const allDogs = await getAllDogs();
    if(idRaza){
        let dogId = await allDogs.filter(d => d.id == idRaza);
        dogId.length?
        res.status(200).json(dogId) :
        res.status(404).send('Dog not found');
    }
});

router.use(express.json());

module.exports = router;
