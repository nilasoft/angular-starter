import {AsyncState} from '@nilasoft/core';
import {Page, Post} from '@nilasoft/data';

export interface PostState {

  list: AsyncState<Page<Post>>;

}
