// import iziToast from "izitoast";
// import i18n from "@/i18n.js";

// START:: IMPORTING AXIOS
import axios from "axios";
// END:: IMPORTING AXIOS

export default {
    // START:: GET SEARCH RESULT
    getSearchResult(context, payload) {
        // START:: SEND GET REQUEST
        axios({
            method: "GET",
            url: `search`,
            params: {
                keyword: payload,
                type: true,
            },
        })
            .then((res) => {
                // START:: SET SEARCH RESULT DATA
                context.commit("setSearchResult", res.data.data);
                // END:: SET SEARCH RESULT DATA

                // START:: SET PAGENATION DATA
                context.commit("setSearchPagenation", {
                    previousPageLink: res.data.links.prev,
                    nextPageLink: res.data.links.next,
                    lastPage: res.data.meta.last_page,
                    itemsPerPage: res.data.meta.per_page,
                });
                // END:: SET PAGENATION DATA
            })
            .catch((err) => {
                this.isWaitingRequest = false;
                console.log(err.response.data.message);
            });
        // END:: SEND GET REQUEST
    },
    // END:: GET SEARCH RESULT

    // START:: PAGINATION SET SEARCH RESULTS DATA
    // setTableRowsByPagination( pageLink, selectedPage )
    setSearchResultsByPagination(context, payload) {
        let pageNumber = payload.selectedPage
            ? payload.selectedPage
            : payload.pageLink.slice(-1);
        // console.log(pageNumber);

        // START:: SEND GET REQUEST
        axios({
            method: "GET",
            url: `filter`,
            params: { page: pageNumber },
        })
            .then((res) => {
                // START:: SET SEARCH RESULT DATA
                context.commit("setSearchResult", res.data.data);
                // END:: SET SEARCH RESULT DATA

                // START:: SET PAGENATION DATA
                context.commit("setSearchPagenation", {
                    previousPageLink: res.data.links.prev,
                    nextPageLink: res.data.links.next,
                    lastPage: res.data.meta.last_page,
                    itemsPerPage: res.data.meta.per_page,
                });
                // END:: SET PAGENATION DATA
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
        // END:: SEND GET REQUEST
    },
    // END:: PAGINATION SET SEARCH RESULTS DATA
};
