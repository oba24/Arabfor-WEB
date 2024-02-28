export default {
    // START:: SET SEARCH RESULT
    setSearchResult(state, payload) {
        state.searchResultData = payload;
    },
    // END:: SET SEARCH RESULT

    // START:: SET SEARCH PAGENATION
    setSearchPagenation(state, payload) {
        state.paginations.previousPageLink = payload.previousPageLink;
        state.paginations.nextPageLink = payload.nextPageLink;
        state.paginations.lastPage = payload.lastPage;
        state.paginations.itemsPerPage = payload.itemsPerPage;
    },
    // END:: SET SEARCH PAGENATION
};
