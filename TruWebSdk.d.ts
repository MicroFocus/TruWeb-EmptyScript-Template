// Type definitions for [TruWeb SDK] [2018.10]
// Project: [TruWeb]
// Definitions by: [TruWeb Team]

declare namespace load {
    /**
     *  An object that allows to create websocket connection to the AUT. When creating a _WebScoket_ you
     need to pass an options object with mandatory and some optional configuration. Once set, you can
     now send and receive messages over the socket.
     *
     * @export
     * @class WebSocket
     */
    export class WebSocket {
        readonly timeout: number;
        readonly id: string;
        readonly url: string;

        constructor(options: {
            url: string,
            timeout: number,
            onMessage(msg: string): void,
            onError(msg: string): void,
            onConnect(msg: string): void,
            onClose(msg: string): void,
        });

        onMessage(msg: string): void;

        onError(msg: string): void;

        onConnect(msg: string): void;

        onClose(msg: string): void;

        /**
         *initiates the connection to the server.
         *
         * @returns {Function}
         * @memberof WebSocket
         */
        connect(): Function;

        /**
         *This closes the websocket connection to the server
         *
         * @returns {Function}
         * @memberof WebSocket
         */
        close(): Function;

        /**
         *this sends the data to the connected ws server. The isMessageBinary should be set to true in case the message is in bytes.
         *
         * @param {*} dataToSend
         * @param {boolean} isMessageBinary
         * @returns {Function}
         * @memberof WebSocket
         */
        send(dataToSend: any, isMessageBinary: boolean): Function;

        /**
         *Allows to create sync barrier in the code to wait for specific message to fill a condition. You must use _await_ in order to make the script wait for the sync barrier.
         * If the timeout elapses before _continue_ has been called, the returned promise will be rejected.
         ** Please note: There can only be one sync barrier at a time.
         *
         * @param {number} timeout
         * @returns {Function}
         * @memberof WebSocket
         */
        waitForData(timeout: number): Function;

        /**
         * Releases a sync barrier created previously by _waitForData_.
         *
         * @returns {Function}
         * @memberof WebSocket
         */
        continue(): Function;

        /**
         *Enables to block the iteration ending till the connection have been disconnected by the following options:
         1. the server has closed the connection.
         2. _close_ has been called on the socket.
         3. the timeout set in the constructor has elapsed.
         *
         * @returns {Function}
         * @memberof WebSocket
         */
        waitForWebSocketDisconnection(): Function;

        /**
         *
         *
         * @returns {Function}
         * @memberof WebSocket
         */
        getConnectionStatus(): Function;
    }

    /**
     *An object that allows you sending web requests to the AUT. When creating a _WebRequest_ you
     can pass an options objects with all the configuration you need for the request. Then you can send
     the request in either asynchronous or synchronous way.”
     *
     * @export
     * @class WebRequest
     */
    export class WebRequest {
        constructor(options: {
            url: string,
            method: string,
            id?: number,
            headers: Object,
            resources: Array<unknown>,
            handleHTTPError(response: WebResponse): void,
            body: string,
            returnBody: boolean,
            forceAuthentication: boolean,
            queryString: Array<unknown>,
            extractors: Array<unknown>,
            multipartBody: Object
        });

        /**
         *Sends the request to the defined URL (see constructor) and returns a promise which is
         resolved with a _WebResponse_ object or rejected with an unhandled error.
         *
         * @returns {Promise < unknown >}
         * @memberof WebRequest
         */
        send(): Promise<unknown> ;

        /**
         *The synchronous version of _send_. When called, the script execution is blocked until a response is returned. Returns the resulting _WebResponse_ object or
         throws an exception if an error occurs and the error is not handled by the user via an error handler (see below).

         HTTP errors are handled by setting the _handleHTTPError_ property of the _WebRequest_.

         *
         * @returns {WebResponse}
         * @memberof WebRequest
         */
        sendSync(): WebResponse;
    }

