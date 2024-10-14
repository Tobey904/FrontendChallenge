import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from './album.interface'; // Import the Album interface

@Injectable({
 providedIn: 'root',
})
export class AlbumsService {
 private baseUrl = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

constructor(private http: HttpClient) {}

// getAlbums(): Observable<Album[]> {
//  return this.http.get<Album[]>(this.baseUrl);

//  }
getAlbums(): Observable<any> { // Change return type to any
    return this.http.get<any>(this.baseUrl);
  }
}
