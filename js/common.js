// подключение common.js


// header_bg.jpgss
function accordion() {
	$(".accordion .accordion_title").click(function () {
		var content = $(this).next();
		if (content.is(":visible")) { //если нажали на title аккордеона,
			content.slideUp(500, function () { //и если контент аккордеона видимый, то
			}); //убираем его
			$(this).children().removeClass("active"); //убираем активный класс у стрелки к примеру
			$(this).removeClass("active");

		} else {
			$(".accordion .accordion_content").slideUp("slow"); //если невидимый, прячем все скрытые
			$(".accordion .accordion_title").children() //убираем активный класс у стрелки к примеру
				.removeClass("active");
			$(".accordion_title").removeClass("active"); //убираем активный класс у стрелки к примеру
			content.slideToggle("slow"); //открываем скрытый блок у того что нажали
			$(this).children().addClass("active"); //добавляем активный класс у стрекли к примеру
			$(this).addClass("active");
		}
	});
}


function tabs(parent) {
	// табы
	parent.find(".tabs-item").on('click', function (event) { //ссылки которые будут переключать табы
		event.preventDefault();

		parent.find(".tabs-items-wrap .tabs-item").removeClass('active'); //убираем активные состояния у ссылок

		$(this).addClass('active'); //Добавляем активное состояние у той что нажали

		var data = $(this).data('tab'); //создаём переменную с датой
		parent.find('.tabs-wrap').removeClass("active"); //убираем активные состояния у табов
		parent.find('.tabs-wrap[data-tab=' + data + ']').addClass('active'); //если таб соответствует тому, какой data

	});
}

function anchor(parent) {
	parent.find("a[href*='#']").on("click", function (e) {
		e.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 40
		}, 500);
		return false;
	});
}

function mbMenuHandler() {
	$('.mobile-menu-container').toggleClass('active');
	$('.burger-container').toggleClass('active');
	$('.main').toggleClass('active');
	$('body').toggleClass('slidebars');
}


function AjaxFilter() {
	//http://work.melfori.com/Stropy/ajax/goods.json
	var link = "http://work.melfori.com/app/ajax/config.json",
		title = $('#goods-title'),
		srcBig = $('.slider-for'), // добавлять tmp
		srcSmall = $('.slider-nav'), // добавлять tmp
		color = $('#color-goods'),
		cloth = $('#cloth-goods'),
		country = $('#country-goods'),
		size = $('#size-goods'), // добавлять tmp
		priceOld = $('#priceOld'),
		priceNew = $('#priceNew');

	var sizeTmpDrop = function (text) {
		return "<li>" + text + "</li>"
	};

	var slideTmp = function (src) {
		return "<div class='item'> <img src=" + src + "> </div>"
	};


	this.sliderFor = function() {
		return {
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 500,
			fade: true,
			asNavFor: '.slider-nav'
		}
	};

	this.sliderNav = function () {
		return {
			slidesToShow: 3,
			slidesToScroll: 1,
			speed: 500,
			asNavFor: '.slider-for',
			dots: true,
			arrows: false,
			focusOnSelect: true,
			infinite: true
		}
	};

	this.filter = function (btn) {
		var id = btn.attr('data-ajax');

		$('.slider-for').slick('unslick');
		$('.slider-nav').slick('unslick');

		$.getJSON(link, function (data) {
			data.map(el=> {
				if (el.id === id) {
					var limit = 0;
					title.text(el.title);


					srcBig.html('');
					srcSmall.html('');

					el.srcBig.map(el => {
						srcBig.append(slideTmp(el));
					});

					el.srcSmall.map(el => {
						limit++;
						srcSmall.append(slideTmp(el));

					});
					if(limit > 3){
						srcSmall.find('img').css('transform', "translateX(174px)");
					}
					//
					color.text(el.color);
					//
					cloth.text(el.cloth);
					//
					country.text(el.country);
					//
					priceOld.text(el.priceOld + " грн");
					//
					priceNew.text(el.priceNew + " грн");
					//
					limit = 0;
					size.find('.slct').text('');
					size.find('.drop').text('');
					el.size.map(el => {
						limit++;
						if(limit === 1){
							size.find('.slct').text(el);
							$("#select-form").val(el)
						}
						size.find('.drop').append(sizeTmpDrop(el));
					})
				}
			});
		}).complete(() => {
			$('.slider-for').slick(this.sliderFor());
			$('.slider-nav').slick(this.sliderNav());
		})
	};


}
var filterObj = new AjaxFilter();

$(document).ready(function () {

	accordion();
	// checkbox
	var checkTxt = $('.check .txt').width();
	$('.check').each(function () {
		var checkTxt = $(this).find('.txt').width();
		$(this).css('width', checkTxt + 20);
	});


	tabs($('.content-size'));
	tabs($('.goods-section'));
	// для инициализации tooltips
	// $( document ).tooltip({
	//   track: true
	// }); 
	anchor($('.header'));
	anchor($('.header_nav'));
	anchor($('.mobile-menu-container'));

	$('.slider-for').slick(filterObj.sliderFor());
	$('.slider-nav').slick(filterObj.sliderNav());

	$('.burger').click(function () {
		mbMenuHandler();
	});
	$('.mobile-menu-container').click(function () {
		mbMenuHandler();
	});
	//скролл по ссылке с атрибутом href

	$('.delivery-1').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('#delivery-1').toggleClass('active');
		if ($('#delivery-2').hasClass('active')) {
			$('#delivery-2').removeClass('active');
		}
	});
	$('.delivery-2').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('#delivery-2').toggleClass('active');
		if ($('#delivery-1').hasClass('active')) {
			$('#delivery-1').removeClass('active');
		}
	});
	
	$('.goods-section .goods-image').click(function(){
		$(this).siblings('.sold').trigger('click');
	})
	
	// Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
	// $(".scroll_to").on("clcik", function(e) {
	//     e.preventDefault();
	//     var anchor = $(this);
	//     $('html, body').stop().animate({
	//         scrollTop: $("#" + anchor.data('scroll')).offset().top
	//     }, 500);
	//     return false;
	// });

	// Активация слайдера
	$(".owl-carousel").owlCarousel({
		loop: true,
		items: 1,
		dots: true
	});

	// Кастомные кнопки управления слайдером
	var owl = $('.owl-carousel');
	owl.owlCarousel();
	// Go to the next item
	$('.customNextBtn').click(function () {
		owl.trigger('next.owl.carousel', [700]);
	});
	// Go to the previous item
	$('.customPrevBtn').click(function () {
		// With optional speed parameter
		// Parameters has to be in square bracket '[]'
		owl.trigger('prev.owl.carousel', [700]);
	});




	$('.sold').click(function (e) {
		e.preventDefault();

		filterObj.filter($(this));
	})




});


$(window).resize(function () {

});

$(window).scroll(function () {

});

