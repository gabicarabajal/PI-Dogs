// const { default: axios } = require('axios');
const { Router } = require('express');
const dogsRequire = require('./dogsRouter');
const temperamentRequire = require('./tempRouter');
const dogRequire = require('./dogRouter');
// const { Dog, Temperament } = require("../db");
// const { API_KEY } = process.env;
// const express = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
router.use('/', dogRequire);
router.use('/', dogsRequire);
router.use('/', temperamentRequire);

// const getApiData = async () => {
//     const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//     const apiData = await apiUrl.data.map(d => {
//         const temperaments = d.temperament?.toString().split(",")
//         const fixedTemps = []
//         temperaments?.forEach((el) => {
//             fixedTemps.push(el.trim());
//         });

//         return {
//             id: d.id,
//             name: d.name,
//             weight: d.weight.metric,
//             height: d.height.metric,
//             temperaments: fixedTemps,
//             life_span: d.life_span,
//             image: d.image.url
//         }
//     });

//     return apiData;
// };

// const getDbData = async () => {
//     return await Dog.findAll({
//         include: {
//             model: Temperament,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }
//         }
//     })
// };

// const getAllDogs = async () => {
//     const apiData = await getApiData();
//     const dbData = await getDbData();
//     const allData = apiData.concat(dbData);
//     return allData;
// };

// router.get('/dogs', async (req, res) => {
//     const name = req.query.name;
//     let allDogs = await getAllDogs();
//     if (name) {
//         let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
//         dogName.length ?
//             res.status(200).send(dogName) :
//             res.status(404).send('Sorry, we cant found the dog.');
//     }
//     else {
//         res.status(200).send(allDogs);
//     }
// });


// router.get('/temperament', async (req, res) => {
//     const tempApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//     const temperaments = tempApi.data.map(d => d.temperament);
//     // console.log(temperaments);
//     const temps = temperaments.toString().split(",");
//     temps.forEach(e => {
//         Temperament.findOrCreate({
//             where: { name: e }
//         })
//     })

//     const allTemperaments = await Temperament.findAll();
//     res.status(200).send(allTemperaments);
// });

// router.get("/dogs/:idRaza", async (req, res) => {
//     const idRaza = req.params.idRaza;
//     const allDogs = await getAllDogs();
//     if(idRaza){
//         let dogId = await allDogs.filter(d => d.id == idRaza);
//         dogId.length?
//         res.status(200).json(dogId) :
//         res.status(404).send('Dog not found');
//     }
// })

// router.post("/dog", async (req, res) => {
//     const {
//         name,
//         height,
//         weight,
//         life_span,
//         temperaments,
//         image
//     } = req.body

//     const dogCreated = await Dog.create({
//         name,
//         height,
//         weight,
//         life_span,
//         image
//     });

//     let temperamentDb = await Temperament.findAll({
//         where: { name: temperaments }
//     });

//     dogCreated.addTemperament(temperamentDb);

//     res.status(200).send("Dog created succesfully");
// });


// router.use(express.json());
// module.exports = {
//     getAllDogs, getData, getDbData
// };
module.exports = router;
