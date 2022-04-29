class UserController {
    getProfilePage(req, res, next) {
        res.render('profile')
    }

    getSettingsPage() {
        res.render('settings')
    }

    getMoviesListPage() {
        res.render('userMovieList')
    }

    getShowsListPage() {
        res.render('userShowsList')
    }
}

module.exports = new UserController()