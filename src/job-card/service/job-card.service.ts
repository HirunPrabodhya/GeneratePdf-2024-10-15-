import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IJobCard } from '../model/JobCard';

@Injectable({
  providedIn: 'root'
})
export class JobCardService {
  private baseUrl:string = 'ProductionPlan.json';
  private http:HttpClient = inject(HttpClient);
  getAllJobCard():Observable<IJobCard[]>{
    return this.http.get<IJobCard[]>(this.baseUrl);            
  }
  
}
