import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { OfertaComponent } from './ofertas/ofertas.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CategoriaHMComponent } from './categoria-HM/categoria-HM.component';
import { SeguimientoComponent } from './seguimiento/seguimiento';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos';
import { AdminInventarioComponent } from './admin-inventario/admin-inventario.component';
import { CambiarEstadoComponent } from './cambiar-estado/cambiar-estado.component';
import { CorreoFormComponent } from './correo/correo.component';
import { CorreoService } from './services/correo.service';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'categoria/:tipo', component: CategoriaHMComponent },  
  {path : 'seguimiento', component: SeguimientoComponent},
  {path : 'mis-pedidos', component: MisPedidosComponent},
  {path: 'admin-inventario', component: AdminInventarioComponent },
  {path: 'cambiar-estado', component: CambiarEstadoComponent },
  {path: 'correo', component: CorreoFormComponent },
  {path: 'correo-form', component: CorreoFormComponent, providers: [CorreoService] } // Aseguramos que el servicio esté disponible en esta ruta
];
