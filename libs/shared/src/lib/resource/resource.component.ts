import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AsyncStatus} from '@nilasoft/core';
import {Resource} from '@nilasoft/data';
import _ from 'lodash';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {OnChange, OnTouched} from './resource.model';
import {ResourceService} from './resource.service';

@Component({
  selector: 'nilasoft-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResourceComponent),
      multi: true
    }
  ]
})
export class ResourceComponent implements OnInit, ControlValueAccessor {

  @ViewChild('ref')
  public ref: ElementRef<HTMLInputElement>;

  @Input()
  public label: string;

  @Input()
  public type: string;

  public disabled: boolean;

  public resource: Resource;

  public status: AsyncStatus;

  private onChange: OnChange;

  private onTouched: OnTouched;

  public constructor(private service: ResourceService) {
  }

  public ngOnInit(): void {
  }

  public writeValue(resource: Resource): void {
    this.resource = resource;
    if (typeof this.onChange === 'function')
      this.onChange(resource);
  }

  public registerOnChange(onChange: OnChange): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: OnTouched): void {
    this.onTouched = onTouched;
  }

  public setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  public onClick(): void {
    this.ref.nativeElement.click();
    this.onTouched();
  }

  public onSelect(): void {
    const file = _.head(this.ref.nativeElement.files);
    this.status = 'request';
    this.upload(file)
      .pipe(delay(3000))
      .subscribe(resource => {
        this.writeValue(resource);
        this.status = 'success';
      }, () => this.status = 'failure');
  }

  private upload(file: File): Observable<Resource> {
    return this.resource ?
      this.service.replace(this.resource.id, file) :
      this.service.create(file);
  }

}
