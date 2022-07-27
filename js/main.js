`use strict`;

const burgerEl = document.querySelector(`.js-burger`);
const navListEl = document.querySelector(`.js-nav`);
const headerEl = document.querySelector(`.js-header`);
const workingStepsListEl = document.querySelector(`.js-working-steps`);
const workingItemElems = document.querySelectorAll(`.working__item`);
const coverEl = document.createElement(`div`);

new LazyLoad();

// БУРГЕР
// Позиционируем навигацию и регулируем максимальную высоту при изменении размеров viewport
function onSetNavPosResizeWindow() {
  const headerHeight = headerEl.offsetHeight;

  // позиционируем навигацию под header
  navListEl.style.top = headerHeight + `px`;

  // ограничиваем высоту, чтобы использовать скролл при переполнении
  navListEl.style.maxHeight = document.documentElement.clientHeight - headerHeight + `px`;
}

window.addEventListener(`resize`, onSetNavPosResizeWindow);

function onShowMenuBtnClick() {
  onSetNavPosResizeWindow();

  // Добавляем активный класс бургеру и ширме
  burgerEl.querySelector(`.burger`).classList.toggle(`burger_active`);
  coverEl.classList.toggle(`cover-on`);

  // блокируем сколл документа
  document.body.classList.toggle(`hold`);

  navListEl.classList.toggle(`header-nav__list_active`);
}

burgerEl.addEventListener(`click`, onShowMenuBtnClick);

// добавляем ширму для перекрытия контента при открытом меню
coverEl.classList.add(`cover`);
headerEl.insertAdjacentElement(`afterend`, coverEl);

coverEl.addEventListener(`click`, onShowMenuBtnClick);

// СЛАЙДЕР
const swiper = new Swiper(`.hero__swiper`, {
  loop: true,

  slideClass: `hero-swiper__slide`,
  wrapperClass: `hero-swiper__list`,

  autoplay: {
    delay: 5000,
  },

  pagination: {
    el: `.hero-swiper__bullets`,
    bulletClass: `hero-swiper__bullet`,
    bulletActiveClass: `hero-swiper__bullet_active`,
    clickable: true,
    renderBullet: function (index, className) {
      return `<a class="${className}" title="Перейти на ${++index}-й слайд"></a>`;
    }
  },

});

// ТАБЫ
workingStepsListEl.addEventListener(`click`, function(ev) {
  if(!ev.target.classList.contains(`working__link`)) return;

  ev.preventDefault();

  const targetId = ev.target.getAttribute(`href`).split(`#`)[1];
  
  Array.from(this.children).forEach(step => {
    step === ev.target.parentNode ? step.classList.add(`working__step_active`) : step.classList.remove(`working__step_active`);
  });

  workingItemElems.forEach(item => {
    item.id === targetId ? item.classList.add(`working__item_active`) : item.classList.remove(`working__item_active`);
  });
});

// АККОРДИОН
$(`.faq__list`).accordion({
  collapsible: true,
  header: `.faq__btn`,
  heightStyle: `content`,
});
