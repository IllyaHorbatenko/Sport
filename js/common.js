
// подключение common.js

// header_bg.jpg
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
	parent.find("a[href*='#']").on("click", function(e) {
		e.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 88
		}, 500);
		return false;
	});
}

$(document).ready( function() {
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
	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,

		fade: true,
		asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 500,
		asNavFor: '.slider-for',
		dots: true,
		arrows: false,
		//infinite: true,
		// centerMode: true,
		focusOnSelect: true,

	});

    //скролл по ссылке с атрибутом href


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
    $('.customNextBtn').click(function() {
        owl.trigger('next.owl.carousel', [700]);
    });
    // Go to the previous item
    $('.customPrevBtn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [700]);
    });

});


$(window).resize(function() {

});

$(window).scroll(function() {
    
});

