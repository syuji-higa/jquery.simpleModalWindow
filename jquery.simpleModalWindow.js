(function($){

	$.fn.simpleModalWindow = function(option){

		// option
		var o = $.extend({
			modalName:       'modal-win',
			modalInnerName:  'modal-win-inner',
			modalBgName:     'modal-bg',
			modalChangeName: 'modal-move',
			modalCloseName:  'modal-close',
			spd: 500,
			bgAlpha: .75
		}, option);

		var $win  = $(window),
		    $body = $('body'),
		    $bg   = $('<div id="' + o.modalBgName + '"></div>');

		/* ==============================
			first ran
		============================== */
		$bg.css('opacity', '0');

		/* ==============================
			events
		============================== */

		//modal window open WHEN click THE modal link
		$(this).on('click', function(){
			var posY      = $win.scrollTop(),
			    winHeight = $win.height(),
			    link           = $(this).attr('href'),
			    hasPrefixSharp = link.match(/^#.+/),
			    $modal      = $('<div id="' + o.modalName + '"><div id="' + o.modalInnerName + '"></div></div>'),
			    $modalInner = $modal.find('#' + o.modalInnerName);
			$modalInner.css('opacity', '0');
			$body.append($modal);
			$modal.prepend($bg);
			if(!hasPrefixSharp){
				$modalInner.append('<img src="' + link + '" alt="" />');
				var img = $modal.find('img');
				img.on('load', function(){
					view(img);
				});
			}
			else {
				var $cnt = $(link);
				$modalInner.append($cnt);
				$cnt.css({display: 'block', zIndex: '101'});
				view($cnt);
			}
			function view(a_elm){
				var w = a_elm.outerWidth(),
				    h = a_elm.outerHeight(),
				    mt = (winHeight - h) / 2 + posY;
				$bg.animate({opacity: o.bgAlpha}, o.spd);
				$modal.css('top', mt + 'px');
				$modalInner.css({width: w, height: h}).animate({opacity: '1'}, o.spd);
			}
			return false;
		});

		//modal window contents change WHEN click THE modal change link
		$(document).on('click', '.' + o.modalChangeName, function(){
			var posY      = $win.scrollTop(),
			    winHeight = $win.height(),
			    link           = $(this).attr('href'),
			    hasPrefixSharp = link.match(/^#.+/),
			    $modal      = $('#' + o.modalName),
			    $modalInner = $modal.find('#' + o.modalInnerName);
			if(hasPrefixSharp){
				$modalInner.animate({opacity: '0'}, o.spd, function(){
					var $cntNow = $(this).children();
					$body.append($cntNow);
					$cntNow.hide();
					var $cnt = $(link);
					$modalInner.append($cnt);
					$cnt.css({display: 'block', zIndex: '101'});
					var w = $cnt.outerWidth(),
					    h = $cnt.outerHeight(),
					    mt = (winHeight - h) / 2 + posY;
					$bg.animate({opacity: o.bgAlpha}, o.spd);
					$modal.css('top', mt + 'px');
					$modalInner.css({width: w, height: h}).animate({opacity: '1'}, o.spd);
				});
			}
			return false;
		});

		//modal window close WHEN click THE modal bg & modal Click link
		$(document).on('click', '#' + o.modalBgName + ', .' + o.modalCloseName, function(){
			var $modal      = $('#' + o.modalName),
			    $modalInner = $modal.find('#' + o.modalInnerName),
			    $cnt        = $modalInner.children();
			$modalInner.animate({opacity: '0'}, o.spd, function(){
				if($cnt.attr('id')){
					$body.append($cnt);
					$cnt.hide();
				}
				$modal.remove();
			});
			$bg.animate({opacity: '0'}, o.spd);
			return false;
		});

	}

})(jQuery);