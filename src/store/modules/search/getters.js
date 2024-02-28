export default {
    // START:: SEARCH RESULT GETTER
    searchResults(state) {
        return state.searchResultData;
    },
    // END:: SEARCH RESULT GETTER

    // START:: GET SEARCH RESULT PAGENATION
    searchResultsPagenation(state) {
        return state.paginations;
    },
    // END:: GET SEARCH RESULT PAGENATION
};
