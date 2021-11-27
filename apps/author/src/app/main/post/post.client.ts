import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseClient} from '@nilasoft/core';
import {Post} from '@nilasoft/data';

@Injectable()
export class PostClient extends BaseClient<Post> {

  public constructor(http: HttpClient) {
    super('/author/posts', http);
  }

}
