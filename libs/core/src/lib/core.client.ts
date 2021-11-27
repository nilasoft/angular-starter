import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseEntity, Expression, Page, Pageable} from '@nilasoft/data';
import {Operation} from 'fast-json-patch';
import {Observable} from 'rxjs';
import urljoin from 'url-join';
import {API_URL, CONTENT_TYPE, JSON_PATCH} from './core.constant';
import {toParams} from './core.util';

export class BaseClient<E extends BaseEntity> {

  protected readonly baseUrl: string;

  protected constructor(protected path: string,
                        protected http: HttpClient) {
    this.baseUrl = urljoin(API_URL, path);
  }

  public create(e: E): Observable<E> {
    return this.http.post<E>(`${this.baseUrl}`, e);
  }

  public findPage(pageable: Partial<Pageable>): Observable<Page<E>> {
    const params = toParams(pageable);
    return this.http.get<Page<E>>(`${this.baseUrl}`, { params });
  }

  public findAll(): Observable<E[]> {
    return this.http.get<E[]>(`${this.baseUrl}/all`);
  }

  public query(expression: Expression, pageable?: Partial<Pageable>): Observable<Page<E>> {
    const params = toParams(pageable);
    return this.http.post<Page<E>>(`${this.baseUrl}/query`, expression, { params });
  }

  public findOne(): Observable<E> {
    return this.http.get<E>(`${this.baseUrl}/one`);
  }

  public findById(id: number): Observable<E> {
    return this.http.get<E>(`${this.baseUrl}/${id}`);
  }

  public replaceById(id: number, e: E): Observable<E> {
    return this.http.put<E>(`${this.baseUrl}/${id}`, e);
  }

  public updateById(id: number, patch: Operation[]): Observable<E> {
    let headers = new HttpHeaders();
    headers = headers.set(CONTENT_TYPE, JSON_PATCH);
    return this.http.patch<E>(`${this.baseUrl}/${id}`, patch, { headers });
  }

  public deleteById(id: number): Observable<E> {
    return this.http.delete<E>(`${this.baseUrl}/${id}`);
  }

}