    /**
     *This object is returned as a WebRequest result.

     *
     * @export
     * @class WebResponse
     */
    export class WebResponse {
        status: number; // The status code of the request
        headers: object; // A key value store of the headers in the response sent by the server
        size: number; // The size (in bytes) of the response
        body: string; //The body of the response. Note that the body is available only if the request had the property returnBody set to true
        jsonBody: object; //The body of the response as an object (only applicable when the body is a valid json). Note that jsonBody is available only if the request had the property returnBody set to true
        request: WebRequest; //The WebRequest object that caused this response to be generated
        resources: [Array<unknown>, object]; //A list of all the resources that were downloaded as part of the request. Each resource object contains two fields
        url: string; //The URL of the resource
        redirectUrls: Array<string>; //A list of all the URLs that passed through while redirecting to this response
        extractors: object; //The results of the extractor applied on the response.

        /**
         * Checks if the given expression matches a substring within the body.
         * Note: textCheck works only if the request had the property returnBody set to true
         * @param expression can be either a string or a regular expression.
         * @returns true if the expression was found in the response body and false otherwise.
         */
        textCheck(expression: string): boolean
    }

    export class MultipartBody {
        constructor(entries, boundary)
    }

    export namespace MultipartBody {
        class FileEntry {
            constructor(name: string, filePath: string, contentType: string, fileName: string)
        }

        class StringEntry {
            constructor(name: string, value: string)
        }
    }

    export class Transaction {
        readonly name: string;
        state: load.TransactionState;
        startTime: number;
        duration: number;
        status: load.TransactionStatus;

        constructor(name: string);

        start(): void;

        stop(status ?: load.TransactionStatus)

        set(status: load.TransactionStatus, duration: Number)

        update(): Transaction
    }

    enum TransactionState {
        NotStarted,
        InProgress,
        Ended,
        Passed,
        Failed
    }

    enum TransactionStatus {
        Passed,
        Failed
    }

    enum LogLevel {
        error,
        warning,
        info,
        debug,
        trace
    }

    enum ExitType {
        iteration,
        stop,
        abort
    }

    export class config {
        userId: string; // The _id of the currently running Vuser
        script: {
            name: string;
            directory: string;
            fullPath: string;
        };
        host: {
            name: string;
        }
    }


    /**
     *Registers the given _callback to be run in the initialization phase of the test.
     The _callback may return a promise that will be used to determine if the _callback has succeeded or failed.
     *
     * @export
     * @param {async function} callback
     */
    export function initialize(callback: Function): void;

    /**
     *Registers the given _callback as a named action of the script with the given name. The actions will be run in the same order as they are registered by calls to load.action() as currently we do not support any kind of run logic. The _callback may return a promise that will be used to determine if the _callback has succeeded or failed.
     *
     * @export
     * @param {string} name
     * @param {function} callback
     */
    export function action(name: string, callback: Function): void;

    /**
     *Registers the given _callback to be run in the finalization phase of the test. The _callback may return a promise which will be used to determine if the _callback has succeeded or failed.
     *
     * @export
     * @param {function} callback
     */
    export function finalize(callback: Function): void;

    export function log(message: string, logLevel: load.LogLevel): void;

    export function sleep(time: Number): void;

    export function exit(exitType: load.ExitType, message: string): void;

    export function setUserCredentials(authenticationData: AuthenticationData | Array<AuthenticationData>): void;

    /**
     * A function that allows you to unmask masked value. The _maskedValue_ argument is a string generated using TruWebUtils executable.
     **Note:** Masking is not secure and anyone is able to unmask it.
     * @param maskedValue
     */
    export function unmask(maskedValue: string): string;

    /**
     * A function that allows you to decrypt encrypted value. The _encryptedValue_ argument is an encrypted string generated using TruWebUtils executable.
     **Note:** During runtime encryption key file should be supplied.
     * @param encryptedValue
     */
    export function decrypt(encryptedValue: string): string;

