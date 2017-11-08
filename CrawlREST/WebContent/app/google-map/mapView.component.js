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
                controller : function($timeout, geolocator, $scope) {
                    var vm = this;
                    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_GOES_HERE"
                    vm.mapOptions = null;
                    
                    geolocator.geolocate()
                        .then(function(position){
                            vm.mapOptions = {
                                      center: position,
                                      markers : [position],
                                      zoom: 8
                                }
                            $scope.$apply();
                        })
                    
                },
                controllerAs : 'vm'
            })
            