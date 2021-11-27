import {Injectable} from '@angular/core';
import {Page, Post} from '@nilasoft/data';
import {Observable} from 'rxjs';
import {PostClient} from './post.client';

@Injectable()
export class PostService {

  public constructor(private client: PostClient) {
  }

  public query(author: string, title: string): Observable<Page<Post>> {
    return this.client.query({
      type: 'and',
      restrictions: [
        {
          type: 'equal',
          x: {
            type: 'attribute',
            path: 'owner.username'
          },
          y: {
            type: 'literal',
            value: author
          }
        },
        {
          type: 'like',
          x: {
            type: 'attribute',
            path: 'title'
          },
          pattern: {
            type: 'literal',
            value: `%${title}%`
          }
        }
      ]
    });
  }

}
