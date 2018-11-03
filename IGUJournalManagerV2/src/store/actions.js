export const STORE_RESULT = 'STORE_RESULT';
export const FILTER_JOURNALS_BY_NAME = 'FILTER_JOURNALS_BY_NAME';
export const FILTER_JOURNALS_BY_COUNTRY = 'FILTER_JOURNALS_BY_COUNTRY';
export const SEARCH_JOURNALS_BY_NAME = 'SEARCH_JOURNALS_BY_NAME';

export const storeResult = (data) => {
    return {
        type: STORE_RESULT,
        payload: data
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