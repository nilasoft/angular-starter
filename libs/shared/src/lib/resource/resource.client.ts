import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {AUTH_CONFIG, AuthConfig} from '@nilasoft/auth';
import {BaseClient} from '@nilasoft/core';
import {Resource} from '@nilasoft/data';
import _ from 'lodash';
import {Observable} from 'rxjs';

@Injectable()
export class ResourceClient extends BaseClient<Resource> {

  public constructor(http: HttpClient, @Inject(AUTH_CONFIG) config: AuthConfig) {
    super(`/${_.toLower(config.role)}/resources`, http);
  }

  public createFile(file: File): Observable<Resource> {
    const data = new FormData();
    data.set('file', file);
    return this.http.post<Resource>(`${this.baseUrl}/`, data);
  }

  public replaceFile(id: number, file: File): Observable<Resource> {
    const data = new FormData();
    data.set('file', file);
    return this.http.put<Resource>(`${this.baseUrl}/${id}`, data);
  }

}
