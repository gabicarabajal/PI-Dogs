const { Router } = require('express');
const { getAllDogs } = require('../Controller/controllers');
const router = Router();
const express = require('express');
const {Dog} = require('../db');



router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let allDogs = await getAllDogs();
    if (name) {
        const dogName = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
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

router.delete('/dogs/:idRaza', async (req, res) => {
    const idRaza = req.params.idRaza;
    if(idRaza){
      let dogDelete = await Dog.destroy({
        where: {
            id: idRaza
        }
    });
    dogDelete.length ? 
    res.status(404).send('no se pudo borrar') :
    res.status(200).send('borrado');
}

})


router.use(express.json());

module.exports = router;
