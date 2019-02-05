import 'jasmine';
import { Client } from './client';
import { ClientConfig } from '../service-models/client-config';
import { Personnel } from "../compass-models/personnel";
import { TestClientConfig as c } from './test-client-config';
import { ResponseData } from '..';

describe("PersonnelClient", () => {

    let client: Client = new Client(new ClientConfig(c.firmId, c.username, c.password, c.apiKey, c.compassUrl));
    let aValidPersonnelId: number = 1146777;

    beforeEach(() => {
        client.config.firmId = c.firmId;
        client.config.username = c.username;
        client.config.password = c.password;
        client.config.apiKey = c.apiKey;
        client.config.compassUrl = c.compassUrl;
    });

    it("Can read personnel", async () => {
        let res: ResponseData<Personnel[]> = await client.get<Personnel[]>('/personnel');
        if(res.success) aValidPersonnelId = res.result[0].PersonnelId;
        expect(res.success).toBeTruthy(res.message);
    });

    it("Can read personnel for incorrect url", async () => {
        let mistypedUrls: string[] = ['/personne', '/personnels', '/perosnnel'];
        mistypedUrls.forEach(async (index) => {       
            let res: ResponseData<Personnel[]> = await client.get<Personnel[]>(index);
            expect(res.success).toBeFalsy(res.message);
        });
    });

    it("Can read a personnel", async () => {
        //In case this function runs prior to getting a valid id, 1146777 acts as a test id from UAT Env
        let url = '/personnel/' + aValidPersonnelId;
        let res: ResponseData<Personnel> = await client.get<Personnel>(url);
        expect(res.success).toBeTruthy(res.message);
    });

    it("Can read a personnel for invalid id", async () => {
        let url: string = '/personnel/5555444';
        let res: ResponseData<Personnel> = await client.get<Personnel>(url);
        expect(res.success).toBeFalsy(res.message);
    });

    it("Can add personnel with valid data", async () => {
        //In case this function runs prior to getting a valid id, 1146777 acts as a test id from UAT Env
        let url = '/personnel/' + aValidPersonnelId;
        let resGet: ResponseData<Personnel> = await client.get<Personnel>(url);

        resGet.result.FirstName = "John";
        resGet.result.LastName = "Doe";
        let exPersonnel: Personnel[] = [resGet.result];

        let resPost: ResponseData<Personnel[]> = await client.post<Personnel[]>('/personnel', exPersonnel);
        expect(resPost.success).toBeTruthy(resPost.message);
    });

    it("Can update personnel with valid data", async () => {
        //In case this function runs prior to getting a valid id, 1146777 acts as a test id from UAT Env
        let urlGet = '/personnel/' + aValidPersonnelId;
        let resGet: ResponseData<Personnel> = await client.get<Personnel>(urlGet);

        resGet.result.Title = "Quality Analyst";
        resGet.result.LastName = "Cena";
        resGet.result.ROW_VERSION = "";

        let exPersonnel: Personnel = resGet.result;
        let urlPut = '/personnel/' + resGet.result.PersonnelId;

        let resPut: ResponseData<Personnel> = await client.put<Personnel>(urlPut, exPersonnel);
        expect(resPut.success).toBeTruthy(resPut.message);
    });

    it("Can update personnel with invalid data", async () => {
        //In case this function runs prior to getting a valid id, 1146777 acts as a test id from UAT Env
        let urlGet = '/personnel/' + aValidPersonnelId;
        let resGet: ResponseData<Personnel> = await client.get<Personnel>(urlGet);

        resGet.result.Notes = "A random note";
        //Not clearing off the existing row_version
        
        let exPersonnel: Personnel = resGet.result;
        let urlPut = '/personnel/' + resGet.result.PersonnelId;

        let resPut: ResponseData<Personnel> = await client.put<Personnel>(urlPut, exPersonnel);
        expect(resPut.success).toBeFalsy(resPut.message);
    });

    it("Can delete a personnel with valid id", async () => {
        //In case this function runs prior to getting a valid id, 1146777 acts as a test id from UAT Env
        let url = '/personnel/' + aValidPersonnelId;
        let res: ResponseData<Personnel> = await client.delete<Personnel>(url);
        expect(res.success).toBeTruthy(res.message);
    });

    it("Can delete a personnel with invalid id", async () => {
        let url: string = '/personnel/5555999';
        let res: ResponseData<Personnel> = await client.delete<Personnel>(url);
        expect(res.success).toBeFalsy(res.message);
    });
    
    it("Search personnel using valid params", async () => {
        let queryParams = {
            "OfficeEmail": "jdoe@cosential.com"//,
            //"FirstName": "John"
        };

        let res: ResponseData<Personnel[]> = await client.search<Personnel[]>('/personnel', queryParams);
        expect(res.success).toBeTruthy(res.message);
    });

    it("Search personnel for invalid params", async () => {
        let queryParams = {
            "test": "abc"
        };

        let res: ResponseData<Personnel[]> = await client.search<Personnel[]>('/personnel', queryParams);
        //return all or none on empty or invalid params
        expect(res.success).toBeTruthy(res.message);
    });
});