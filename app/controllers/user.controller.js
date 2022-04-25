function getProfile(req, res, next) {
    res.render('profile')
}

function getSettingsPage(req, res, next) {
    res.render('settings')
}

function getUserMoviesListPage(req, res, next) {
    res.render('userMovieList')
}

function getUserShowsListPage(req, res, next) {
    res.render('userShowsList')
}

export {
    getProfile,
    getSettingsPage,
    getUserMoviesListPage,
    getUserShowsListPage
}