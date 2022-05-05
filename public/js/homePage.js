const trendingMoviesGlider = document.querySelector(
  '.top-rating-movies-glider'
);
const popularMoviesGlider = document.querySelector('.popular-movies-glider');
const trendingShowsGlider = document.querySelector('.top-rating-shows-glider');
const showsGlidersElement = document.querySelectorAll('.glider');
const controls = {
  prev: [
    '.top-rating-movies-prev',
    '.popular-movies-prev',
    '.top-rating-shows-prev',
    '.popular-shows-prev',
  ],
  next: [
    '.top-rating-movies-next',
    '.popular-movies-next',
    '.top-rating-shows-next',
    '.popular-shows-next',
  ],
};

const gliderBaseConfig = {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  rewind: true,
  arrows: {
    prev: '.prev',
    next: '.next',
  },
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
};

window.addEventListener('load', () => {
  showsGlidersElement.forEach((glider, index) => {
    new Glider(
      glider,
      Object.defineProperty(gliderBaseConfig, 'arrows', {
        value: {
          next: controls.next[index],
          prev: controls.prev[index],
        },
      })
    );
  });
});
