import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url = "http://localhost:5178/ToDo";
  private options: { headers: HttpHeaders; mode: RequestMode; } | undefined;


  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    // Başlıkları oluşturun
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Todo[]>(`${this.url}/GetProducts`, { headers: headers });
  }

  setTodos(todo: {title: string}): Observable<Todo>{
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    const options = {
      headers: headers,
      mode: 'no-cors' as RequestMode,
    };

    console.log(JSON.stringify(todo));

   return this.http.post<Todo>(`${this.url}/Create`, JSON.stringify(todo), options);
  }



  setToggleService(todo: {id:string; title: string; isCompleted:boolean}){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    const options = {
      headers: headers,
      mode: 'no-cors' as RequestMode,
    };
    console.log("setToggleService", JSON.stringify(todo));

    return this.http.post(`${this.url}/Update`, JSON.stringify(todo), options);
  }


  deleteService(id:string){

    console.log(id);  

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    
    const options = {
       headers: headers,
       mode: 'cors' as RequestMode,
    };

    console.log(`${this.url}/Delete?id=${id}`);
    return this.http.delete(`${this.url}/Delete?id=${id}`,options);
  }

}

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}
