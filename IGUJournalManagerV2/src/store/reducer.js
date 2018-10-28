import * as actionTypes from './actions';


const initialState = {
    journals:[{name:'name', id:'123'}, {name:'second name', id:'456'}],
    tempJournals:[]
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                journals: action.payload,
                tempJournals: action.payload
            };   

        case actionTypes.FILTER_JOURNALS_BY_NAME:
            const tempArray = state.journals.filter(result => 
                result.name.toLocaleLowerCase().startsWith(action.payload.toLocaleLowerCase())
            );
            return {
                ...state,
                tempJournals: tempArray
            };   

        case actionTypes.FILTER_JOURNALS_BY_TOPIC:
            const tempTopicArray = state.journals.filter(result =>
                 result.topic.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())
            );
            return {
                ...state,
                tempJournals: tempTopicArray
            };   

        case actionTypes.SEARCH_JOURNALS_BY_NAME:
            const updatedArray = state.journals.filter(result =>
                 result.country.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())
            );
            return {
                ...state,
                tempJournals: updatedArray
            };    

        default:
            return state;    
    }
};

export default reducer;