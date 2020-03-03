import '../styles/styles.scss'

import 'mdbootstrap/js/bootstrap'
import ymaps from 'ymaps'
ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
  .then(maps => {
    const object1 = new maps.GeoObject({
      geometry: {
        type: "Point", // geometry type - point
        coordinates: [44.953576, 34.118536] // координаты точки
      }
    });
    const object2 = new maps.GeoObject({
      geometry: {
        type: "Point", // geometry type - point
        coordinates: [44.584905, 33.508058] // координаты точки
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

$(document).ready(function() {
  console.log('ready');
  replacePhone();
  searchShow();
  clickForMenu();
})
$(window).resize(function(e) {
  getMobileMenu(e)
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
 */
function searchShow() {
  $('.header__search').click(function() {
    $(this).toggleClass('active');
    $('.search').slideToggle();
  })
}
/**
 * Отображение меню
 */
function getMobileMenu() {
  if (window.screen.width >= 992) {
    $('.menu').show();
  } else {
    if ($('.menu').hasClass('show')) {
      $('.menu').show();
    } else {
      $('.menu').hide();
    }
  }
}

function clickForMenu() {
  $('.header__icon_burger').click(function() {
    $('.menu').toggleClass('show');
    $('.menu').slideToggle();
  })
}