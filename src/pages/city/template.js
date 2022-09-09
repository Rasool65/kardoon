export function customFunction() {
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
  featherIcons();

  function shapeChanger() {
    var shapeCutLeft = document.getElementById('shape-cut-left');
    var shapeCutRight = document.querySelectorAll('#shape-cut-right')[0];
    var shapeCutRound = document.querySelectorAll('#shape-rounded')[0];
    var headerCard = document.querySelectorAll('.header-card')[0];
    var colorCard = document.querySelectorAll('.color-card')[0];
    var footerCard = document.querySelectorAll('.footer-card')[0];

    if (shapeCutLeft) {
      shapeCutLeft.addEventListener('click', function (e) {
        headerCard.classList.remove('shape-rounded', 'shape-cut-right');
        headerCard.classList.add('shape-cut-left');
        footerCard.classList.remove('shape-rounded', 'shape-cut-right');
        footerCard.classList.add('shape-cut-left');
        colorCard.classList.remove('shape-rounded', 'shape-cut-right');
        colorCard.classList.add('shape-cut-left');
      });

      shapeCutRight.addEventListener('click', function () {
        headerCard.classList.remove('shape-rounded', 'shape-cut-left');
        headerCard.classList.add('shape-cut-right');
        footerCard.classList.remove('shape-rounded', 'shape-cut-left');
        footerCard.classList.add('shape-cut-right');
        colorCard.classList.remove('shape-rounded', 'shape-cut-left');
        colorCard.classList.add('shape-cut-right');
      });

      shapeCutRound.addEventListener('click', function () {
        headerCard.classList.remove('shape-cut-left', 'shape-cut-right');
        headerCard.classList.add('shape-rounded');
        footerCard.classList.remove('shape-cut-left', 'shape-cut-right');
        footerCard.classList.add('shape-rounded');
        colorCard.classList.remove('shape-cut-left', 'shape-cut-right');
        colorCard.classList.add('shape-rounded');
      });
    }
  }

  //Calling Functions Required After External Menus are Loaded
  var dataMenuLoad = document.querySelectorAll('[data-menu-load]');
  dataMenuLoad.forEach(function (e) {
    var menuLoad = e.getAttribute('data-menu-load');
    fetch(menuLoad)
      .then((data) => data.text())
      .then((html) => (e.innerHTML = html))
      .then((data) => {
        setTimeout(function () {
          if (dataMenuLoad[dataMenuLoad.length - 1] === e) {
            menuFunction();
            checkDarkMode();
            activateMenus();
            shareLinks();
            highlightColors();
            selectHighlight();
            card_extender();
            backUp();
            shapeChanger();
            copyright_year();
            feather.replace();
            featherIcons();
          }
        }, 500);
      });
  });

  //Footer Bar Activation
  var footerBar = document.querySelectorAll('.footer-bar-5')[0];
  if (footerBar) {
    var footerBar_select = document.querySelectorAll('#footer-bar .active-nav')[0];
    footerBar_select.insertAdjacentHTML('beforeend', '<strong></strong>');
  }
}
customFunction();
