function getProfile(req, res, next) {
    res.render('profile')
}

function getSettingsPage(req, res, next) {
    res.render('settings')
}

export {
    getProfile,
    getSettingsPage
}