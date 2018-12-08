import * as actionTypes from './actions';

const ALL_COUNTRIES = "all countries";
const ALL_LANGUAGES = "all languages";

const initialState = {
    resultsLoading: false,
    journals:[],
    filterResults: [],
    tempJournals:[],
    paginationChars : [],
    filterTerms: [],
    languageTerms: [],
    topicFilter: ""
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_RESULT:

            var tempFilterTerms = [], tempChars = [], tempLanguageTerms = [];
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

                var lang = journals[i].language.trim();
                if(lang.length > 0) {
                    if(!tempLanguageTerms.includes(lang)) {
                        tempLanguageTerms.push(lang);
                    }
                }
            }
            tempChars.sort();
            tempFilterTerms.sort();
            tempLanguageTerms.sort();

            return {
                ...state,
                journals: action.payload,
                filterResults: action.payload,
                tempJournals: action.payload,
                paginationChars: tempChars,
                filterTerms: tempFilterTerms,
                languageTerms: tempLanguageTerms,
                resultsLoading: false
            };

        case actionTypes.FILTER_JOURNALS_BY_NAME:
            const tempArray = state.filterResults.filter(result => {
                result.name_of_journal.trim().toLowerCase().startsWith(action.payload.toLowerCase())
            });

            var  tempLang = [];
            for(var a=0; a< tempArray.length; a++) {
                //language filter terms
                var lg = tempArray[a].language.trim();
                if(lg.length > 0) {
                    if(!tempLang.includes(lg)) {
                        tempLang.push(lg);
                    }
                }
            }
            tempLang.sort();
            
            return {
                ...state,
                tempJournals: tempArray,
                topicFilter: action.payload,
                languageTerms: tempLang,
                resultsLoading: false
            };

        case actionTypes.FILTER_JOURNALS_BY_COUNTRY:
            var tempCountriesArray = [];
            if(action.payload.toLowerCase() === ALL_COUNTRIES) {
                tempCountriesArray = state.journals;
            } else {
                tempCountriesArray = state.journals.filter(result =>
                    result.country.trim().toLowerCase().includes(action.payload.trim().toLowerCase())
                );
            }

            var  tempTopicChars = [], tempLangArray = [];
            for(var j=0; j< tempCountriesArray.length; j++) {
                var chr = tempCountriesArray[j].name_of_journal.trim().charAt(0);
                if(!tempTopicChars.includes(chr) && chr.length > 0) {
                    tempTopicChars.push(chr);
                }

                //language filter terms
                var lng = tempCountriesArray[j].language.trim();
                if(lng.length > 0) {
                    if(!tempLangArray.includes(lng)) {
                        tempLangArray.push(lng);
                    }
                }
            }
            tempTopicChars.sort();
            tempLangArray.sort();

            return {
                ...state,
                filterResults: tempCountriesArray,
                tempJournals: tempCountriesArray,
                paginationChars: tempTopicChars,
                languageTerms: tempLangArray,
                topicFilter: "",
                resultsLoading: false
            };   

        case actionTypes.FILTER_JOURNALS_BY_LANGUAGE:

            var langArray = [], tempLangChars = [];
            if (action.language.toLowerCase() === ALL_LANGUAGES) {
                langArray = state.filterResults;
            } else if(action.country === '' && state.topicFilter === '') {
                langArray = state.filterResults.filter(result =>
                    result.language.trim().toLowerCase() === action.language.trim().toLowerCase() //restricts to exaxtly matching names
                );
            } else if(action.country === '' && state.topicFilter !== '') {
                console.log('Condition 2 ');

                langArray = state.filterResults.filter(result =>
                    result.name_of_journal.trim().toLowerCase().startsWith(state.topicFilter.toLowerCase()) &&
                    result.language.trim().toLowerCase() === action.language.trim().toLowerCase()
                );

            } else {
                langArray = state.filterResults.filter(result =>
                    result.name_of_journal.trim().toLowerCase().startsWith(state.topicFilter.toLowerCase()) &&
                    result.country.trim().toLowerCase().includes(action.country.trim().toLowerCase()) && //?? could be ''
                    result.language.trim().toLowerCase() === action.language.trim().toLowerCase()
                );
            }

            for(var z=0; z < langArray.length; z++) {
                var chars = langArray[z].name_of_journal.trim().charAt(0);
                if(!tempLangChars.includes(chars) && chars.length > 0) {
                    tempLangChars.push(chars);
                }
            }
            tempLangChars.sort();

            return {
                ...state,
                tempJournals: langArray,
                paginationChars: tempLangChars,
                topicFilter: "",
                resultsLoading: false
            }; 

            
        case actionTypes.SEARCH_JOURNALS_BY_NAME:
        const updatedArray = state.filterResults.filter(result =>
            result.name_of_journal.trim().toLowerCase().startsWith(state.topicFilter.toLowerCase()) &&  
            result.name_of_journal.trim().toLowerCase().includes(action.payload.trim().toLowerCase())
        );
        return {
            ...state,
            tempJournals: updatedArray,
            resultsLoading: false
        };

        case actionTypes.LOADING_STATUS:
        return {
            ...state,
            resultsLoading: true
        };

        default:
            return state;    
    }
};

export default reducer;