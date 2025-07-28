import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<any[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {
    const guardado = localStorage.getItem('carrito');
    const carritoInicial = guardado ? JSON.parse(guardado) : [];
    this.carritoSubject.next(carritoInicial);
  }

  // Devuelve el contenido actual del carrito
  obtenerCarrito(): any[] {
    return this.carritoSubject.value;
  }

  // Calcula el total del carrito
  obtenerTotal(): number {
    return this.obtenerCarrito()
      .reduce((sum, item) => sum + item.precio * (item.cantidad || 1), 0);
  }

  // Agrega un nuevo producto al carrito
  agregar(producto: any) {
    const productoFormateado = {
      ...producto,
      cantidad: 1,
      precio: Number(producto.precio)
    };

    const carritoActual = [...this.obtenerCarrito(), productoFormateado];
    this.actualizarCarrito(carritoActual);
  }

  // Elimina un producto del carrito
  eliminar(item: any) {
    const carritoActual = this.obtenerCarrito().filter(i => i !== item);
    this.actualizarCarrito(carritoActual);
  }

  // Actualiza la cantidad de un producto específico por ID
  actualizarCantidad(id: number, cantidad: number) {
    const actualizado = this.obtenerCarrito().map(item =>
      item.id === id ? { ...item, cantidad: Number(cantidad) } : item
    );
    this.actualizarCarrito(actualizado);
  }

  // Vacía completamente el carrito
  vaciar() {
    this.actualizarCarrito([]);
  }

  // Internamente actualiza el carrito y sincroniza con localStorage
  private actualizarCarrito(carrito: any[]) {
    this.carritoSubject.next(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
}
