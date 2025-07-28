import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-inventario',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterModule],
  templateUrl: './admin-inventario.html',
  styleUrls: ['./admin-inventario.css']
})
export class AdminInventarioComponent implements OnInit {
  productos: any[] = [];
  modalAbierto: boolean = false;
  productoSeleccionado: any = null;

  constructor(private http: HttpClient, private router: Router) {} // ✅ incluye Router aquí

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']); // protección
      return;
    }

    this.obtenerProductos();
  }

  obtenerProductos(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    this.http.get<any[]>('http://127.0.0.1:8000/api/productos', { headers }).subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al obtener productos:', err)
    });
  }

  abrirModal(producto: any): void {
    this.productoSeleccionado = { ...producto };
    this.modalAbierto = true;
  }

  abrirModalAgregar(): void {
    this.productoSeleccionado = {
      nombre: '',
      imagen: '',
      precio: 0,
      stock: 0,
      oferta: 0,
      categoria: '',
      descripcion: '',
    };
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.productoSeleccionado = null;
  }

  guardarCambios(): void {
    if (!this.productoSeleccionado) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    const producto = {
      ...this.productoSeleccionado,
      oferta: Number(this.productoSeleccionado.oferta),
      categoria: this.productoSeleccionado.categoria?.toLowerCase(),
    };

    if (producto.id !== undefined && producto.id !== null) {
      // 📝 EDITAR
      this.http.put(`http://127.0.0.1:8000/api/productos/${producto.id}`, producto, { headers }).subscribe({
        next: () => {
          this.obtenerProductos();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al guardar cambios:', err)
      });
    } else {
      // ➕ AGREGAR
      this.http.post(`http://127.0.0.1:8000/api/productos`, producto, { headers }).subscribe({
        next: () => {
          this.obtenerProductos();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al crear producto:', err)
      });
    }
  }

  eliminarProducto(id: number): void {
    const confirmar = confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmar) return;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    this.http.delete(`http://127.0.0.1:8000/api/productos/${id}`, { headers }).subscribe({
      next: () => this.obtenerProductos(),
      error: (err) => console.error('Error al eliminar producto:', err)
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}
