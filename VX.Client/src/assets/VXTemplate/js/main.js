(function ($) {
	"use strict";

	$(document).ready(function ($) {

		//active class
		$(".carousel-inner .item:first-child").addClass("active");


		//Fixed nav on scroll
		$(document).on('scroll', function (e) {
			var scrollTop = $(document).scrollTop();
			if (scrollTop > $('nav').height()) {
				$('nav').addClass('navbar-scroll');
			}
			else {
				$('nav').removeClass('navbar-scroll');
			}
		});

		//Numaric Counter
		$('.counter').counterUp({
			delay: 10,
			time: 1000
		});

		//Portfolio Popup
		$('.magnific-popup').magnificPopup({ type: 'image' });

		//Video popup
		$('.popup-youtube').magnificPopup({
			type: 'iframe'
		})

		//Smooth Scroll
		smoothScroll.init();

		//active on scroll
		$('body').scrollspy({
			target: '.navbar',
			offset: 80
		})

		//Progress bar
		$('.progress .progress-bar').progressbar();

		//WOW
		new WOW().init();

	});


	$(window).on('load', function () {

		//Preloader
		$('.preloader').delay(500).fadeOut('slow');
		$('body').delay(500).css({ 'overflow': 'visible' });
		$('.carousel').carousel({
			interval: 3000
		})
		//Portfolio container			
		var $container = $('.portfolioContainer');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});

		$('.portfolioFilter a').on('click', function () {
			$('.portfolioFilter a').removeClass('current');
			$(this).addClass('current');

			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
			return false;
		});


		// menu
		// $('#nav > div.item').hover(
		// 	function () {
		// 		var $this = $(this);
		// 		$this.find('img').stop().animate({
		// 			'width': '90px',
		// 			'height': '90px',
		// 			'top': '-13px',
		// 			'left': '-5px',
		// 			'opacity': '1.0'
		// 		}, 500, 'easeOutBack', function () {
		// 			$(this).parent().find('ul').fadeIn(700);
		// 		});

		// 		$this.find('a:first,h2').addClass('active');
		// 	},
		// 	function () {
		// 		var $this = $(this);
		// 		$this.find('ul').fadeOut(500);
		// 		$this.find('img').stop().animate({
		// 			'width': '60px',
		// 			'height': '60px',
		// 			'top': '0px',
		// 			'left': '0px',
		// 			'opacity': '0.1'
		// 		}, 2000, 'easeOutBack');
		// 		$this.find('a:first,h2').removeClass('active');
		// 	}
		// );

	});


}(jQuery));	