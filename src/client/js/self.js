$(window).scroll(function(){
	var wScroll = $(this).scrollTop();
	$('#header').addClass('header');
	if (wScroll < 10) {
		$('#header').removeClass('header');
	}
	if (wScroll > $('#about').offset().top - ($(window).height() / 1.2) /*here we can also use number but this for for windows height*/) {
			$(function(){

	        $("#typed").typed({
	            // strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
	            stringsElement: $('.typed-strings'),
	            typeSpeed: -30,
	            backDelay: 50,
	            loop: false,
	            contentType: 'html', // or text
	            // defaults to false for infinite loop
	            loopCount: false,
	            callback: function(){ foo(); },
	            resetCallback: function() { newTyped(); }
	        });

	        $(".reset").click(function(){
	            $("#typed").typed('reset');
	        });

	    });
			$(function(){

	        $("#typed2").typed({
	            // strings: ["Typed.js is a <strong>jQuery</strong> plugin.", "It <em>types</em> out sentences.", "And then deletes them.", "Try it out!"],
	            stringsElement: $('.typed-strings2'),
	            typeSpeed: 30,
	            backDelay: 500,
	            loop: false,
	            contentType: 'html', // or text
	            // defaults to false for infinite loop
	            loopCount: false,
	            callback: function(){ foo(); },
	            resetCallback: function() { newTyped(); }
	        });

	        $(".reset").click(function(){
	            $("#typed2").typed('reset');
	        });

	    });
	    	function newTyped(){ /* A new typed object */ }

			function foo(){ console.log("Callback"); }
		}
		
});

/*typed js*/
