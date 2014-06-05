
//
// Define error handler logic
//

//
// Enhance the application by adding custom exception handler
// - Catch unhandled errors
//
angular.module('app').provider(
        "$exceptionHandler",
        {
            $get: function(errorLogService) {
                console.log("$exceptionHandler.$get()");
                return(errorLogService);
            }
        }
);

//
// Factory to provider error log service
//
angular.module('app').factory(
        "errorLogService",
        function($log, $window) {
            
            $log.info("errorLogService()");

            function log(exception, cause) {
                $log.debug("errorLogService.log()");
                
                // Default behavior, log to browser console
                $log.error.apply($log, arguments);

                logErrorToServerSide(exception, cause);
            }

            function logErrorToServerSide(exception, cause) {
                $log.info("logErrorToServerSide()... NOT IMPLEMENTED");
            }
            
            // Return the logging function.
            return(log);            
        });
