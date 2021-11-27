import {Property} from './auth.model';

export interface Resource extends Property {

  name: string;

  type: string;

  hash: string;

  width: number;

  height: number;

  uri: string;

}
