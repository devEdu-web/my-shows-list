const similarShowsGlider = document.querySelector('.similar-shows-glider')
const castGlider = document.querySelector('.cast-glider')

const similarShowsPrev = document.querySelector('.similar-shows-prev')
const similarShowsNext = document.querySelector('.similar-shows-next')

const castPrev = document.querySelector('.cast-prev')
const castNext = document.querySelector('.cast-next')


new Glider(similarShowsGlider, {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  rewind: true,
  arrows: {
    prev: similarShowsPrev,
    next: similarShowsNext,
  },
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 810,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 415,
      settings: {
        slidesToShow: 2,
      },
    }
  ] 
})


new Glider(castGlider, {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  rewind: true,
  arrows: {
    prev: castPrev,
    next: castNext,
  },
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 810,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 415,
      settings: {
        slidesToShow: 2,
      },
    }
  ]
})