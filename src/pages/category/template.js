export function init_template() {
  //Image Sliders
  var splide = document.getElementsByClassName('splide');
  if (splide.length) {
    var singleSlider = document.querySelectorAll('.single-slider');
    if (singleSlider.length) {
      singleSlider.forEach(function (e) {
        var single = new Splide('#' + e.id, {
          type: 'loop',
          direction: 'rtl',
          autoplay: true,
          interval: 4000,
          perPage: 1,
        }).mount();
        var sliderNext = document.querySelectorAll('.slider-next');
        var sliderPrev = document.querySelectorAll('.slider-prev');
        sliderNext.forEach((el) =>
          el.addEventListener('click', (el) => {
            single.go('>');
          })
        );
        sliderPrev.forEach((el) =>
          el.addEventListener('click', (el) => {
            single.go('<');
          })
        );
      });
    }

    var doubleSlider = document.querySelectorAll('.double-slider');
    if (doubleSlider.length) {
      doubleSlider.forEach(function (e) {
        var double = new Splide('#' + e.id, {
          type: 'loop',
          direction: 'rtl',
          autoplay: true,
          interval: 4000,
          arrows: false,
          perPage: 2,
        }).mount();
      });
    }

    var trippleSlider = document.querySelectorAll('.tripple-slider');
    if (trippleSlider.length) {
      trippleSlider.forEach(function (e) {
        var tripple = new Splide('#' + e.id, {
          type: 'loop',
          direction: 'rtl',
          autoplay: true,
          padding: {
            left: '0px',
            right: '80px',
          },
          interval: 4000,
          arrows: false,
          perPage: 2,
          perMove: 1,
        }).mount();
      });
    }
  }

  //Card Extender
  const cards = document.getElementsByClassName('card');
  function card_extender() {
    var headerHeight, footerHeight, headerOnPage;
    var headerOnPage = document.querySelectorAll('.header:not(.header-transparent)')[0];
    var footerOnPage = document.querySelectorAll('#footer-bar')[0];

    headerOnPage ? (headerHeight = document.querySelectorAll('.header')[0].offsetHeight) : (headerHeight = 0);
    footerOnPage ? (footerHeight = document.querySelectorAll('#footer-bar')[0].offsetHeight) : (footerHeight = 0);

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].getAttribute('data-card-height') === 'cover') {
        if (window.matchMedia('(display-mode: fullscreen)').matches) {
          var windowHeight = window.outerHeight;
        }
        if (!window.matchMedia('(display-mode: fullscreen)').matches) {
          var windowHeight = window.innerHeight;
        }
        //Fix for iOS 15 pages with data-height="cover"
        var coverHeight = windowHeight + 'px';
        // - Remove this for iOS 14 issues - var coverHeight = windowHeight - headerHeight - footerHeight + 'px';
      }
      if (cards[i].getAttribute('data-card-height') === 'cover-card') {
        var windowHeight = window.innerHeight;
        var coverHeight = windowHeight - 175 + 'px';
        cards[i].style.height = coverHeight;
      }
      if (cards[i].getAttribute('data-card-height') === 'cover-full') {
        if (window.matchMedia('(display-mode: fullscreen)').matches) {
          var windowHeight = window.outerHeight;
        }
        if (!window.matchMedia('(display-mode: fullscreen)').matches) {
          var windowHeight = window.innerHeight;
        }
        var coverHeight = windowHeight + 'px';
        cards[i].style.height = coverHeight;
      }
      if (cards[i].hasAttribute('data-card-height')) {
        var getHeight = cards[i].getAttribute('data-card-height');
        cards[i].style.height = getHeight + 'px';
        if (getHeight === 'cover') {
          var totalHeight = getHeight;
          cards[i].style.height = coverHeight;
        }
      }
    }
  }

  if (cards.length) {
    card_extender();
    window.addEventListener('resize', card_extender);
  }
}
init_template();
