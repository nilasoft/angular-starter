import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseClient} from '@nilasoft/core';
import {Profile} from '@nilasoft/data';

@Injectable()
export class ProfileClient extends BaseClient<Profile> {

  public constructor(http: HttpClient) {
    super('/author/profiles', http);
  }

}
