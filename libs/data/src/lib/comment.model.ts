import {Pageable, Post, Property} from '@nilasoft/data';

export interface Comment extends Property {

  post: Post;

  body: string;

}

export interface CommentFilter extends Pageable {

  search: string;

  postId: number;

}