    export var params: object;

    export class AuthenticationData {
        username: string;
        password: string;
        host: string;
        domain: string;
    }

    export class ExtractorObject {
    }

    /**
     *This constructor will create a extractor object for the boundary extractor.
     It will search the headers and the body of the response for any string that begins with _leftBoundary_ and terminates
     with _rightBoundary_, and return the first matching string between the two boundaries. If nothing is found then
     ```null``` is returned. For additional options please use the next constructor version.
     *
     * @export
     * @param {string} name
     * @param {string} leftBoundary
     * @param {string} rightBoundary
     * @returns {ExtractorObject}
     */
    export function BoundaryExtractor(name: string, leftBoundary: string, rightBoundary: string): ExtractorObject
    /**
     *This constructor will create a extractor object for the boundary extractor.
     *
     * @export
     * @param {string} name
     * @param {({
     *         leftBoundary: string, The left boundary of the search.
     *         rightBoundary: string, The right boundary of the search.
     *         occurrence ? : string | number,
     *         includeRedirections ? : boolean
     *     })} options
     */
    export function BoundaryExtractor(name: string, options: {
        leftBoundary: string,
        rightBoundary: string,
        occurrence?: string | number,
        includeRedirections?: boolean
    });

    /**
     * This constructor creates a correlation object for the regular expression correlation.
     * It searches the headers and the body of the response for the a match of the given regular expression and returns the first match of the first group.
     * The documentation for the regular expression syntax can be found here: https://github.com/google/re2/wiki/Syntax.
     *
     * @export
     * @param {string} name
     * @param {string} expression
     * @param {string} flags The regular expression flags (see regular expression syntax documentation for more details).
     * @returns {ExtractorObject} If nothing is found then null is returned. For additional options please use the next constructor version.
     */
    export function RegexpExtractor(name: string, expression: string, flags: string): ExtractorObject

    export interface RegexpExtractorOptions {
        expression: string;
        flags: string;
        groupNumber?: number;
        occurence?: string | number;
        includeRedirections?: boolean;
    }

    export function RegexpExtractor(name: string, options: RegexpExtractorOptions): ExtractorObject

    export function JsonPathExtractor(name: string, path: string, returnMultipleValues: boolean): ExtractorObject


    export namespace Cookie {
        export class CookieOptions {
            name: string; //The name of the cookie
            value: string; //The value of the cookie
            expires ?: string; //The maximum lifetime of the cookie as an HTTP-date timestamp.
            maxAge ?: number; //Number of seconds until the cookie expires
            domain: string; //The hosts to which the cookie will be sent
            path ?: string; // - A URL path that must exist in the requested resource before sending the Cookie header
            isSecure ?: boolean; // - Indicates whether the cookies is secure or not
            isHttpOnly ?: boolean; // - HTTP-only cookies aren't accessible via JavaScript
            sameSite ?: "strict" | "lax" //Allows servers to assert that a cookie ought not to be sent along with cross-site requests
        }
    }

    export class Cookie {
        constructor(options: Cookie.CookieOptions);

        /**
         * Takes a Cookie object or an array of Cookie objects and deletes them from the engine. No error is returned if one or more of the given cookies don't exist in the engine (i.e. were not previously added by addCookies).
         *
         * @param {(Cookie | Array<cookie>)} cookie
         * @memberof Cookie
         */
        deleteCookies(cookie: Cookie | Array<Cookie>): void;

        /**
         * Takes a Cookie object or an array of Cookie objects and adds them to the engine. The cookies will be used when needed according to the url of the web request.
         *
         * @param {(Cookie | Array < Cookie >)} cookie
         * @memberof Cookie
         */
        addCookies(cookie: Cookie | Array<Cookie>): void;

        /**
         *Deletes all the cookies that were added to the engine via addCookies().
         *
         * @memberof Cookie
         */
        clearCookies(): void;
    }

