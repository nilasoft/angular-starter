import {Property} from './auth.model';
import {Pageable} from './page.model';

export interface Post extends Property {

  title: string;

  body: string;

}

export interface PostFilter extends Pageable {

  search: string;

}
