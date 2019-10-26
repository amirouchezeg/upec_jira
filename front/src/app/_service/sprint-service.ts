import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable } from 'rxjs';


@Injectable()
export class SprintService {
  readonly rootUrl = 'http://localhost:35257';
  constructor(private http: HttpClient) { }


}