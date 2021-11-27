import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseClient, toParams} from '@nilasoft/core';
import {Page, Post, PostFilter} from '@nilasoft/data';
import {Observable} from 'rxjs';

@Injectable()
export class PostClient extends BaseClient<Post> {

  public constructor(http: HttpClient) {
    super('/user/posts', http);
  }

  public filter(filter: Partial<PostFilter>): Observable<Page<Post>> {
    const params = toParams(filter);
    return this.http.get<Page<Post>>(`${this.baseUrl}/filter`, {params});
  }

}
