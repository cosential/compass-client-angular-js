import 'isomorphic-fetch';
import { Base64 } from 'js-base64';
import { RequestOptions, ResponseData } from '..';
import { ClientConfig } from '../service-models/client-config';


/**
 * Represents the Client service for the Cosential Compass API calls.
 */
export class Client {

    private _config: ClientConfig;

    /**
     * Getter config
     * @return {ClientConfig}
     */
    public get config(): ClientConfig {
        return this._config;
    }

    /**
     * Setter config
     * @param {ClientConfig} value
     */
    public set config(value: ClientConfig) {
        this._config = value;
    }

    constructor(config: ClientConfig) {
        this.config = config;
    }

    /**
     * Returns a response for the GET request.
     * @param url - Compass API endpoint with/without a valid Id
     * @param opts - Optional request headers
     * @param from - Number of elements you would like to skip
     * @param size - Number of elements you would like to receive (max is 500)
     * @param includeDeleted - Include deleted records in GET
     * @returns A detailed response object as a Promise
     */
    public async get < T > (url: string, opts: RequestOptions = {
        showErrors: true
    }, from: number = 0, size: number = 50, includeDeleted: boolean = false): Promise < ResponseData < T >> {

        let headers = {
            //Basic auth
            'Authorization': 'Basic ' + Base64.encode(this.config.username + ':' + this.config.password),
            'x-compass-firm-id': this.config.firmId.toString(),
            'x-compass-api-key': this.config.apiKey,
            //We're expecting json
            'Accept': 'application/json'
        };

        let newUrl: string = this.config.compassUrl + url;
        let paging: string = 'from=' + from + '&size=' + size;

        newUrl += (url.indexOf('?q=') > -1) ? '&' + paging : '?' + paging;
        if (includeDeleted) newUrl += '&includedeleted=true';
        if (opts.showErrors) headers['x-compass-show-errors'] = 'true';

        let responseCode: number = 0;
        let responseText: string = '';
        let responseUrl: string = '';

        try {

            let response: Response = await fetch(newUrl, {
                method: 'GET',
                headers: headers
            });

            responseCode = response.status;
            responseText = response.statusText;
            responseUrl = response.url;

            if (!response.ok) {
                throw new Error(`Compass API call failed. [${responseUrl}] responded with: [${responseCode} ${responseText}]`);
            }

            let message: string = `Compass API call successful. [${responseUrl}] responded with: [${responseCode} ${responseText}]`;
            let data: T = null;

            if (response.status == 200) {
                data = await response.json();
            }

            return {
                success: true,
                status: responseCode,
                error: null,
                message: message,
                result: data
            };

        } catch (e) {
            return {
                success: false,
                status: responseCode,
                error: e,
                message: e.message,
                result: null
            };
        }
    }

