import * as actionTypes from './actions';

const ALL_COUNTRIES = "all countries";

const initialState = {
    journals:[],
    filterResults: [],
    tempJournals:[],
    paginationChars : [],
    filterTerms: [],
    isTopicFilterEnabled: false,
    topicFilter: ""
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_RESULT:

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
                filterResults: action.payload,
                tempJournals: action.payload,
                paginationChars: tempChars,
                filterTerms: tempFilterTerms
            };

        case actionTypes.FILTER_JOURNALS_BY_NAME:
            const tempArray = state.filterResults.filter(result => 
                result.name_of_journal.trim().toLocaleLowerCase().startsWith(action.payload.toLocaleLowerCase())
            );
            return {
                ...state,
                tempJournals: tempArray,
                topicFilter: action.payload
            };

        case actionTypes.FILTER_JOURNALS_BY_COUNTRY:
            var tempTopicArray = [];
            if(action.payload.toLocaleLowerCase() === ALL_COUNTRIES) {
                tempTopicArray = state.journals;
            } else {
                tempTopicArray = state.journals.filter(result =>
                    result.country.trim().toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())
                );
            }

            var  tempTopicChars = [];
            for(var j=0; j< tempTopicArray.length; j++) {
                var chr = tempTopicArray[j].name_of_journal.trim().charAt(0);
                if(!tempTopicChars.includes(chr) && chr.length > 0) {
                    tempTopicChars.push(chr);
                }
            }
            tempTopicChars.sort();

            return {
                ...state,
                filterResults: tempTopicArray,
                tempJournals: tempTopicArray,
                paginationChars: tempTopicChars,
                topicFilter: ""
            };   

        case actionTypes.SEARCH_JOURNALS_BY_NAME:
            const updatedArray = state.filterResults.filter(result =>
                result.name_of_journal.trim().toLocaleLowerCase().startsWith(state.topicFilter.toLocaleLowerCase()) &&  
                result.name_of_journal.trim().toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())
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