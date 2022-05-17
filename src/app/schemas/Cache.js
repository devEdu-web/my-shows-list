const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const CacheSchema = new Schema({
  expire: Date,
  topRatedMovies: [  ],
  popularMovies: [  ],
  topRatedShows: [  ],
  popularShows: [  ]
})

CacheSchema.index({ expire: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('Cache', CacheSchema)