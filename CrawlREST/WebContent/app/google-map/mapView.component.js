angular.module('appModule')
            .component('mapView', {
                template : `
                    <div ng-if="vm.mapOptions" map-lazy-load="https://maps.google.com/maps/api/js"
                          map-lazy-load-params="{{vm.googleMapsUrl}}">
                          <ng-map center="{{vm.mapOptions.center.lat()}},{{vm.mapOptions.center.lng()}}" zoom="{{vm.mapOptions.zoom}}">
                              <marker ng-repeat="mark in vm.mapOptions.markers" position="[{{mark.lat()}},{{mark.lng()}}]" title="{{mark.title}}" icon="{{mark.icon}}" animation="{{mark.animation}}" draggable="{{mark.draggable}}"></marker>
                          </ng-map>
                    </div>
                `,
                controller : function($timeout, $scope, geolocate) {
                    var vm = this;
                    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEw2cCO_zGlAgAWJhO8uMTiqe95wBLlEE"
                    vm.mapOptions = null;
                    
                    geolocate.geocodeAddress('2095 legacy ridge view colorado springs co 80910')
                    .then(function(res){
                        vm.mapOptions = {
                                  center: res.cord,
                                  markers : [res.cord],
                                  zoom: 14
                            }
                        $scope.$apply();
                    })
                },
                controllerAs : 'vm'
            })
            