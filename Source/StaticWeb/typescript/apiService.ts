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
    private readonly _partialUrl: string = "forloop";

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
            let url = `${this._baseUrl}/${this._partialUrl}/sendmail`;
            response = await http<IResponse>(
                url,
                {
                    method: this.POST,
                    headers: this.getHeaders(),
                    body: jsonString
                }
            );
            return response;
        }
        catch (e) {
            this.handleError((e as Error).message);
        }

        return Promise.reject("Failed to save formdata.");
    }

    private handleError(exception: any) {
        // TODO: sent to error api endpoint
        console.error("Error", exception);
    }

    private getHeaders(): Headers {
        return new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Ocp-Apim-Subscription-Key": "bcf7595b5abc4d8492611c75b38e2464",
        });
    }
}

export function getService() : IService | null {
    let baseUrl = 'https://forloopapiman.azure-api.net';
    let service: IService | null = null;
    if (baseUrl != null) {
        service = new ApiService(baseUrl)
    }
    return service;
};