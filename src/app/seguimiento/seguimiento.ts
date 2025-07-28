import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seguimiento.html',
  styleUrls: ['./seguimiento.css']
})
export class SeguimientoComponent implements OnInit {
  pedido: any = null;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const pedidoId = localStorage.getItem('pedidoId');
    const token = localStorage.getItem('token');

    if (!pedidoId || !token) {
      this.error = 'No se encontró el ID del pedido o el token.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get(`http://127.0.0.1:8000/api/pedidos/${pedidoId}`, { headers }).subscribe({
      next: (data) => this.pedido = data,
      error: (err) => {
        this.error = 'No se pudo cargar el pedido.';
        console.error(err);
      }
    });
  }
}
