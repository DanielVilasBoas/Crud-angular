import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API ='/assets/cursos.json'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(), //como o servidor não é de straming, estamos mais interessados na primeira informação que o servidor enviar, depois encerra a conexão
      delay(5000),
      tap( courses => console.log(courses))
    );
  }
}
