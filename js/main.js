customizeOptions = {
	//Slide Transition Time
	transitionDuration: 400,
	//Touch Scrolling
	touchModel: true,
	//Touch options
	threshold: 10, //Required min distance traveled to be considered swipe
	allowedTime: 500 //Maximum time allowed to travel that distance
}

testSlider = function(el, nextB, prevE) {
	//Declaration of width and height with container width and height
	var slideContainer = document.getElementById(el).children[0],
		navigationContainer = document.getElementById(el).children[1],
		slide = document.getElementsByClassName('slide'),
		item = document.getElementsByClassName('navigation-item'),
		mask = document.getElementById('mask'),
		count = document.querySelectorAll(".count"),
		pos = 0, 
		x, 
		y, 
		array, 
		arraySet = [],
		numArray = (slide.length - 1),
		lastScrolled = 0,
		startX, 
		startY, 
		dist, 
		elapsedTime, 
		startTime;

	customize = {
		movefirstLast: function() {
			//Move the last item before first item, just in case user click prev button
			slideContainer.insertBefore(slideContainer.children[numArray], slideContainer.children[0]);
			navigationContainer.insertBefore(navigationContainer.children[numArray], navigationContainer.children[0]);
		},
		movelastFirst: function() {
			//Move the last item before first item, just in case user click prev button
			slideContainer.insertBefore(slideContainer.children[0], slideContainer.children[numArray].nextSibling);
			navigationContainer.insertBefore(navigationContainer.children[0], navigationContainer.children[numArray].nextSibling);
		},
		resetDimen: function() {
			ww = document.getElementById(el).offsetWidth;
			wh = document.getElementById(el).offsetHeight;
		},
		sliding: function() {
			customize.resetDimen();
			activeSlidePosition = "translate3d("+ww+"px, 0, 0)";
			prevSlidePosition = "translate3d(-"+ww/2+"px, 0, 0)";
			nextSlidePosition = "translate3d("+ww/2+"px, 0, 0)";
			next2SlidePosition = "translate3d("+(ww/2)*2+"px, 0, 0)";
		},
		setupFrame: function() {
			customize.resetDimen();
			slideContainer.style.width = ww+"px";
			slideContainer.style.height = wh+"px";
			navigationContainer.style.width = ww+"px";
			for(var i=0; i<slide.length; i++) {
				slide[i].style.transitionDuration = "0s";
				slide[i].style.width  = ww+"px";
				slide[i].style.height = wh+"px";
			}
			for(var i=0; i<item.length; i++) {
				item[i].style.transitionDuration = "0s";
				item[i].style.width  = ww+"px";
			}
		},
		arrangeSlides: function() {
			for(var i=0; i<slide.length; i++){
				slide[i].style.zIndex = "-1";
				slide[i].style.transform = "translate3d(0, 0, 0)";
			}
			for(var i=0; i<item.length; i++){
				item[i].style.zIndex = "-1";
				item[i].style.transform = "translate3d(0, 0, 0)";
			}
    	},
		init: function() {
			customize.sliding();
			slide[1].style.zIndex = "1";
			item[1].style.zIndex = "1";
			setTimeout(function(){
				mask.classList.add('active');
			}, 500);
			setTimeout(function(){
				slide[1].classList.add('active');
				if (document.querySelector(".slide1").classList.contains("active")) {
					setTimeout(function(){
						customize.countUp('#count7', 0, 20, 15);
						mask.classList.remove('active');
						mask.style.display = "none";
					}, 600);
					setTimeout(function(){
						customize.countUp('#count8', 0, 54, 20);
					}, 900);
				}
			}, 1000);
			slide[2].style.visibility = "visible";
			slide[2].style.zIndex = "2";
			slide[0].style.transform = prevSlidePosition;
			slide[2].style.transform = activeSlidePosition;

			item[2].style.visibility = "visible";
			item[2].style.zIndex = "2";
			item[0].style.transform = prevSlidePosition;
			item[2].style.transform = nextSlidePosition;
			item[3].style.transform = next2SlidePosition;
		},
		nextSlide: function() {
			customize.sliding();
			slide[2].style.zIndex = "2";
			slide[2].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			slide[2].style.transform = "translate3d(0, 0, 0)";
			item[2].style.zIndex = "2";
			item[2].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			item[2].style.transform = "translate3d(0, 0, 0)";

			setTimeout(function(){
				slide[1].classList.add('active');
				customize.countDecide();
			}, customizeOptions.transitionDuration);
			setTimeout(function(){
				item[1].classList.add('active');
				item[0].classList.add('active-prev');
				item[2].classList.add('active-next');
			}, 200);
			slide[1].style.zIndex = "1";
			slide[1].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			slide[1].style.transform = prevSlidePosition;
			item[1].style.zIndex = "1";
			item[1].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			item[1].style.transform = prevSlidePosition;
			item[3].style.zIndex = "1";
			item[3].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			item[3].style.transform = nextSlidePosition;

			setTimeout(function(){
				slide[0].classList.remove('active');
			}, 600);

			setTimeout(function(){
				item[0].classList.remove('active');
				item[1].classList.remove('active');
				item[2].classList.remove('active');
				item[3].classList.remove('active');
				item[1].classList.remove('active-prev');
				item[2].classList.remove('active-prev');
				item[3].classList.remove('active-prev');
				item[0].classList.remove('active-prev');
				item[0].classList.remove('active-next');
				item[1].classList.remove('active-next');
				item[2].classList.remove('active-next');
				item[3].classList.remove('active-next');
			}, 100);

			slide[3].style.zIndex = "0";
			slide[3].style.transitionDuration = "0s";
			slide[3].style.transform = activeSlidePosition;
			item[0].style.zIndex = "0";
			item[0].style.transitionDuration = "0s";
			item[0].style.transform = next2SlidePosition;

			customize.movelastFirst();

			slide[numArray].style.zIndex = "0";
			slide[numArray].style.transitionDuration = "0s";
			slide[numArray].style.transform = "translate3d(0, 0, 0)";

		},
		prevSlide: function() {
			customize.sliding();

			slide[1].style.zIndex = "2";
			slide[1].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			slide[1].style.transform = activeSlidePosition;
			item[1].style.zIndex = "2";
			item[1].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			item[1].style.transform = activeSlidePosition;

			setTimeout(function(){
				slide[2].classList.remove('active');
			}, 600);
			setTimeout(function(){
				item[0].classList.remove('active');
				item[1].classList.remove('active');
				item[2].classList.remove('active');
				item[3].classList.remove('active');
				item[1].classList.remove('active-prev');
				item[2].classList.remove('active-prev');
				item[3].classList.remove('active-prev');
				item[0].classList.remove('active-prev');
				item[0].classList.remove('active-next');
				item[1].classList.remove('active-next');
				item[2].classList.remove('active-next');
				item[3].classList.remove('active-next');
			}, 100);

			slide[numArray].style.zIndex = "0";
			slide[numArray].style.transitionDuration = "0s";
			slide[numArray].style.transform = prevSlidePosition;
			item[numArray].style.zIndex = "0";
			item[numArray].style.transitionDuration = "0s";
			item[numArray].style.transform = prevSlidePosition;

			slide[0].style.zIndex = "1";
			slide[0].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			slide[0].style.transform = "translate3d(0, 0, 0)";
			item[0].style.zIndex = "1";
			item[0].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			item[0].style.transform = "translate3d(0, 0, 0)";

			setTimeout(function(){
				slide[1].classList.add('active');
				item[1].classList.add('active');
				item[0].classList.add('active-prev');
				item[2].classList.add('active-next');
				customize.countDecide();
			}, customizeOptions.transitionDuration);

			customize.movefirstLast();

			item[2].style.zIndex = "1";
			item[2].style.transitionDuration = customizeOptions.transitionDuration+"ms";
			item[2].style.transform = nextSlidePosition;

			slide[3].style.zIndex = "0";
			slide[3].style.transitionDuration = "0s";
			slide[3].style.transform = "translate3d(0, 0, 0)";
			item[3].style.zIndex = "0";
			item[3].style.transitionDuration = "0s";
			item[3].style.transform = next2SlidePosition;
		},
		nextPause: function() {
				var timeNow = (new Date()).getTime();
				if (timeNow > (lastScrolled + customizeOptions.transitionDuration)) { customize.nextSlide(); } else { return; }
				lastScrolled = timeNow;
		},
		prevPause: function() {
				var timeNow = (new Date()).getTime();
				if (timeNow > (lastScrolled + customizeOptions.transitionDuration)) { customize.prevSlide(); } else { return; }
				lastScrolled = timeNow;
		},
		countUp: function(selector, min, max, duration) { //Number animate input el start end time
			var inter = setInterval(function() {
			  document.querySelector(selector).innerHTML = ++min;
			  if(min >= max) {
			    clearInterval(inter);
			  }
			}, duration);
			
			for (x = 0; x < count.length; x++) {
				var countClick = count[x];
			}	
		},
		countDecide: function() {
			if (document.querySelector(".slide2").classList.contains("active")) {
				setTimeout(function(){
					customize.countUp('#count1', 0, 60, 15);
				}, 600);
				setTimeout(function(){
					customize.countUp('#count2', 0, 15, 20);
				}, 900);
			}
			if (document.querySelector(".slide3").classList.contains("active")) {
				setTimeout(function(){
					customize.countUp('#count3', 0, 60, 15);
				}, 600);
				setTimeout(function(){
					customize.countUp('#count4', 0, 15, 20);
				}, 900);
			}
			if (document.querySelector(".slide4").classList.contains("active")) {
				setTimeout(function(){
					customize.countUp('#count5', 0, 23, 15);
				}, 600);
				setTimeout(function(){
					customize.countUp('#count6', 0, 15, 20);
				}, 900);
			}
			if (document.querySelector(".slide1").classList.contains("active")) {
				setTimeout(function(){
					customize.countUp('#count7', 0, 20, 15);
				}, 600);
				setTimeout(function(){
					customize.countUp('#count8', 0, 54, 20);
				}, 900);
			}
		}

	};

    defaults = {
		slideNext: function() {
			document.getElementById(nextB).addEventListener("touchstart", function (e){
				e.preventDefault();
				customize.nextPause();
			}, false);
        },

		slidePrev: function() {
			document.getElementById(prevE).addEventListener("touchstart", function (e){
				e.preventDefault();
				customize.prevPause();
			}, false);
		},

		reset: function() {
			window.addEventListener("resize", function (){
				customize.setupFrame();
				customize.arrangeSlides();
				customize.init();
			}, false);
		},

		touchAction: function() {
			slideContainer.addEventListener('touchstart', function(e){
			    e.preventDefault();
			    var touchObj = e.changedTouches[0];
			    dist = 0;
			    startX = touchObj.pageX;
			    startY = touchObj.pageY;
			    startTime = new Date().getTime(); // record time when finger first makes contact with surface
			}, false);
		    slideContainer.addEventListener('touchmove', function(e){
		        e.preventDefault(); // prevent scrolling when inside DIV
		    }, false);
		    slideContainer.addEventListener('touchend', function(e){
		        e.preventDefault();
		        var touchObj = e.changedTouches[0];
		        dist = touchObj.pageX - startX; // get total dist traveled by finger while in contact with surface
		        elapsedTime = new Date().getTime() - startTime; // get time elapsed
		        if (elapsedTime <= customizeOptions.allowedTime && dist >= customizeOptions.threshold && (touchObj.pageY - startY) >= 1) {
		          customize.prevPause();
		        }
		        if (elapsedTime <= customizeOptions.allowedTime && dist <= (-customizeOptions.threshold) && (touchObj.pageY - startY) <= 100) {
		          customize.nextPause();
		        }
		    }, false);
		},
  };

	customize.setupFrame();
	customize.arrangeSlides();
	customize.movefirstLast();
	customize.init();
	defaults.slideNext();
	defaults.slidePrev();
	defaults.reset();
	if(customizeOptions.touchModel == true){
		defaults.touchAction();
	}
};

testSlider("slider", "next", "prev");

window.addEventListener("orientationchange",onOrientationchange ,false);
function onOrientationchange() {
   if (window.orientation === 180 || window.orientation === 0) {
   		window.location.reload();
   }
   if (window.orientation === 90 || window.orientation === -90 ){
        document.getElementById("mask").style.display = "block";
        document.getElementsByClassName("icon").style.display = "block";
   } 
}