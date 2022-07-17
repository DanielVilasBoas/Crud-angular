import { ErrorDialogComponent } from './../../shared/components/error/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';
import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, Observable, of } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {


  courses$: Observable<Course[]>;
  //courses: Course[] = [];

  displayedColumns = ['name', 'category'];

  //coursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
    ) {
    //this.courses = [];
    //this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      }
      )
    );

    //this.coursesService.list().subscribe(courses => this.courses = courses);
   }

   onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
   }

  ngOnInit(): void {

  }

}
