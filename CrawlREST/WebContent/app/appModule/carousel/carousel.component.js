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

		  $scope.addSlide = function() {
		    var newWidth = 600 + slides.length + 1;
		    slides.push({
		      image: 'https://images.unsplash.com/photo-1421622548261-c45bfe178854?auto=format&fit=crop&w=600&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
		      text: 'Bar Crawl',
		      id: currIndex++
		    });
		    slides.push({
		    	image: 'https://images.unsplash.com/photo-1498429152472-9a433d9ddf3b?auto=format&fit=crop&w=600&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
		    	text: 'Wine Crawl',
		    	id: currIndex++
		    });
		  };

		  $scope.randomize = function() {
		    var indexes = generateIndexesArray();
		    assignNewIndexesToSlides(indexes);
		  };

		  for (var i = 0; i < 1; i++) {
		    $scope.addSlide();
		  }

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