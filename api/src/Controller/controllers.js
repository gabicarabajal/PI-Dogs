const { default: axios } = require('axios');
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getApiData = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(d => {
        const temperaments = d.temperament?.toString().split(",")
        const temps = [];
        temperaments?.forEach((el) => {
            temps.push({'name' : el.trim()})
        });

        const weightFix = []
        d.weight.metric.split("-")?.forEach(el => {
            weightFix.push(el.trim())
        })

        
        if(!weightFix[1]) {
            weightFix.push(weightFix[0])
        }

        const heightFix = [];
        d.height.metric.split('-')?.forEach(h => {
            heightFix.push(h.trim());
        })
        if(!heightFix[1]){
            heightFix.push(heightFix[0]);
        }
        

        return {
            id: d.id,
            name: d.name,
            weight: weightFix,
            height: heightFix,
            temperaments: temps,
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
    const apiData = await getApiData();
    const dbData = await getDbData();
    const allData = apiData.concat(dbData);
    return allData;
};



module.exports = { getAllDogs, getApiData, getDbData };