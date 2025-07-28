import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cambiar-estado',
  standalone: true,
  templateUrl: './cambiar-estado.html',
  styleUrls: ['./cambiar-estado.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class CambiarEstadoComponent implements OnInit {
  pedidoId: number = 0;
  nuevoEstado: string = 'preparacion';
  mensaje: string = '';

  constructor(private http: HttpClient, private router: Router) {} // ✅ inyectamos Router

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  actualizarEstado(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.mensaje = 'Token no encontrado.';
      return;
    }

    this.http.put(
      `http://127.0.0.1:8000/api/pedidos/${this.pedidoId}/estado`,
      { estado: this.nuevoEstado },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      }
    ).subscribe({
      next: () => {
        this.mensaje = '✅ Estado actualizado correctamente';
      },
      error: (err) => {
        this.mensaje = '❌ Error al actualizar: ' + (err.error?.message || 'Error desconocido');
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}
