import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseClient} from '@nilasoft/core';
import {User} from '@nilasoft/data';

@Injectable()
export class UserClient extends BaseClient<User> {

  public constructor(http: HttpClient) {
    super('/admin/users', http);
  }

}
