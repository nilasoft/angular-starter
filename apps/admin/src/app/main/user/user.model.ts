import {AsyncState} from '@nilasoft/core';
import {Page, User} from '@nilasoft/data';

export interface UserState {

  list: AsyncState<Page<User>>;

  item: AsyncState<User>;

}
