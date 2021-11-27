import {Pipe, PipeTransform} from '@angular/core';
import {Resource} from '@nilasoft/data';
import {Observable, of} from 'rxjs';
import {ResourceClient} from './resource.client';

@Pipe({
  name: 'resource'
})
export class ResourcePipe implements PipeTransform {

  public constructor(private client: ResourceClient) {
  }

  public transform(resource: Resource): Observable<Resource> {
    return resource ? this.client.findById(resource.id) : of(null);
  }

}
