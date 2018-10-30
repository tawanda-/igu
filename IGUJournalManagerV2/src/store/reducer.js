import * as actionTypes from './actions';


const initialState = {
    journals:[],
    tempJournals:[],
    paginationChars : []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_RESULT:

            //todo: maybe move this code
            var tempChars = [];
            var journals = action.payload;
            for(var i=0; i< journals.length; i++) {
                var firstChar = journals[i].name_of_journal.trim().charAt(0);
                if(!tempChars.includes(firstChar)) {
                    tempChars.push(firstChar);
                }
            }
            console.log("Pagination Filters: " + tempChars.sort());
            return {
                ...state,
                journals: action.payload,
                tempJournals: action.payload,
                paginationChars: tempChars
            };   

        case actionTypes.FILTER_JOURNALS_BY_NAME:
            const tempArray = state.journals.filter(result => 
                result.name_of_journal.trim().toLocaleLowerCase().startsWith(action.payload.toLocaleLowerCase())
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