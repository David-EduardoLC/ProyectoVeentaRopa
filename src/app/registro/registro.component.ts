import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  mensaje = '';
mostrarPassword = false;

toggleMostrarPassword() {
  this.mostrarPassword = !this.mostrarPassword;
}

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    if (!this.nombre || !this.email || !this.password) {
      this.mensaje = 'Completa todos los campos';
      return;
    }

    const nuevoUsuario = {
      name: this.nombre,
      email: this.email,
      password: this.password,
    };

    this.http.post('http://127.0.0.1:8000/api/register', nuevoUsuario)

      .subscribe({
        next: () => {
          this.mensaje = '¡Registro exitoso! Redirigiendo...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: err => {
          this.mensaje = 'Error al registrar: ' + err.error.message;
        }
      });
  }
}
