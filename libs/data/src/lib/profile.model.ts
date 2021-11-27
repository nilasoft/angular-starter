import {Property} from './auth.model';
import {Resource} from './resource.model';

export interface Profile extends Property {

  firstName: string;

  lastName: string;

  avatar: Resource;

}
