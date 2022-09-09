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
  const cardBlur = document.querySelectorAll('.card-blur');
  if (cardBlur.length) {
    cardBlur.forEach((el) =>
      el.addEventListener('mouseenter', (event) => {
        el.querySelectorAll('img')[0].classList.add('card-blur-image');
      })
    );
    cardBlur.forEach((el) =>
      el.addEventListener('mouseleave', (event) => {
        el.querySelectorAll('img')[0].classList.remove('card-blur-image');
      })
    );
  }
  if (cards.length) {
    card_extender();
    window.addEventListener('resize', card_extender);
  }
  //Footer Bar Activation
  var footerBar = document.querySelectorAll('.footer-bar-5')[0];
  if (footerBar) {
    var footerBar_select = document.querySelectorAll('#footer-bar .active-nav')[0];
    footerBar_select.insertAdjacentHTML('beforeend', '<strong></strong>');
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

  //Setting Sidebar Widths
  var menus = document.querySelectorAll('.menu');
  function menuFunction() {
    if (menus.length) {
      var menuSidebar = document.querySelectorAll('.menu-box-left, .menu-box-right');
      menuSidebar.forEach(function (e) {
        if (e.getAttribute('data-menu-width') === 'cover') {
          e.style.width = '100%';
        } else {
          e.style.width = e.getAttribute('data-menu-width') + 'px';
        }
      });
      var menuSheets = document.querySelectorAll('.menu-box-bottom, .menu-box-top, .menu-box-modal');
      menuSheets.forEach(function (e) {
        if (e.getAttribute('data-menu-width') === 'cover') {
          e.style.width = '100%';
          e.style.height = '100%';
        } else {
          e.style.width = e.getAttribute('data-menu-width') + 'px';
          e.style.height = e.getAttribute('data-menu-height') + 'px';
        }
      });

      //Opening Menus
      var menuOpen = document.querySelectorAll('[data-menu]');
      var wrappers = document.querySelectorAll('.header, #footer-bar, .page-content');

      menuOpen.forEach((el) =>
        el.addEventListener('click', (e) => {
          //Close Existing Opened Menus
          const activeMenu = document.querySelectorAll('.menu-active');
          for (let i = 0; i < activeMenu.length; i++) {
            activeMenu[i].classList.remove('menu-active');
          }
          //Open Clicked Menu
          var menuData = el.getAttribute('data-menu');
          document.getElementById(menuData).classList.add('menu-active');
          document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
          //Check and Apply Effects
          var menu = document.getElementById(menuData);
          var menuEffect = menu.getAttribute('data-menu-effect');
          var menuLeft = menu.classList.contains('menu-box-left');
          var menuRight = menu.classList.contains('menu-box-right');
          var menuTop = menu.classList.contains('menu-box-top');
          var menuBottom = menu.classList.contains('menu-box-bottom');
          var menuWidth = menu.offsetWidth;
          var menuHeight = menu.offsetHeight;
          var menuTimeout = menu.getAttribute('data-menu-hide');

          if (menuTimeout) {
            setTimeout(function () {
              document.getElementById(menuData).classList.remove('menu-active');
              document.getElementsByClassName('menu-hider')[0].classList.remove('menu-active');
            }, menuTimeout);
          }

          if (menuEffect === 'menu-push') {
            var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
            if (menuLeft) {
              for (let i = 0; i < wrappers.length; i++) {
                wrappers[i].style.transform = 'translateX(' + menuWidth + 'px)';
              }
            }
            if (menuRight) {
              for (let i = 0; i < wrappers.length; i++) {
                wrappers[i].style.transform = 'translateX(-' + menuWidth + 'px)';
              }
            }
            if (menuBottom) {
              for (let i = 0; i < wrappers.length; i++) {
                wrappers[i].style.transform = 'translateY(-' + menuHeight + 'px)';
              }
            }
            if (menuTop) {
              for (let i = 0; i < wrappers.length; i++) {
                wrappers[i].style.transform = 'translateY(' + menuHeight + 'px)';
              }
            }
          }
          if (menuEffect === 'menu-parallax') {
            var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
            if (menuLeft) {
              for (let i = 0; i < wrappers.length; i++) {
                wrappers[i].style.transform = 'translateX(' + menuWidth / 10 + 'px)';
              }
            }
            if (menuRight) {
              for (let i = 0; i < wrappers.length; i++) {
                wrappers[i].style.transform = 'translateX(-' + menuWidth / 10 + 'px)';
              }
            }
            if (menuBottom) {
              for (let i = 0; i < wrappers.length; i++) {
                wrappers[i].style.transform = 'translateY(-' + menuHeight / 5 + 'px)';
              }
            }
            if (menuTop) {
              for (let i = 0; i < wrappers.length; i++) {
                wrappers[i].style.transform = 'translateY(' + menuHeight / 5 + 'px)';
              }
            }
          }
        })
      );

      //Closing Menus
      const menuClose = document.querySelectorAll('.close-menu, .menu-hider');
      menuClose.forEach((el) =>
        el.addEventListener('click', (e) => {
          const activeMenu = document.querySelectorAll('.menu-active');
          for (let i = 0; i < activeMenu.length; i++) {
            activeMenu[i].classList.remove('menu-active');
          }
          for (let i = 0; i < wrappers.length; i++) {
            wrappers[i].style.transform = 'translateX(-' + 0 + 'px)';
          }
        })
      );
    }
  }
  menuFunction();

  //Attaching Menu Hider
  var menuHider = document.getElementsByClassName('menu-hider');
  if (!menuHider.length) {
    var hider = document.createElement('div');
    hider.setAttribute('class', 'menu-hider');
    document.body.insertAdjacentElement('beforebegin', hider);
  }
  if (menuHider[0].classList.contains('menu-active')) {
    menuHider[0].classList.remove('menu-active');
  }

  //Demo function for programtic creation of Menu
  //menu('menu-settings', 'show', 250);

  //Activating Menus
  document.querySelectorAll('.menu').forEach((el) => {
    el.style.display = 'block';
  });
}
init_template();
