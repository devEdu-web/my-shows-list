import mongoose from 'mongoose'
const { Schema } = mongoose

const ShowsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    movieTitle: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    posterPath: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    },
    voteAverage: {
        type: Number,
        required: true
    },
    voteCount: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genresId: {
        type: [ Number ]
    }
})

const Show = mongoose.model('Shows', ShowsSchema)