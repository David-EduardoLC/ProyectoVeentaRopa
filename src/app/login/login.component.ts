import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  hidePassword = true;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        console.log('ROL recibido:', res.user?.rol);
        console.log('NAME recibido:', res.user?.name);

        // Guardar en localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.user?.rol || '');
        localStorage.setItem('name', res.user?.name || '');

        // Normalizar el rol y redirigir
        const userRol = res.user?.rol?.trim().toLowerCase();
        if (userRol === 'admin') {
          this.router.navigate(['/admin-inventario']);
        } else {
          this.router.navigate(['/inicio']);
        }
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.error = 'Correo o contraseña inválidos';
      }
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
