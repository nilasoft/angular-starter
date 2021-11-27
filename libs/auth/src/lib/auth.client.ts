import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {API_URL, CONTENT_TYPE, JSON_PATCH} from '@nilasoft/core';
import {Authorization, LoginRequest, RegisterRequest, User} from '@nilasoft/data';
import {Operation} from 'fast-json-patch';
import _ from 'lodash';
import {Observable} from 'rxjs';
import {AUTH_CONFIG} from './auth.constant';
import {AuthConfig} from './auth.model';

@Injectable()
export class AuthClient {

  private readonly baseUrl: string;

  private readonly role: string;

  public constructor(@Inject(AUTH_CONFIG)
                     private config: AuthConfig,
                     private http: HttpClient) {
    this.baseUrl = API_URL;
    this.role = _.toLower(config.role);
  }

  public login(credentials: LoginRequest): Observable<Authorization> {
    return this.http.post<Authorization>(`${this.baseUrl}/auth/${this.role}/login`, credentials);
  }

  public register(credentials: RegisterRequest): Observable<Authorization> {
    return this.http.post<Authorization>(`${this.baseUrl}/auth/${this.role}/register`, credentials);
  }

  public find(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${this.role}`);
  }

  public update(patch: Operation[]): Observable<User> {
    const headers = new HttpHeaders();
    headers.append(CONTENT_TYPE, JSON_PATCH);
    return this.http.patch<User>(`${this.baseUrl}/${this.role}`, patch, {headers});
  }

  public delete(): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${this.role}`);
  }

}
