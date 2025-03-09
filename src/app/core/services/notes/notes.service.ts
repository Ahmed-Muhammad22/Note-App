import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private httpClient: HttpClient) {}
  addNewNote(data: object): Observable<any> {
    return this.httpClient.post(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      data

    );
  }
  getUserNotes(): Observable<any> {
    return this.httpClient.get(`${environment.BASE_URL}/api/v1/notes`);
  }

  updateNotes(data:object , id:string): Observable<any>{
    return this.httpClient.put(
      `${environment.BASE_URL}/api/v1/notes/${id}`,data
    );
  }
  deleteNotes(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.BASE_URL}/api/v1/notes/${id}`
    );
  }

}
