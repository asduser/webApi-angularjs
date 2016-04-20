(function(){

    'use strict';

    angular
        .module("_webApi_")
        .constant("webApi.statusCodes", {

            // A special statuses.
            "-1": "XMLHttpRequest cannot load: No 'Access-Control-Allow-Origin' header is present on the requested resource. The response had HTTP status code 404.",
            "0": "Connection Refused [0]: Connection was refused due to following reasons: 1) Your connection responding slowly. 2) Maybe the server is not available.",

            // This class of status code indicates a provisional response, consisting only of the Status-Line and optional headers, and is terminated by an empty line.
            // Since HTTP/1.0 did not define any 1xx status codes, servers must not send a 1xx response to an HTTP/1.0 client except under experimental conditions.
            "100": "Continue [100]: This means that the server has received the request headers, and that the client should proceed to send the request body (in the case of a request for which a body needs to be sent; for example, a POST request). If the request body is large, sending it to a server when a request has already been rejected based upon inappropriate headers is inefficient. To have a server check if the request could be accepted based on the request's headers alone, a client must send Expect: 100-continue as a header in its initial request and check if a 100 Continue status code is received in response before continuing (or receive 417 Expectation Failed and not continue).",
            "101": "Switching Protocols [101]: The server understands and is willing to comply with the client's request, via the Upgrade message header field (section 14.42), for a change in the application protocol being used on this connection. The server will switch protocols to those defined by the response's Upgrade header field immediately after the empty line which terminates the 101 response.",
            "102": "Processing (WebDAV) [102]: As a WebDAV request may contain many sub-requests involving file operations, it may take a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet. This prevents the client from timing out and assuming the request was lost.",

            // This class of status codes indicates the action requested by the client was received, understood, accepted and processed successfully.
            "200": "OK [200]: The request has succeeded.",
            "201": "Created [201]: The request has been fulfilled and resulted in a new resource being created. The newly created resource can be referenced by the URI(s) returned in the entity of the response, with the most specific URI for the resource given by a Location header field.",
            "202": "Accepted [202]: The request has been accepted for processing, but the processing has not been completed. The request might or might not eventually be acted upon, as it might be disallowed when processing actually takes place. There is no facility for re-sending a status code from an asynchronous operation such as this.",
            "203": "Non-Authoritative Information [203]: The returned metainformation in the entity-header is not the definitive set as available from the origin server, but is gathered from a local or a third-party copy.",
            "204": "No content [204]: The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation. The response MAY include new or updated metainformation in the form of entity-headers, which if present SHOULD be associated with the requested variant.",
            "205": "Reset Content [205]: The server has fulfilled the request and the user agent SHOULD reset the document view which caused the request to be sent. This response is primarily intended to allow input for actions to take place via user input, followed by a clearing of the form in which the input is given so that the user can easily initiate another input action. The response MUST NOT include an entity.",
            "206": "Partial Content [206]: The server has fulfilled the partial GET request for the resource. The request MUST have included a Range header field (section 14.35) indicating the desired range, and MAY have included an If-Range header field (section 14.27) to make the request conditional.",
            "207": "Multi-Status (WebDAV) [207]: The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.",
            "208": "Already Reported (WebDAV) [208]: The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.",
            "226": "IM Used [226]: The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",

            // The 4xx class of status code is intended for cases in which the client seems to have erred.
            // Except when responding to a HEAD request, the server should include an entity containing an explanation of the error situation, and whether it is a temporary or permanent condition.
            // These status codes are applicable to any request method. User agents should display any included entity to the user.
            "400": "Bad Request [400]: The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.",
            "401": "Unauthorized [401]: Error code response for missing or invalid authentication token.",
            "403": "Forbidden [403]: The request was a legal request, but the server is refusing to respond to it. Unlike a 401 Unauthorized response, authenticating will make no difference.",
            "404": "Not Found [404]: The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible.",
            "405": "Method Not Allowed [405]: A request was made of a resource using a request method not supported by that resource; for example, using GET on a form which requires data to be presented via POST, or using PUT on a read-only resource.",
            "408": "Request Timeout [408]: The server timed out waiting for the request. According to W3 HTTP specifications: \"The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time.\"",
            "409": "Conflict [409]: Conflicts are most likely to occur in response to a PUT request. For example, if versioning were being used and the entity being PUT included changes to a resource which conflict with those made by an earlier (third-party) request, the server might use the 409 response to indicate that it can't complete the request. In this case, the response entity would likely contain a list of the differences between the two versions in a format defined by the response Content-Type.",

            // Response status codes beginning with the digit "5" indicate cases in which the server is aware that it has encountered an error or is otherwise incapable of performing the request.
            // Except when responding to a HEAD request, the server should include an entity containing an explanation of the error situation, and indicate whether it is a temporary or permanent condition.
            // Likewise, user agents should display any included entity to the user. These response codes are applicable to any request method.
            "500": "Internal Server Error [500]: The server encountered an unexpected condition which prevented it from fulfilling the request.",
            "501": "Not Implemented [501]: The server does not support the functionality required to fulfill the request. This is the appropriate response when the server does not recognize the request method and is not capable of supporting it for any resource.",
            "502": "Bad Gateway [502]: The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.",
            "503": "Service Unavailable [503]: The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.",
            "504": "Gateway Timeout [504]: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server specified by the URI (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS) it needed to access in attempting to complete the request.",
            "505": "HTTP Version Not Supported [505]: The server does not support the HTTP protocol version used in the request.",
            "511": "Network Authentication Required [511]: The client needs to authenticate to gain network access. Intended for use by intercepting proxies used to control access to the network (e.g., \"captive portals\" used to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot)."

        });

})();