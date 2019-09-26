import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  @ViewChild('alertOk', { static: true }) alertOk: ElementRef;
  @ViewChild('alertError', { static: true }) alertError: ElementRef;

  isLoading: boolean = false;
  registerForm: FormGroup;
  submitted = false;

  constructor(private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder, public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  // para acceder facilmente a los controles del form
  get f() { return this.registerForm.controls; }

  onRegistrar() {
    this.submitted = true;

    // si es invalido nada
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    // form valido
    this.autenticacionService.register(this.registerForm.value.email, this.registerForm.value.password)
      .then((result) => {
        this.isLoading = false;
        // save user on firestore
        this.firebaseService.addUser(this.registerForm.value.email)
          .then(result => {
            console.log("insert user");
          });
        this.onReset();
        this.mostrarAlert(true);
      }).catch((error) => {
        this.isLoading = false;
        this.onReset();
        this.mostrarAlert(false);
        console.info(error);
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  mostrarAlert(bool: boolean) {
    if (bool)
      this.alertOk.nativeElement.classList.remove('d-none');
    else
      this.alertError.nativeElement.classList.remove('d-none');
  }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
