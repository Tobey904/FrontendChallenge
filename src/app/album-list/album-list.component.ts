import { Component, OnInit } from '@angular/core'
import { AlbumsService } from '../albums.service'
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
selector: 'app-first',
standalone: true,
imports: [CommonModule],
templateUrl: './album-list.component.html',
styleUrls: ['./album-list.component.scss'],
})

export class AlbumListComponent implements OnInit {
  albums: any[] = [];

  constructor(private router: Router, private albumsService: AlbumsService) {}

  ngOnInit(): void {
    // Fetch the albums data using the service
    this.albumsService.getAlbums().subscribe((response) => {
      this.albums = response.feed.entry; // Adjust based on the API response
    });
  }

  goToSecondComponent(id: string): void {
    this.router.navigate(['/second-component', id]);
  }
}