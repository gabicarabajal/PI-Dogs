
const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    detail: []
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case 'GET_DOGS':
            return {
                ...state,
                dogs: payload,
                allDogs: payload
            }
        
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: payload
            }

        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.allDogs;
            let filteredDogs = [];
            if(payload === 'Todos'){
                filteredDogs = allDogs;
            }
            else{
                for(let i = 0; i < allDogs.length; i++){
                    let found = allDogs[i].temperaments.find(t => t.name === payload);
                    if(found) filteredDogs.push(allDogs[i])
                }

            }
            return{
                ...state,
                dogs: filteredDogs
            }

        case 'FILTER_BY_SOURCE':
            const allDogsSource = state.allDogs;
            const filteredDogsSource = payload === 'createdInDb' ? allDogsSource.filter(el => el.createdInDb) 
            : allDogsSource.filter(el => !el.createdInDb)
            console.log(filteredDogsSource, payload);
            if(!filteredDogsSource.length){
                alert('There is not dogs created')
                return{
                    ...state,
                    dogs: state.allDogs,
                }
            }
            else{
                return {
                    ...state,
                    dogs: payload === 'Todos' ? state.allDogs : filteredDogsSource,
                }
            }
        

        case 'ORDER_BY_NAME':
            const sortedName = payload === "A-Z" ? 
            state.allDogs.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.allDogs.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
        return {
            ...state,
            dogs: sortedName
        }
        
        case 'ORDER_BY_WEIGHT':
            const sortedWeight = payload === 'min_weight' ? state.allDogs.sort((a,b) => {
                if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
                    return 1;
                }
                if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
                    return -1;
                }
                return 0;
            }) :
            state.allDogs.sort((a, b) => {
                if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
                    return -1;
                }
                if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: sortedWeight
            }

        case 'POST_DOG':
            return {
                ...state,
            }

        case 'DOGS_BY_NAME':
            return {
                ...state,
                dogs: payload
            }

        case 'GET_DETAIL':
            return {
                ...state,
                detail: payload
            }

       default: return state;
       
    };
};

export default rootReducer;