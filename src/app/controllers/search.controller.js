function getSearchResult(req, res, next) {
    res.render('searchResult')
}

function getShowDetails(req, res, next) {
    // Todo: pass shows details to populate page
    res.render('details')
}

export {
    getSearchResult,
    getShowDetails
}