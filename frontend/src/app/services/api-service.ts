import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   private apiurl = 'http://localhost:8000/api';
   private roleKey = 'userRole';

  constructor(@Inject(HttpClient) private http: HttpClient,  private router: Router) { }

  getList() : Observable<any> {
    return this.http.get(this.apiurl + '/employees/');
  }
  getDetail(id: any) : Observable<any> {
    return this.http.get(this.apiurl + '/details/' + id);
  }
  addEmployee(data: any): Observable<any> {
    return this.http.post(this.apiurl + '/add/', data);
  }
 editEmployee(data: any, id: any): Observable<any> {
    return this.http.put(this.apiurl + '/update/' + id , data);
  }
  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(this.apiurl + '/delete/' + id);
  }

  signup(data: any): Observable<any> {
    return this.http.post(this.apiurl + '/signup/', data);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.apiurl + '/login/', data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  setRole(role: string){
  localStorage.setItem(this.roleKey, role);}

  getRole(): string | null{
    return localStorage.getItem(this.roleKey);
  }
  isAdmin(): boolean {
    return this.getRole()=== 'admin';
  }

  isSubAdmin(): boolean {
    return this.getRole() === 'subadmin';
  }
}
