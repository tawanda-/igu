export const STORE_RESULT = 'STORE_RESULT';
export const FILTER_JOURNALS_BY_NAME = 'FILTER_JOURNALS_BY_NAME';
export const FILTER_JOURNALS_BY_COUNTRY = 'FILTER_JOURNALS_BY_COUNTRY';
export const FILTER_JOURNALS_BY_LANGUAGE = 'FILTER_JOURNALS_BY_LANGUAGE';
export const SEARCH_JOURNALS_BY_NAME = 'SEARCH_JOURNALS_BY_NAME';
export const LOADING_STATUS = 'LOADING_STATUS';

export const storeResult = (data) => {
    return {
        type: STORE_RESULT,
        payload: data
    };
};

export const filterJournalsByLanguage = (country, language) => {
    return {
        type: FILTER_JOURNALS_BY_LANGUAGE,
        country: country,
        language: language
    };
};

export const filterJournalsByName = (data) => {
    return {
        type: FILTER_JOURNALS_BY_NAME,
        payload: data
    };
};

export const filterJournalsByCountry = (data) => {
    return {
        type: FILTER_JOURNALS_BY_COUNTRY,
        payload: data
    };
};

export const searchJournalsByName = (data) => {
    return {
        type: SEARCH_JOURNALS_BY_NAME,
        payload: data
    };
};

export const resultsLoading = (data) => {
    return {
        type: LOADING_STATUS,
        payload: data
    };
};