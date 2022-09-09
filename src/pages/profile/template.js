export function init_template() {
  //Greetig Heading
  var pageTitle = document.querySelectorAll('.page-title-large, .page-title-small, .menu-header a');
  if (pageTitle) {
    var greetingTime = new Date().getHours();
    var greetingMessage;
    var greetingExist = document.querySelectorAll('.greeting-text')[0];
    if (greetingExist) {
      var greetingUser = document.querySelectorAll('.greeting-text')[0].getAttribute('data-username');
      var greetingMorning = 'Good morning';
      var greetingAfternoon = 'Good afternoon';
      var greetingEvening = 'Good evening';

      if (greetingTime >= 0 && greetingTime < 12) {
        greetingMessage = greetingMorning;
      } else if (greetingTime >= 12 && greetingTime < 17) {
        greetingMessage = greetingAfternoon;
      } else if (greetingTime >= 17 && greetingTime < 24) {
        greetingMessage = greetingEvening;
      }
      document.querySelectorAll('.greeting-text')[0].insertAdjacentHTML('beforeend', greetingMessage + ',<br>' + greetingUser);
    }
  }

  //Footer Bar Activation

  var footerBar = document.querySelectorAll('.footer-bar-5')[0];
  if (footerBar) {
    var footerBar_select = document.querySelectorAll('#footer-bar .active-nav')[0];
    footerBar_select.insertAdjacentHTML('beforeend', '<strong></strong>');
  }

  //Contact Form
  var contactForm = document.querySelectorAll('.contact-form');
  if (contactForm.length) {
    var form = document.getElementById('contactForm');
    form.onsubmit = function (e) {
      // Stop the regular form submission
      e.preventDefault();

      //Validate Fields
      var nameField = document.getElementById('contactNameField');
      var mailField = document.getElementById('contactEmailField');
      var textField = document.getElementById('contactMessageTextarea');
      var validateMail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (nameField.value === '') {
        form.setAttribute('data-form', 'invalid');
        nameField.classList.add('border-red-dark');
        document.getElementById('validator-name').classList.remove('disabled');
      } else {
        form.setAttribute('data-form', 'valid');
        document.getElementById('validator-name').classList.add('disabled');
        nameField.classList.remove('border-red-dark');
      }
      if (mailField.value === '') {
        form.setAttribute('data-form', 'invalid');
        mailField.classList.add('border-red-dark');
        document.getElementById('validator-mail1').classList.remove('disabled');
      } else {
        document.getElementById('validator-mail1').classList.add('disabled');
        if (!validateMail.test(mailField.value)) {
          form.setAttribute('data-form', 'invalid');
          mailField.classList.add('border-red-dark');
          document.getElementById('validator-mail2').classList.remove('disabled');
        } else {
          form.setAttribute('data-form', 'valid');
          document.getElementById('validator-mail2').classList.add('disabled');
          mailField.classList.remove('border-red-dark');
        }
      }
      if (textField.value === '') {
        form.setAttribute('data-form', 'invalid');
        textField.classList.add('border-red-dark');
        document.getElementById('validator-text').classList.remove('disabled');
      } else {
        form.setAttribute('data-form', 'valid');
        document.getElementById('validator-text').classList.add('disabled');
        textField.classList.remove('border-red-dark');
      }

      if (form.getAttribute('data-form') === 'valid') {
        document.querySelectorAll('.form-sent')[0].classList.remove('disabled');
        document.querySelectorAll('.contact-form')[0].classList.add('disabled');
        // Collect the form data while iterating over the inputs
        var data = {};
        for (let i = 0, ii = form.length; i < ii; ++i) {
          let input = form[i];
          if (input.name) {
            data[input.name] = input.value;
          }
        }
        // Construct an HTTP request
        var xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action, true);
        xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // Send the collected data as JSON
        xhr.send(JSON.stringify(data));
        // Callback function
        xhr.onloadend = function (response) {
          if (response.target.status === 200) {
            console.log('Form Submitted');
          }
        };
      }
    };
  }

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
}
init_template();
