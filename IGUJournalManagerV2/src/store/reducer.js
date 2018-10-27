import * as actionTypes from './actions';

const initialState = {
    journals:[{name:'name', id:'123'}, {name:'second', id:'456'}]
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ALL_JOURNALS:
            return {
                ...state,
                journals: [] //todo: set new state
            };

        case actionTypes.FILTER_JOURNALS_BY_NAME:
            return {
                journals:[{name:'blue', id:'000'}, {name:'farm', id:'33'}]
            };

        case actionTypes.FILTER_JOURNALS_BY_TOPIC:
            return {
                journals:[{name:'topic', id:'45'}, {name:'change', id:'7'}]
            };

        case actionTypes.SEARCH_JOURNALS_BY_NAME:
            return {
                journals:[{name: action.payload, id:'1'}, {name:'na', id:'87'}]
            };    

        default:
            return state;    
    }
};

export default reducer;