    export interface utils {
        /**
         *Returns the substring within the source string between leftBoundary and rightBoundary. If leftBoundary is undefined then the beginning of the source string is used as left boundary. If rightBoundary is undefined then the end of the source string is used as the right boundary. If either boundary is not found in the source string or the source string is invalid then null is returned.
         *
         * @param {string} source
         * @param {string} leftBoundary
         * @param {string} rightBoundary
         * @returns {string}
         * @memberof utils
         */
        getByBoundary(source: string, leftBoundary: string, rightBoundary: string): string

        /**
         *Reports a data point with the given name and value to the results database. The reported value will be in the CustomDataPoints table in the results database. The timestamp and the reporting Vuser Id will be automatically added. Note that the value must be a number.
         *
         * @param {string} name
         * @param {*} value
         * @memberof utils
         */
        reportDataPoint(name: string, value: any)
    }

    /**
     * The VTS integration API allows you to connect to a VTS server and perform various operations on it such as reading and writing from columns, managing indices, and more.
     *
     * @export
     * @class VTS
     */
    export function vtsConnect(options: {
        server: string //The name or IP address of the VTS server host. HTTP is assumed by default, unless the URL begins with HTTPS.
        port: number //The port number.
        userName?: string //The user name.
        password?: string //A plain text password.
    }): VTSClient

    export enum VTSPlacementType {
        sameRow,
        stacked,
        unique
    }

    /**
     *The VTSClient is responsible for issuing commands to the VTS server.
     Use it to obtain other VTS related constructs such as VTSColumn, VTSRow, and VTSField. The client allows you to perform general operations which affect more than one column, row, or field.
     *
     * @export
     * @class VTSClient
     */
    export class VTSClient {
        getColumn(columnName): VTSColumn

        getRow(rowIndex): VTSRow

        createColumn(columnName): VTSColumn

        popColumns(columnNames): Object

        rotateColumns(columnNames, placementType): Object

        setValues(columnNames, values, placementType): Object
    }

    /**
     * The VTSColumn is a reference to a column in the VTS server. Use this object to perform operations on the underlying column.
     *
     * @export
     * @class VTSColumn
     */
    export class VTSColumn {
        readonly client: VTSClient;

        /**
         *Clears all data in a column.
         *
         * @memberof VTSColumn
         */
        clear(): void;

        /**
         * Returns the number of fields that contain data in a column.
         *
         * @returns {Number}
         * @memberof VTSColumn
         */
        size(): Number

        /**
         *Creates an index on a column. If a column is not indexed, the time required to execute addUnique() increases with the number of rows. If the column is indexed, the time for 'send if unique' operations is constant. For large databases, we recommend that you index columns you want to perform 'unique' operations. A column is locked while an index is being built on it. Any function calls that change the column are queued until the index build completes. If the index exists, this function has no effect.
         *
         * @memberof VTSColumn
         */
        createIndex(): void;

        /**
         *Deletes the index on a column.
         *
         * @memberof VTSColumn
         */
        dropIndex(): void;

        /**
         *Sets the last field of a column to a value. If there is no empty field in the column, a new row is created. If ifUniqe is true then checks if the value does not exist in the column. If the value already exists in the column, the function has no effect. If a column is not indexed, the time required to execute a addValue() with ifUnique set to true increases with the number of rows. If the column is indexed, the time is constant. For large databases, we recommend that you index columns you want to perform this operation on via createIndex().
         *
         * @param {string} value
         * @param {boolean} ifUnique
         * @memberof VTSColumn
         */
        addValue(value: string, ifUnique: boolean): void;

        /**
         * Clears the data in a field within the column defined by the rowIndex.
         *
         * @param {number} rowIndex
         * @memberof VTSColumn
         */
        clearField(rowIndex: number): void;

