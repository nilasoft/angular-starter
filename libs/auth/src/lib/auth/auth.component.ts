import {Component, Inject, OnInit} from '@angular/core';
import {AUTH_CONFIG} from '../auth.constant';
import {AuthConfig} from '../auth.model';

@Component({
  selector: 'nilasoft-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public constructor(@Inject(AUTH_CONFIG)
                     public config: AuthConfig) {
  }

  public ngOnInit(): void {
  }

}
