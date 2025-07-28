import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private rickUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  // ✅ Modificado: acepta número de página como argumento
  getCharacters(pagina: number = 1): Observable<any> {
    return this.http.get<any>(`${this.rickUrl}?page=${pagina}`);
  }
}
