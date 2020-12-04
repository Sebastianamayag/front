import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public registerGroup: FormGroup;
  rolValues = ['estudiante', 'profesor'];
  constructor(private builder: FormBuilder,
              private usuario: UserService,
              private router: Router,) {   }

  ngOnInit(): void {
    document.body.classList.add('bg-gradient-regiter');
    // configuracion login
    this.registerGroup = this.builder.group( {
      nombre: [ { value: '', disabled: false }, [ Validators.required ] ],
      usuario: [ { value: '', disabled: false }, [ Validators.required ] ],
      contraseña: [ { value: '', disabled: false }, [ Validators.required ] ],
      repetirContraseña: [ { value: '', disabled: false }, [ Validators.required ] ],
      rol: [{ value: '', disabled: false }, [Validators.required]]
    });
  }
  doRegister():void{
    //validar formulario 
    if ( this.registerGroup.invalid ) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    //validar contraseñas iguales
    }else if(this.registerGroup.get('contraseña').value!=this.registerGroup.get('repetirContraseña').value){
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    //validar el tamaño de la contraseña
    }else if(this.registerGroup.get('contraseña').value.length <8){
      Swal.fire({
        title: 'Error',
        text: 'Las contraseña debe tener más de 8 caracteres',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }else{
      this.usuario.registerUser({
        nombre:this.registerGroup.get('nombre').value,
        usuario:this.registerGroup.get('usuario').value,
        contraseña:this.registerGroup.get('contraseña').value,
        tipousuario:this.registerGroup.get('rol').value
      }).subscribe(response=>{
        Swal.fire({
          title: 'Bienvenido',
          text: "Usuario creado correctamente",
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.router.navigate( [ '' ] );
      },error=>{
        console.log(error);
        Swal.fire( {
          title: 'Ups! Hubo un error inesperado.',
          text: error.error.error,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Aceptar'
        } );
      })
    }
    
  }
  radioCambioRol(rol: string) {
    this.rol.setValue(rol);
    console.log(this.rol.value);
  }
  get rol() {
    return this.registerGroup.get('rol');
}
}
