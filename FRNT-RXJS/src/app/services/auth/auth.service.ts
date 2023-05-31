import { Injectable } from '@angular/core';
import { IUser } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersStorage: IUser[] = [];

  constructor() {
  }

  checkUser(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    const isUserLocalStorage = localStorage.getItem('userLogin:' + `${user.login}`);
    let userInStore: IUser = <IUser>{};
    if (isUserLocalStorage) {
      userInStore = JSON.parse(isUserLocalStorage);
    }
    if (isUserExists) {
      return isUserExists.psw === user.psw
    } else if (userInStore) {
      return userInStore.psw === user.psw
    }
    return false;
  }

  setUser(user: IUser): void {
    const isUserExits = this.usersStorage.find((el) => el.login === user.login);
    if (!isUserExits && user?.login) {
      this.usersStorage.push(user);
    }
  }

  isUserExists(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    return !!isUserExists;
  }
}
