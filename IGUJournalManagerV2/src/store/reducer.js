import * as actionTypes from './actions';


const initialState = {
    journals:[],
    tempJournals:[],
    paginationChars : [],
    filterTerms: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_RESULT:

            //todo: maybe move this code
            var tempFilterTerms = [], tempChars = [];
            var journals = action.payload;

            for(var i=0; i< journals.length; i++) {
                var firstChar = journals[i].name_of_journal.trim().charAt(0);
                if(!tempChars.includes(firstChar) && firstChar.length > 0) {
                    tempChars.push(firstChar);
                }

                var country = journals[i].country.trim();
                if(country.length > 0) {
                    //sanitize country names
                    country = country.charAt(0).toUpperCase() + country.substring(1);
                    if(!tempFilterTerms.includes(country)) {
                        tempFilterTerms.push(country);
                    }
                }
            }
            tempChars.sort();
            tempFilterTerms.sort();

            return {
                ...state,
                journals: action.payload,
                tempJournals: action.payload,
                paginationChars: tempChars,
                filterTerms: tempFilterTerms
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
            //todo: complete
            const tempTopicArray = state.journals.filter(result =>
                 result.country.trim().toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())
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