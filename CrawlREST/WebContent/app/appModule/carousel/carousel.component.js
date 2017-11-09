angular.module('appModule')
.component('carouselComponent', {
	templateUrl: "app/appModule/carousel/carousel.component.html",
	controller : function($scope){
		
		var vm = this;
		
		$scope.myInterval = 5000;
		  $scope.noWrapSlides = false;
		  $scope.active = 0;
		  var slides = $scope.slides = [];
		  var currIndex = 0;
		  
		  

		  $scope.addSlide = function(url) {
		    slides.push({
		      image: url,
		      id: currIndex++
		    });
		  }
		  
		    function loadSlides(){
		    	$scope.addSlide("css/img/wine-crawl.jpg")
		    	$scope.addSlide("css/img/bach-party.jpg")
		    }
		    loadSlides()	
		    

		  $scope.randomize = function() {
		    var indexes = generateIndexesArray();
		    assignNewIndexesToSlides(indexes);
		  };

//		  for (var i = 0; i < 2; i++) {
//		    $scope.addSlide();
//		  }

		  // Randomize logic below

		  function assignNewIndexesToSlides(indexes) {
		    for (var i = 0, l = slides.length; i < l; i++) {
		      slides[i].id = indexes.pop();
		    }
		  }

		  function generateIndexesArray() {
		    var indexes = [];
		    for (var i = 0; i < currIndex; ++i) {
		      indexes[i] = i;
		    }
		    return shuffle(indexes);
		  }

		  // http://stackoverflow.com/questions/962802#962890
		  function shuffle(array) {
		    var tmp, current, top = array.length;

		    if (top) {
		      while (--top) {
		        current = Math.floor(Math.random() * (top + 1));
		        tmp = array[current];
		        array[current] = array[top];
		        array[top] = tmp;
		      }
		    }

		    return array;
		  }

		
	},
	controllerAs : "vm"
});