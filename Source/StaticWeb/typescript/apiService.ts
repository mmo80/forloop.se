import { http, HttpResponse } from './http';

export interface IFormData {
    email: string;
    message: string;
}

export interface IResponse {
    message: string;
}

export interface IService {
    Send(formdata: IFormData): Promise<HttpResponse<IResponse>>;
}

export class ApiService implements IService {
    private _baseUrl: string;
    private readonly POST: string = "POST";
    private readonly _partialUrl: string = "api";

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public async Send(formdata: IFormData): Promise<HttpResponse<IResponse>> {
        let response: HttpResponse<IResponse>;
        try {
            let jsonString = JSON.stringify({
                email: formdata.email,
                message: formdata.message
            });
            response = await http<IResponse>(
                `${this._baseUrl}/${this._partialUrl}/sendmail`,
                {
                    method: this.POST,
                    headers: this.getHeaders(),
                    body: jsonString
                }
            );
            return response;
        }
        catch (exception) {
            this.handleError(exception);
        }

        return Promise.reject("Failed to save formdata.");
    }

    private handleError(exception: any) {
        // TODO: sent to error api endpoint
        console.error("Error", exception);
    }

    private getHeaders(): Headers {
        //let aft = document.getElementById('RequestVerificationToken') as HTMLInputElement;
        return new Headers({
            "Content-Type": "application/json; charset=utf-8",
            //"RequestVerificationToken": aft.value,
        });
    }
}

export function getService() : IService | null {
    let baseUrl = 'https://forloopfunctionapp20210101181429.azurewebsites.net';//StateService.get<string>('common.baseurl');
    let service: IService | null = null;
    if (baseUrl != null) {
        service = new ApiService(baseUrl)
    }
    return service;
};