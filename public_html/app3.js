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
// - log errors to server side
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
                $log.info("logErrorToServerSide()");

                // Read from configuration
                var serviceUrl = "http://localhost:3000/error";
                
                // Try to send stacktrace event to server
                try {
                    $log.debug("logging error to server side: serviceUrl = " + serviceUrl);

                    // Not sure how portable this actually is
                    var errorMessage = exception ? exception.toString() : "no exception";
                    var stackTrace = exception ? (exception.stack ? exception.stack.toString() : "no stack") : "no exception";
                    var browserInfo = {
                        navigatorAppName : navigator.appName,
                        navigatorUserAgent : navigator.userAgent
                    };

                    // This is the custom error content you send to server side
                    var data = angular.toJson({
                        errorUrl: $window.location.href,
                        errorMessage: errorMessage,
                        stackTrace: stackTrace,
                        cause: (cause || "no cause"),
                        browserInfo: browserInfo
                    });

                    $log.debug("logging error to server side...", data);

                    // Log the JavaScript error to the server.
                    $.ajax({
                        type: "POST",
                        url: serviceUrl,
                        contentType: "application/json",
                        xhrFields: {
                            withCredentials: true
                        },
                        data: data
                    });

                } catch (loggingError) {
                    // For Developers - log the logging-failure.
                    $log.warn("Error logging to server side failed");
                    $log.log(loggingError);
                }
            }
            
            // And return the logging function
            return(log);            
        });
