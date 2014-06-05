//
// Define application
//
angular.module('app', ['ngResource']);

//
// Define test controller and functions that throw some exceptions
//
angular.module('app')
        .controller("MainController", function($scope, $log) {
            $log.debug("MainController()...");

            // A very complicated UI model
            $scope.model = {
                counter: 1,
            };

            $scope.increaseCounter = function() {
                $log.debug("increaseCounter()");
                
                if ($scope.model.counter > 10) {
                    throw new Error("Too many apples!");
                }                

                $scope.model.counter++;
            };

            $scope.createError1 = function() {
                $log.debug("createError1()");
                throw new Error("Error 1");
            };

            $scope.createError2 = function() {
                $log.debug("createError2()");
                var a = {};
                return a.nonexisting.data;
            };

            $scope.createError3 = function(a, b) {
                $log.debug("createError3()", a, b);

                // Note - "<" allows for divide by zero
                if (b < 0) {
                    $scope.createError1();
                }
                
                return (a / b ) + $scope.createError3(a, b - 1);
            };

            $log.debug("MainController()... done.");
        });

