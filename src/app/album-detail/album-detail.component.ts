import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./album-detail.component.scss'],
})
export class AlbumDetailComponent implements OnInit {
  albumId!: string;
  albumDetails: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Pobierz id z trasy
    this.albumId = this.route.snapshot.paramMap.get('id')!;
    
    // Wywołaj API iTunes aby uzyskać szczegóły albumu
    this.http.get('/lookup?id=' + this.albumId + '&entity=song')
      .subscribe(data => {
        this.albumDetails = data;
        //console.log(this.albumDetails); // Wyświetl szczegóły albumu w konsoli
      });
  }
}
