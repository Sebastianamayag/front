import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserModel } from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private coockies:CookieService) {  }
  registerUser( body: { nombre: string, contraseña: string, usuario: string, tipousuario: string } ): Observable<UserModel> {
    return this.http.post<UserModel>( `${ environment.root_api }${ environment.endpoints.create_user }`, body );
  }

  loginUser( body: any ): Observable<any> {
    return this.http.post<any>( `${ environment.root_api }${ environment.endpoints.login_user }`, body );
  }
  setToken(token: string) {
    this.coockies.set("token", token);
  }
  getToken(){
    return this.coockies.get("token");
  }
  getUserLogged(){
    const token=this.getToken();
    return token;
  }
  logOut(){
    this.coockies.deleteAll();
  }
}
