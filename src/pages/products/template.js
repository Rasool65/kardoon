export function init_template() {
  const accordionBtn = document.querySelectorAll('.accordion-btn');
  if (accordionBtn.length) {
    accordionBtn.forEach((el) =>
      el.addEventListener('click', (event) => {
        el.querySelector('i:last-child').classList.toggle('fa-rotate-180');
      })
    );
  }
}
init_template();
