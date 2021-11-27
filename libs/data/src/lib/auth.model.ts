import {BaseEntity} from './core.model';

export interface Property extends BaseEntity {

  owner: User;

}

export interface User extends BaseEntity {

  role: Role;

  username: string;

  password: string;

  status: UserStatus;

}

export enum Role {

  ADMIN = 'ADMIN',

  AUTHOR = 'AUTHOR',

  USER = 'USER'

}

export enum UserStatus {

  ACTIVE = 'ACTIVE',

  INACTIVE = 'INACTIVE',

  SUSPENDED = 'SUSPENDED',

  DELETED = 'DELETED'

}

export interface RegisterRequest {

  email: string;

  username: string;

  password: string;

  captcha: string;

}

export interface LoginRequest {

  username: string;

  password: string;

  captcha: string;

}

export interface Authorization {

  authorization: string;

}
