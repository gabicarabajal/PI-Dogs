const { default: axios } = require('axios');
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getApiData = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiData = await apiUrl.data.map(d => {
        const temperaments = d.temperament?.toString().split(",")
        const fixedTemps = []
        temperaments?.forEach((el) => {
            fixedTemps.push(el.trim());
        });

        return {
            id: d.id,
            name: d.name,
            weight: d.weight.metric,
            height: d.height.metric,
            temperaments: fixedTemps,
            life_span: d.life_span,
            image: d.image.url
        }
    });

    return apiData;
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
    const apiData = await getApiData();
    const dbData = await getDbData();
    const allData = apiData.concat(dbData);
    return allData;
};



module.exports = { getAllDogs, getApiData, getDbData };