import { Injectable } from '@angular/core';
import { I18n } from '../../model/i18n';
export const LOGIN_FORM_USERDATA = 'LOGIN_FORM_USERDATA';
export const I18N_DATA = 'I18N_DATA';
export const TO_CLONE_DATA = 'TO_CLONE_DATA';
export const USER_DATA_FOR_FORCE_CHANGE_PASSWORD = 'USER_DATA_FOR_FORCE_CHANGE_PASSWORD';

@Injectable()
export class LocalStorageService {
  private tokenKey = 'jwt_token';
  
  constructor() { }

  setTokenKey(tokenKey){
    this.tokenKey = tokenKey;
  }

  cleanTokenData(){
    localStorage.removeItem(this.tokenKey);
  }

  saveTokenData(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getTokenData(): string {
    return localStorage.getItem(this.tokenKey);
  }

  cleanLoginFormUserData() {
    localStorage.removeItem(LOGIN_FORM_USERDATA);
  }

  saveLoginFormUserData(user: {username, password}) {
    localStorage.setItem(LOGIN_FORM_USERDATA, JSON.stringify(user));
  }
  getLoginFormUserData(): {username, password} {
    return JSON.parse(localStorage.getItem(LOGIN_FORM_USERDATA));
  }

  cleanUserDataForForceChangePassword() {
    localStorage.removeItem(USER_DATA_FOR_FORCE_CHANGE_PASSWORD);
  }

  saveUserDataForForceChangePassword(user: {username, password}) {
    localStorage.setItem(USER_DATA_FOR_FORCE_CHANGE_PASSWORD, JSON.stringify(user));
  }

  getUserDataForForceChangePassword(): { username,  password} {
    return JSON.parse(localStorage.getItem(USER_DATA_FOR_FORCE_CHANGE_PASSWORD));
  }

  cleanI18nData() {
    localStorage.removeItem(I18N_DATA);
  }

  saveI18nData(i18n: I18n[]) {
    localStorage.setItem(I18N_DATA, JSON.stringify(i18n));
  }

  getI18nData(): I18n[] {
    return JSON.parse(localStorage.getItem(I18N_DATA));
  }

  cleanUserSession() {
    this.cleanUserDataForForceChangePassword();
    this.cleanTokenData();
    this.cleanI18nData();
  }

  clone(obj): any {
    localStorage.setItem(TO_CLONE_DATA, JSON.stringify(obj));
    const cloneObj = JSON.parse(localStorage.getItem(TO_CLONE_DATA));
    localStorage.removeItem(TO_CLONE_DATA);
    return cloneObj;
  }

  save(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}
