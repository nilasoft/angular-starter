import {Injectable} from '@angular/core';
import {Resource} from '@nilasoft/data';
import {Observable} from 'rxjs';
import {ResourceClient} from './resource.client';

@Injectable()
export class ResourceService {

  public constructor(private client: ResourceClient) {
  }

  public create(file: File): Observable<Resource> {
    return this.client.createFile(file);
  }

  public replace(id: number, file: File): Observable<Resource> {
    return this.client.replaceFile(id, file);
  }

}
