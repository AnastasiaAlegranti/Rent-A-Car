import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactUsMessageModel } from '../models/ContactUsMessageModel';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
    
    public constructor(private http: HttpClient) { }

    public addContactUsMessage(contactUsMessageModel: ContactUsMessageModel): Observable<ContactUsMessageModel> {
      return this.http.post<ContactUsMessageModel>(baseUrl+"contact-us", contactUsMessageModel);
    }
}