    /**
     * Returns a response for the POST request.
     * @param url - Compass API endpoint
     * @param payload - Array of elements
     * @param opts - Optional request headers
     * @returns A detailed response object as a Promise
     */
    public async post < T > (url: string, payload: T, opts: RequestOptions = {
        showErrors: true
    }): Promise < ResponseData < T >> {

        let headers = {
            'Authorization': 'Basic ' + Base64.encode(this.config.username + ':' + this.config.password),
            'x-compass-firm-id': this.config.firmId.toString(),
            'x-compass-api-key': this.config.apiKey,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (opts.showErrors) headers['x-compass-show-errors'] = 'true';

        let responseCode: number = 0;
        let responseText: string = '';
        let responseUrl: string = '';

        try {

            let response: Response = await fetch(this.config.compassUrl + url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            responseCode = response.status;
            responseText = response.statusText;
            responseUrl = response.url;

            if (!response.ok) {
                throw new Error(`Compass API call failed. [${responseUrl}] responded with: [${responseCode} ${responseText}]`);
            }

            let data: T = await response.json();

            return {
                success: true,
                status: responseCode,
                error: null,
                message: null,
                result: data
            };

        } catch (e) {
            return {
                success: false,
                status: responseCode,
                error: e,
                message: e.message,
                result: null
            };
        }
    }

    /**
     * Returns a response for the PUT request.
     * @param url - Compass API endpoint with a valid Id
     * @param payload - Updated element including new and existing values
     * @param opts - Optional request headers
     * @returns A detailed response object as a Promise
     */
    public async put < T > (url: string, payload: T, opts: RequestOptions = {
        showErrors: true
    }): Promise < ResponseData < T >> {

        let headers = {
            'Authorization': 'Basic ' + Base64.encode(this.config.username + ':' + this.config.password),
            'x-compass-firm-id': this.config.firmId.toString(),
            'x-compass-api-key': this.config.apiKey,
            'Accept': 'application/json',
            'Content-Type': (opts.urlEncoded) ? 'application/x-www-form-urlencoded' : 'application/json'
        };

        if (opts.showErrors) headers['x-compass-show-errors'] = 'true';

        let responseCode: number = 0;
        let responseText: string = '';
        let responseUrl: string = '';

        try {

            let response: Response = await fetch(this.config.compassUrl + url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(payload)
            });

            responseCode = response.status;
            responseText = response.statusText;
            responseUrl = response.url;

            if (!response.ok) {
                throw new Error(`Compass API call failed. [${responseUrl}] responded with: [${responseCode} ${responseText}]`);
            }

            let data: T = await response.json();

            return {
                success: true,
                status: responseCode,
                error: null,
                message: null,
                result: data
            };

        } catch (e) {
            return {
                success: false,
                status: responseCode,
                error: e,
                message: e.message,
                result: null
            };
        }
    }

    /**
     * Returns a response for the DELETE request.
     * @param url - Compass API endpoint with a valid Id
     * @param opts - Optional request headers
     * @returns A detailed response object as a Promise
     */
    public async delete < T > (url: string, opts: RequestOptions = {
        showErrors: true
    }): Promise < ResponseData < T >> {

        let headers = {
            'Authorization': 'Basic ' + Base64.encode(this.config.username + ':' + this.config.password),
            'x-compass-firm-id': this.config.firmId.toString(),
            'x-compass-api-key': this.config.apiKey
        };

        if (opts.showErrors) headers['x-compass-show-errors'] = 'true';

        let responseCode: number = 0;
        let responseText: string = '';
        let responseUrl: string = '';

        try {

            let response: Response = await fetch(this.config.compassUrl + url, {
                method: 'DELETE',
                headers: headers
            });

            responseCode = response.status;
            responseText = response.statusText;
            responseUrl = response.url;

            if (!response.ok) {
                throw new Error(`Compass API call failed. [${responseUrl}] responded with: [${responseCode} ${responseText}]`);
            }

            let data: T = await response.json();

            return {
                success: true,
                status: responseCode,
                error: null,
                message: null,
                result: data
            };

        } catch (e) {
            return {
                success: false,
                status: responseCode,
                error: e,
                message: e.message,
                result: null
            };
        }
    }

    /**
     * Returns top 50 search results based on query string unless otherwise specified.
     * @param url - Compass API endpoint
     * @param queryString - Complete search query
     * @param from - Number of elements you would like to skip
     * @param size - Number of elements you would like to receive (max is 500)
     * @param includeDeleted - Include deleted records in search
     * @param opts - Optional request headers
     * @returns A detailed response object as a Promise
     */
    public async search < T > (url: string, queryString: string, fields: string = null, from: number = 0, size: number = 50, includeDeleted: boolean = false, opts: RequestOptions = {
        showErrors: true
    }): Promise < ResponseData < T >> {

        let searchQuery: string = (queryString != null) ? queryString.trim() : queryString;
        if (searchQuery == '' || searchQuery == null) {
            throw new Error(`Compass API call failed. String to search '${searchQuery}' is Empty or Invalid.`);
        }

        let newUrl: string = url + '/search';

        let searchDetails: any = {
            queryString: searchQuery,
            fields: fields,
            includeDeleted: includeDeleted,
            Size: size,
            From: from
        }

        return await this.post < T > (newUrl, searchDetails, opts);
    }

    /**
     * Returns entire search result data set.
     * @param url - Compass API endpoint
     * @param queryString - Complete search query
     * @param includeDeleted - Include deleted records in search
     * @param fields - Comma-separated fields to return
     * @param opts - Optional request headers
     * @returns A detailed response object as a Promise
     */
    public async searchForAll < T > (url: string, queryString: string, fields: string = null, includeDeleted: boolean = false, opts: RequestOptions = {
        showErrors: true
    }): Promise < ResponseData < T[] >> {

        let finished: boolean = false;
        let data: T[] = [];

        let from: number = 0;
        let size: number = 500;

        while (!finished) {
            let res: ResponseData < T > = await this.search < T > (url, queryString, fields, from, size, includeDeleted, opts);

            if (res.status == 200) {
                if (Object.keys(res.result).length > 0) {
                    for (let index = 0; index < Object.keys(res.result).length; index++) {
                        data.push(res.result[index]);
                    }
                    from += size;
                } else { finished = true; }
            } else { 
                //something went wrong
                //do not return any data
                return { success: res.success, status: res.status, error: res.error, message: res.message, result: null };
            }
        }

        //all good
        return { success: true, status: 200, error: null, message: null, result: data };
    }
}