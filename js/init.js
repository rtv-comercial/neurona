

(function($) {
    "use strict";
   // Sticky menu
    $(window).scroll(function () {
        var mainmenu = jQuery("#header_main.sticky", "#header");
        if (parseInt(mainmenu.attr("rel"),10) <= Math.abs(parseInt(jQuery(window).scrollTop()),10)) {
            mainmenu.addClass("fixed");
        } else {
            mainmenu.removeClass("fixed");
        }
    });
    
    // Center caption in wide slider
    $(window).resize(function () {
        centerTopLeft();
        centerLeft();
    });
    $(window).load(function () {
        centerTopLeft();
        centerLeft();
    });
    function centerTopLeft()
    {
        var container = $(".wide_slider", "#wrapper");
        var content = $(".wide_slider .slider_caption", "#wrapper");
        content.css({
          "left": ((container.width() - content.width()) / 2),
          "top": ((container.height() - content.height()) / 2)
        });
    }
    function centerLeft()
    {
        var container = $(".wide_slider", "#wrapper");
        var content = $("#wide_slider_pager", "#wrapper");
        content.css({
          "left": ((container.width() - content.width()) / 2),
          "bottom": "0"
        });
    }
    
    $(document).ready(function(){
		
		$(".btn-category").click(function(e){
			e.preventDefault();
			var checkedAmount = $(this).parent().find(".fa-check").length;
			if($(this).children("i").hasClass("fa-check")){
				if(checkedAmount > 1){
					$(this).next("input").prop("disabled", true);
					$(this).children("i").removeClass("fa-check").addClass("fa-times");
					$(this).removeClass("btn_darkblue").addClass("btn_grey");
				}
			}
			else{
				$(this).next("input").prop("disabled", true);
				$(this).children("i").removeClass("fa-times").addClass("fa-check");
				$(this).removeClass("btn_grey").addClass("btn_darkblue");
			}
			$("#search_advanced").focus();
		});
		
		$("#search_form, #search_advanced_form").submit(function(e){
			e.preventDefault();
			var getCategories = new Array();
			if($(this).attr("id") == "search_form"){
				var getCriteria = $("#search_criteria").val();
			}
			else{
				var getCriteria = $("#search_advanced").val();
				$(this).find(".fa-check").each(function(index){
					getCategories[index] = $(this).parent().next().val();
				});
			}
			if(getCriteria.length > 3){
				$.post(serverHost+"engine/ajax/_search.php", {criteria:getCriteria, categories:getCategories}, function(returnValue){
					if(returnValue == "" || returnValue.length == 0){
						$(".tb_widget_search").children(".alert_message").fadeIn(300);	
					}
					else{
						location.href = returnValue;
					}
				});
			}
			else{
				$(".tb_widget_search").children(".alert_message").fadeIn(300);	
			}
		});
		
		$("#search_criteria").bind("focus keypress", function(e){
			$(".tb_widget_search").children(".alert_message").fadeOut(300);	
		});
		
		$("[id^='contestant_set_points'").each(function(index){
			var getID = $(this).attr("id").split("_").pop();
			var setNumber = $("#contestant_get_points_"+getID).html();
			switch(setNumber.length){
				case 4:
					setNumber = setNumber.substr(0, 1)+","+setNumber.substr(1, 3);
					break;
				case 5:
					setNumber = setNumber.substr(0, 2)+","+setNumber.substr(2, 3);
					break;
				case 6:
					setNumber = setNumber.substr(0, 3)+","+setNumber.substr(3, 3);
					break;
			}
			$("#contestant_set_points_"+getID).html(setNumber+" puntos");
        });
		
        $(".sidebar_area").theiaStickySidebar({
            additionalMarginTop: 140
        });
        $(".sidebar_book").theiaStickySidebar({
            additionalMarginTop: 130
        });
		
		$("#start_test").click(function(){
			$(".test_timer").startTimer({
				onComplete: function(element){
					if(testTimeOver == 0){
						testTimeOver = 1;
						alert("TIME OVER!!!");
					}
				}
			})
			$(".test_item").click(function(){
				if($(".test_item:checked").length == testQuestionsTotal){
					$(".submit-test").show();
				}
			});
			$(".button_try_again").click(function(){
				location.reload();
			});
			$("#post_record").click(function(e){
				e.preventDefault();
				$("#form_error").html("").hide();
				var processError = "";
				var userProvince = $("#user_province").val();
				if(userProvince != 0){
					var userFullname = $("#user_fullname").val();
					if(userFullname != ""){
						if(userFullname.lenght > 10){
							var userEMail = $("#user_email").val();
							var getParts = userEMail.split("@");
							if(getParts.length == 2){
								//Chequear lo demas y ver si esta todo OK
								/*
								$.post(serverHost+"engine/ajax/_test.php", {test_type:testType, form_data:$("#test_form").serializeArray()}, function(returnValue){
									location.href = '/evaluate.html';
								});
								*/
							}
							else{
								processError = "Correo electrónico no válido"	
							}
						}
						else{
							processError = "Debe escribir su nombre y apellidos"	
						}
					}
					else{
						processError = "Debe escribir su nombre y apellidos"	
					}
				}
				else{
					processError = "Debe seleccionar la provincia"	
				}
				if(processError != ""){
					$("#form_error").html(processError).show();
				}
			});
		})


        // Sticky menu
        $("#header_main.sticky", "#header").wrap("<div class='header_main-parent'></div>").attr("rel", $("#header_main.sticky", "#header").offset().top).parent().height($("#header_main.sticky", "#header").height());

        // Responsive top navigation
        $(".top_navigation_toggle", "#header").on( "click", function() {
            $(".top_navigation .menu", "#header").toggle();
            $(this).toggleClass("active");
            return false;
        });
        $(".top_sub_menu_toggle", "#header").on( "click", function() {
            $(this).next(".sub-menu").toggle();
            return false;
        });

        // Responsive site navigation
        $(".site_navigation_toggle", "#header").on( "click", function() {
            $(".site_navigation .menu", "#header").toggle();
            $(this).toggleClass("active");
            return false;
        });
        $(".site_sub_menu_toggle", "#header").on( "click", function() {
            $(this).next(".sub-menu").toggle();
            $(this).next(".dt_mega_menu").toggle();        
            $(this).next(".cart_content").toggle();   
            return false;     
        });

        // Accordions
        $(".accordion_content", "#wrapper").accordion({
            collapsible: true,
            heightStyle: "content",
            icons: false,
            active: false,
            animate: false
        });

        // Review animated
        $('.review_footer span', "#wrapper").viewportChecker({
            classToAdd: 'visible animated',
            classToRemove: 'hidden', 
            offset: 0
        });

        // Images animated
        $("img:not(.content_slider img, .post .entry_media img)").viewportChecker({
            classToAdd: 'visible animated',
            classToRemove: 'hidden', 
            offset: 0
        });

        // Content slider
        $(".content_slider ul", "#wrapper").bxSlider({
            adaptiveHeight: true,
            mode: "horizontal",
            auto: true,
            controls: true,
            pager: false,
            captions: false,
            prevText: "&#xf053;",
            nextText: "&#xf054;"
        });

        // Wide slider
        $(".wide_slider ul", "#wrapper").bxSlider({
            adaptiveHeight: true,
            mode: "fade",
            auto: true,
            controls: true,
            captions: false,
            prevText: "&#xf053;",
            nextText: "&#xf054;",
            pagerCustom: "#wide_slider_pager"
        });

        // Popup images
        $(".popup_link", "#wrapper").magnificPopup({
            type: "image",
            mainClass: "mfp-with-zoom",
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is("img") ? openerElement : openerElement.find("img");
                }
            }
        });

        // Tabs
        $(".tab_content", "#wrapper").tabs();

        // Fitvids
        $(".container", "#wrapper").fitVids();

        /* Shop single add to cart spinner */
        $("#spinner", "#wrapper").spinner({
            min: 0
        });

    });

})(jQuery);



jQuery( window ).resize(function() {
    if(jQuery( window ).width() >= 993) {
        jQuery("nav.site_navigation ul.menu").css("display", "block");
        jQuery(".site_navigation_toggle").removeClass('active');
    } else {
        jQuery("nav.site_navigation ul.menu").attr("style", "");
    }
    if(jQuery( window ).width() >= 993) {
        jQuery("nav.top_navigation ul.menu").css("display", "block");
        jQuery(".site_navigation_toggle").removeClass('active');
    } else {
        jQuery("nav.top_navigation ul.menu").attr("style", "");
    }

});