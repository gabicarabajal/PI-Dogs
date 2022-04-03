const { default: axios } = require('axios');
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getApiData = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(d => {
        const temperaments = d.temperament?.toString().split(",")
        const fixedTemps = []
        temperaments?.forEach((el) => {
            fixedTemps.push({'name' : el.trim()})
        });

        const fixedWeight = []
        d.weight.metric.split("-")?.forEach(el => {
            fixedWeight.push(el.trim())
        })

        
        if(!fixedWeight[1]) {
            fixedWeight.push(fixedWeight[0])
        }
        

        return {
            id: d.id,
            name: d.name,
            weight: fixedWeight,
            height: d.height.metric,
            temperaments: fixedTemps,
            life_span: d.life_span,
            image: d.image.url,
            api: true
        }
    });

    return apiInfo;
};

const getDbData = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
};

const getAllDogs = async () => {
    const apiUrl = await getApiData();
    const dbData = await getDbData();
    const allData = apiUrl.concat(dbData);
    return allData;
};



module.exports = { getAllDogs, getApiData, getDbData };