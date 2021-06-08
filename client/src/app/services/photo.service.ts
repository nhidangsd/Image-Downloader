import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Photo} from '../Photo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiUrl = '/api/images';
  // private apiUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY'
  photos: Photo[] = [];
  constructor(private http:HttpClient) { }

  getPhotos() : Observable <Photo[]> {

    return this.http.get<Photo[]>(this.apiUrl)
      .pipe(map(res => {
        console.log(res)
        return res['photos']
      })); 
  }


}