        /**
         * Changes the value in the field within the column defined by the rowIndex, by the amount passed in argument value. If the field value cannot be converted to an integer or if there is no data in the field, the field value after the call is value. Note that value must be a number.
         *
         * @param {number} rowIndex
         * @param {number} value
         * @memberof VTSColumn
         */
        incrementField(rowIndex: number, value: number): void;

        /**
         * Retrieves the data in a field . If there is no data in the field, the output is null.
         *
         * @param {number} rowIndex
         * @returns {string}
         * @memberof VTSColumn
         */
        getFieldValue(rowIndex: number): string | null

        /**
         * Writes the value to the field within the column defined by the rowIndex. If existingValue was specified, the existingValue and the field value match, the field value is overwritten.
         *
         * @param {number} rowIndex
         * @param {string} value
         * @param {string} existingValue
         * @memberof VTSColumn
         */
        setFieldValue(rowIndex: number, value: string, existingValue: string): void;

        /**
         *Retrieves the value from the field in the top row of the column. All fields below the first row move up one row. For example, after the call, the value that was in the second row in the column is in the first row, the value that was in the third row is in the second row, and so on. The last field in the column is cleared.
         *
         * @returns {string}
         * @memberof VTSColumn
         */
        pop(): string

        /**
         *Retrieves the data in the first field of the column. The data is removed from the first field and moved to the bottom of the column as specified by the placementType parameter. If there is no data in a cell, the output is null.
         * @param {VTSPlacementType} placementType placementType must be one of the following:
         load.VTSPlacementType.stacked - The data is sent to an available field at the bottom of the column.
         load.VTSPlacementType.unique - If the value of the first field already exists elsewhere in the column, the top field is retrieved and then discarded. Otherwise, data is sent to an available field at the bottom of the column.
         * @returns {string}
         * @memberof VTSColumn
         */
        rotate(placementType: VTSPlacementType): string | null
    }

    export class VTSRow {
        /**
         * the client which contains this row
         */
        readonly client: VTSClient;

        /**
         *Clears the values from all fields in a row. If a cell has a value, clear() sets the value to an empty string. Cells with no value are not affected. Querying such cells returns null before and after the call to clear().
         *
         * @memberof VTSColumn
         */
        clear(): void;

        /**
         *Retrieves the data in a row as an object which has a property that corresponds to each column name. If there is no data in a field, the corresponding output is null.
         *
         * @returns {Object}
         * @memberof VTSRow
         */
        getValues(): Object;

        /**
         *Sets the data given in values into the columns given by columnNames. The number of columns must be identical to the number of values provided.
         placementType must be one of the following:
         load.VTSPlacementType.sameRow - Send all the data to the same row.
         load.VTSPlacementType.stacked - Data is sent to available fields in each column according to VTS internal logic.
         load.VTSPlacementType.unique - Data is sent to available fields in each column only if the value does not already exist in the column it would be written to.
         *
         * @param {Array<string>} columnNames
         * @param {Array<string>} values
         * @memberof VTSRow
         */
        setValues(columnNames: Array<string>, values: Array<VTSPlacementType>): void;

    }


    export class Timer {

        /**
         * Creates an timer that will fire once every `_delay` milliseconds.
         * @param callback the _callback to call each time the timer fires
         * @param delay interval time in [milliseconds]
         */
        constructor(callback: Function, delay: number);

        /**
         * stops the requested timer
         */
        stop(): void;

        /**
         * Starts an interval timer that will fire once every `_delay` milliseconds.
         */
        startInterval(): void;

        /**
         * Starts an timeout timer that will fire once after `_delay` [milliseconds].
         */
        startTimeout(): void;

        /**
         * allows to `await` the timeout or interval to fire and clear before finishing the iteration.
         * if it's not used with a timer create with setInterval or setTimeout - behaviour is undefined.
         * @Throws error if timer was already stopped.
         */
        wait(): Promise<undefined>;
    }


}