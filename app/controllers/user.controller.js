function getProfile(req, res, next) {
    res.render('profile')
}

function getSettingsPage(req, res, next) {
    res.render('settings')
}

function getUserListPage(req, res, next) {
    res.render('userMovieList')
}

export {
    getProfile,
    getSettingsPage,
    getUserListPage
}