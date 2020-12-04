import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;
  constructor(private builder: FormBuilder,
              private usuario: UserService,
              private router: Router,) {   }

  ngOnInit(): void {
    document.body.classList.add('bg-gradient-login');
    // configuracion login
    this.loginGroup = this.builder.group( {
      usuario: [ { value: '', disabled: false }, [ Validators.required ] ],
      contraseña: [ { value: '', disabled: false }, [ Validators.required ] ]
    });
  }
  public doLogin(): void {

    //validar formulario 
    if ( this.loginGroup.invalid ) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    this.usuario.loginUser({
      usuario:this.loginGroup.get('usuario').value,
      contraseña:this.loginGroup.get('contraseña').value
    }).subscribe(response=>{
      console.log(response);
      this.usuario.setToken(response.token);
      this.router.navigate( [ '/chat',response.success.nombre+'&&'+response.success.tipousuario ] )
    },error=>{
      Swal.fire( {
        title: 'Ups! Hubo un error inesperado.',
        text: error.error.error,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
      } );
    });
  }
}
