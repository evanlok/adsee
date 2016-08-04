var templateUrl = require('./theme_selector.html');

var component = {
  templateUrl: templateUrl,
  controller: ThemeSelectorController,
  bindings: {}
};

/*@ngInject*/
function ThemeSelectorController() {
  var vm = this;

  vm.$onInit = function () {
  };

  vm.$postLink = function () {
    setupSlickCarousel();
  };

  function setupSlickCarousel() {
    $('.slick-carousel').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '25%',
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
      dots: false
    });
  }
}

module.exports = component;
