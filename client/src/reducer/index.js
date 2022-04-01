const initialState = {
    dogs: []
}

function rootReducer(state = initialState, {type, payload}){
    switch(type){
        case 'GET_DOGS':
            return {
                ...state,
                dogs: payload
            }
    }
}

export default rootReducer;