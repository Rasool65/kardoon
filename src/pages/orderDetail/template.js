export const CustomFunctions = () => {
  function init_template() {
    //Activating Menus
    document.querySelectorAll('.menu').forEach((el) => {
      el.style.display = 'block';
    });

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
    menuFunction();
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
};
