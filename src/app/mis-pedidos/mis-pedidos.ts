import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-pedidos.html',
  styleUrls: ['./mis-pedidos.css']
})
export class MisPedidosComponent implements OnInit {
  pedidos: any[] = [];
  error: string = '';

  // NUEVO: para el modal
  modalAbierto: boolean = false;
  pedidoSeleccionado: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'Usuario no autenticado.';
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get('http://127.0.0.1:8000/api/pedidos', { headers }).subscribe({
      next: (data: any) => this.pedidos = data,
      error: (err) => {
        this.error = 'No se pudieron cargar los pedidos.';
        console.error(err);
      }
    });
  }

  // Abrir modal con pedido seleccionado
  abrirModal(pedido: any) {
    this.pedidoSeleccionado = pedido;
    this.modalAbierto = true;

    // Guardar ID en localStorage por si luego deseas ir a seguimiento
    localStorage.setItem('pedidoId', pedido.id.toString());
  }

  // Cerrar modal
  cerrarModal() {
    this.modalAbierto = false;
    this.pedidoSeleccionado = null;
  }
}
