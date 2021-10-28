$(window).resize(function(event) {
	adaptive_function();
});
function adaptive_header(w, h) {
		var headerMenu=$('.header-menu');
		var headerLang=$('.header-top-lang');
	if (w<767) {
		if(!headerLang.hasClass('done')) {
			headerLang.addClass('done').appendTo(headerMenu);
		}
	} else {
		if (headerLang.hasClass('done')) {
			headerLang.removeClass('done').prependTo($('.header-top'));
		}
	}
	if (w<767) {
		if(!$('.header-bottom-menu').hasClass('done')) {
			$('.header-bottom-menu').addClass('done').appendTo(headerMenu);
		}
	} else {
		$.each($('.header-bottom-menu'), function (index, val) {
			if($(this).hasClass('header-bottom-menu--right')){
				if($(this).hasClass('done')) {
					$(this).removeClass('done').prependTo($('.header-bottom__column').eq(2));
				}
			}else{
				if($(this).hasClass('done')){
					$(this).removeClass('done').prependTo($('.header-bottom__column').eq(0));
				}
			}
		});
	}
}

function adaptive_function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
	adaptive_header(w, h);
}
adaptive_function();

$('.header-menu__icon').click(function(event) {
	$(this).toggleClass('active');
	$('.header-menu').toggleClass('active');
	if($(this).hasClass('active')){
		$('body').data('scroll', $(window).scrollTop());
	}
		$('body').toggleClass('lock');
	if(!$(this).hasClass('active')){
		$('body, html').scrollTop(parseInt($('body').data('scroll')));
	}
});

function ibg(){
	let ibg=document.querySelectorAll(".ibg");for (var i = 0; i < ibg.length; i++) {if(ibg[i].querySelector('img')){ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';}}
}
ibg();

function map(n) {
	google.maps.Map.prototype.setCenterWithOffset=function(latlng, offsetX, offsetY) {
		var map = this;
		// var ov = new.google.maps.OverlayView();
		ov.onAdd = function() {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x+offsetX;
			aPoint.y = aPoint.y+offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function() {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		// pixelOffset: new google.maps.Size(-230, 250)
	});
	var locations = [
		[new google.maps.LatLng(11.5391494, 165.27162612)]
	]
	var options = {
		zoom: 10,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: '/img/Block4/map.png',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			position: locations[i][0],
			map: map,
		});
		markers.push(marker);
	}
}
if($("#map").length > 0) {
	map();
}