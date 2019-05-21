import { Injectable } from '@angular/core';
import { ModelArticle } from './ModelArticle';
import { ApiService, ApiResponse, ApiResponseList } from './api.service';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class ApiArticleService {
    endPoint = 'article';

    constructor(private api: ApiService, private http: HttpClient) {}

    GetAll(): Observable<ModelArticle[]> {
        const url = this.api.NormalizeEndpoint(`api/${this.endPoint}s`);
        return this.http
            .get<ApiResponseList<ModelArticle>>(url, this.api.httpOptions)
            .pipe(
                map(data => {
                    return data.data.data;
                })
            );
    }

    Get(id: string): Observable<ModelArticle> {
        const url = this.api.NormalizeEndpoint(`api/${this.endPoint}/${id}`);
        return this.http.get<ApiResponse<ModelArticle>>(url, this.api.httpOptions).pipe(
            map(data => {
                return data.data;
            })
        );
    }

    Create(data: ModelArticle): Observable<ModelArticle> {
        const url = this.api.NormalizeEndpoint(`api/${this.endPoint}`);
        return this.http
            .post<ApiResponse<ModelArticle>>(
                url,
                JSON.stringify({
                    data: data
                }),
                this.api.httpOptions
            )
            .pipe(
                map(mdata => {
                    return mdata.data;
                })
            );
    }

    Edit(id: string, data: ModelArticle): Observable<ModelArticle> {
        const url = this.api.NormalizeEndpoint(`api/${this.endPoint}/${id}`);
        return this.http
            .put<ApiResponse<ModelArticle>>(
                url,
                JSON.stringify({
                    data: data
                }),
                this.api.httpOptions
            )
            .pipe(
                map(mdata => {
                    return mdata.data;
                })
            );
    }

    Delete(id: string): Observable<any> {
        const url = this.api.NormalizeEndpoint(`api/${this.endPoint}/${id}`);
        return this.http.delete<any>(url, this.api.httpOptions).pipe(
            map(mdata => {
                return mdata.data;
            })
        );
    }


    Search(
        searchStr: string,
        skip: Number = 0,
        limit: Number = 100
    ): Observable< ModelArticle[]> {
        const url = this.api.NormalizeEndpoint(
            `api/${
                this.endPoint
            }s/search?keyword=${searchStr}&skip=${skip}&limit=${limit}`
        );
        return this.http
            .get< ApiResponseList< ModelArticle>>(url, this.api.httpOptions)
            .pipe(
                map(data => {
                    return data.data.data;
                })
            );
    }

    SearchAdvanced(
        searchObj: any,
        skip: Number = 0,
        limit: Number = 100
    ): Observable< ModelArticle[]> {
        const url = this.api.NormalizeEndpoint(
            `api/${this.endPoint}s/search?skip=${skip}&limit=${limit}`
        );
        return this.http
            .post< ApiResponseList< ModelArticle>>(
                url,
                JSON.stringify({
                    data: searchObj
                }),
                this.api.httpOptions
            )
            .pipe(
                map(data => {
                    return data.data.data;
                })
            );
    }
}
