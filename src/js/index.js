import '../styles/styles.scss'

import 'mdbootstrap/js/bootstrap'
import 'node-waves/dist/waves'
import 'lazyload'
import "owl.carousel"
import "lightbox2/src/js/lightbox"
import ymaps from 'ymaps'

ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
  .then(maps => {
    const object1 = new maps.GeoObject({
      geometry: {
        type: "Point", // geometry type - point
        coordinates: [44.953576, 34.118536]
      }
    });
    const object2 = new maps.GeoObject({
      geometry: {
        type: "Point", // geometry type - point
        coordinates: [44.584905, 33.508058]
      }
    });

    const map = new maps.Map('yandex-map', {
      center: [44.584905, 33.508058],
      zoom: 11
    });
    map.geoObjects.add(object1);
    map.geoObjects.add(object2);
    map.controls.add(new maps.control.ZoomControl());
    map.controls.add('typeSelector');
    map.setBounds(map.geoObjects.getBounds());
    map.setZoom(8);
    $('.yandex-coordinate').click(function() {
      const atr = {
        x: $(this).attr('data-coordinate-x'),
        y: $(this).attr('data-coordinate-y')
      }
      map.setCenter([atr.x, atr.y]);
      map.setZoom(15);
    })
  })

$('.carousel.carousel-multi-item.v-2 .carousel-item').each(function() {
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i = 0; i < 4; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }
});

$(document).ready(function() {
  console.log('ready');
  replacePhone();
  searchShow();
  getSlideHeight();
  lazyload($("img.lazy"));
  $('.carousel-main').carousel({
    interval: 5000,
    touch: true,
    ride: true,
  });
  startProductSlider();
  $('.material-tooltip-main').tooltip();
  setCarouselsProduct();
  $('.main-product select[name=size]').change(function(e) {
    $('#mainCart select[name=size] option[value='+e.target.value+']').attr("selected", "selected")
  })
  $('.main-product select[name=system]').change(function(e) {
    $('#mainCart select[name=system] option[value='+e.target.value+']').attr("selected", "selected")
  })

})
Waves.attach('.btn');
Waves.init();
$(window).resize(function(e) {
  getSlideHeight();
})

/**
 * Перевод телефона в красивый вид
 */
function replacePhone() {
  let text = $('.header__phone a').text();
  text = text.replace(')', ')<span>');
  text += '</span>';
  $('.header__phone a').html(text);
}

/**
 *
 *
 */
function searchShow() {
  $('.header__search').click(function() {
    $(this).toggleClass('active');
    $('.search').slideToggle();
  })
}

function getSlideHeight() {
  const windowHeight = $(window).height();
  const menuHeight = $('.main-menu').height();
  const headerHeight = $('.header').height();
  let height = 0;
  const carouselHeight = windowHeight - (menuHeight + headerHeight) - 50;
  $('.carousel-main .carousel-item').each(function() {
    const wrap = $(this).find('.slider__wrap')[0];
    const wrapHeight = $(wrap).height();
    if (height < wrapHeight) {
      height = wrapHeight;
    }
  })
  $('.carousel-main .carousel-item').css({
    height: height > carouselHeight ? (height + 80 + 'px') : (carouselHeight + 'px')
  })
  if($('.full-screen')) {
    if($('.full-screen .row').height() > carouselHeight) {
      $('.full-screen').css({
        height: height + 80 + 'px'
      })
    }
    else {
      $('.full-screen').css({
        height: carouselHeight + 'px'
      })
    }
  }
}

/**
 * Запуск слайдера продуктов
 *
 */
function startProductSlider() {
  $('.product').each(function() {
    let values = {
      title: $(this).find('.h5 a').text(),
      image: $(this).find('.product__link_image:first').find('img:first').attr('data-src'),
      price: $(this).find('.product__price:first span').text(),
      link: $(this).find('.product__link_image:first').attr('href'),
      id: $(this).find('.h5 a').attr('data-id')
    }
    let carousel = $(this).find('.owl-carousel')
    carousel = carousel.owlCarousel({
      margin: 10,
      nav: true,
      dots: false,
      lazyLoad: true,
      items: 4
    })
    $(this).find('.product__item').hover(function() {
      values.title = $(this).attr('data-title')
      values.image = $(this).attr('data-image')
      values.price = $(this).attr('data-price')
      values.link = $(this).attr('data-link')
      values.link = $(this).attr('data-id')
      changeProduct($(this).parents('.product'), values)
    })
    $(this).find('.add-to-cart').click(function() {
      $('.modal__title').text(values.title)
      $('.modal__price span').text(values.price)
      $('.modal__image img').attr('src', values.image)
      $('.modal__image img').attr('alt', values.title)
    })
  })
}

function changeProduct(elem, data) {
  elem.find('.h5 a').text(data.title)
  elem.find('.h5 a').attr('href', data.link)
  elem.find('.product__price span').text(data.price)
  elem.find('.product__link_image img').attr('src', data.image)
  elem.find('.product__link_image img').attr('alt', data.title)
  elem.find('.product__link_image').attr('href', data.link)
  elem.find('.product__link_text').attr('href', data.link)
}

//Слайдеры карточки товара
function setCarouselsProduct() {
  const carOne = $('.main-product__carousel')
  const carTwo = $('.sub-product__carousel')
  carOne.owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    onDragged: function(e) {
      console.log(e)
      if (e.relatedTarget._drag.direction == 'left') {
        carTwo.trigger('next.owl.carousel')
      } else {
        carTwo.trigger('prev.owl.carousel')
      }
    }
  })
  carTwo.owlCarousel({
    items: 3,
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
  }).on('click', '.owl-item', function() {
    var i = $(this).index() - (3 + 1);
    carOne.trigger('to.owl.carousel', [i, 400, true]);
    carTwo.trigger('to.owl.carousel', [i, 400, true]);
  });
  carTwo.on('click', '.owl-next', function() {
    carOne.trigger('next.owl.carousel')
  });
  carTwo.on('click', '.owl-prev', function() {
    carOne.trigger('prev.owl.carousel')
  });
}

