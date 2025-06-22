import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {} // ADICIONAR ISSO!

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login() {
    if (this.loginForm.valid) {
      console.log('Formulário enviado!');
      console.log('Valores:', this.loginForm.value);
      this.router.navigate(['/home']); // redireciona para a página home
    } else {
      console.log('Formulário inválido. Por favor, preencha todos os campos.');
      this.loginForm.markAllAsTouched();
    }
  }
}
