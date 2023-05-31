import { Injectable } from '@angular/core';
import { IUser } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | null;
  private token: string | null;

  constructor() {
  }

  getUser(): IUser | null {
    return this.user;
  };

  setUser(user: IUser) {
    return this.user = user;
  };

  setToken(token: string): void {
    this.token = token;
    window.localStorage.setItem('token', token);
  }

  setToStore(token: string): void {
    window.localStorage.setItem('userToken', token);
  }

  getToken(): string | null {
    return this.token || window.localStorage.getItem('token');
  }

  removeUser(): void {
    this.user = null;
    this.token = null;
  }
}
