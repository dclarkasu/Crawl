  angular.module('appModule')
            .component('mapView', {
                template : `
                    <div map-lazy-load="https://maps.google.com/maps/api/js"
                          map-lazy-load-params="{{vm.googleMapsUrl}}">
                          <ng-map center="{{vm.mapOptions.center.lat}},{{vm.mapOptions.center.lng}}" zoom="{{vm.mapOptions.zoom}}"></ng-map>
                    </div>
                `,
                controller : function() {
                    var vm = this;
                    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEw2cCO_zGlAgAWJhO8uMTiqe95wBLlEE"
                    
                    vm.mapOptions = {
                      center: {lat: -34.397, lng: 150.644},
                      zoom: 8
                    }
                    
                },
                controllerAs : 'vm'
            })    