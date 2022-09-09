export function init_template() {
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
  // Footer Menu bar
  feather.replace();
  function featherIcons() {
    var featherIcon = document.querySelectorAll('.feather');

    featherIcon.forEach((el) => {
      var strokeWidth = el.getAttribute('data-feather-line');
      var featherSize = el.getAttribute('data-feather-size');

      el.style.strokeWidth = strokeWidth;
      el.style.width = featherSize;
      el.style.height = featherSize;
    });
  }
}
init_template();
