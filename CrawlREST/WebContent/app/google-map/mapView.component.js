angular.module('appModule')
    .component('mapView', {
    template : `
        <div ng-if="vm.mapOptions" map-lazy-load="https://maps.google.com/maps/api/js"
            map-lazy-load-params="{{vm.googleMapsUrl}}">
            <ng-map center="{{vm.mapOptions.center.lat}},{{vm.mapOptions.center.lng}}" zoom="{{vm.mapOptions.zoom}}">
                <marker ng-repeat="mark in vm.mapOptions.markers" position="[{{mark.lat}},{{mark.lng}}]" title="{{mark.title}}" icon="{{mark.icon}}" animation="{{mark.animation}}" draggable="{{mark.draggable}}"></marker>
            </ng-map>
        </div>
        `,
        controller : function($timeout, $scope, geolocate, $scope) {
        var vm = this;
        vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEw2cCO_zGlAgAWJhO8uMTiqe95wBLlEE"
        vm.mapOptions = null;
                    
        $scope.$on('map', function(ev, msg){
        		console.log(msg);
        		vm.mapOptions = msg;
        });

                },
    controllerAs : 'vm'
    })
            