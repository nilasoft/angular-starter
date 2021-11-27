import {AuthFeature} from '@nilasoft/auth';
import {BaseState} from '@nilasoft/core';
import {PostState} from './main/post/post.model';
import {ProfileState} from './main/profile/profile.model';

export interface AppState extends BaseState, AuthFeature {

  post: PostState;

  profile: ProfileState;

}
