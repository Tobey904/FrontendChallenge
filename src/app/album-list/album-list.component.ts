import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlbumsService } from '../albums.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListComponent implements OnInit {
  albums: any[] = [];
  filteredAlbums: any[] = [];
  searchTerm: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  // minPrice: number = 0;
  // maxPrice: number = 100;
  // minPriceLimit: number = 0;
  // maxPriceLimit: number = 100;
  fromDate: string = '';
  toDate: string = '';
  selectedCategory: string = '';
  categories: string[] = [];

  constructor(private router: Router, private albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe((response) => {
      this.albums = response.feed.entry;
      this.filteredAlbums = this.albums;
      this.extractCategories(); 
    });
  }


  // onSearchChange(): void {
  //   this.filterAlbums();
  // }

  // onPriceChange(): void {
  //   this.filterAlbums();
  // }

  goToSecondComponent(id: string): void {
    this.router.navigate(['/albums', id]);
  }

  onSearchChange(): void {
    this.filteredAlbums = this.albums.filter(album => {
      const nameMatch = album['im:name'].label.toLowerCase().includes(this.searchTerm.toLowerCase());
      const artistMatch = album['im:artist'].label.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Price filtering
      const price = parseFloat(album['im:price'].attributes.amount);
      const priceMatch = (!this.minPrice || price >= this.minPrice) &&
                         (!this.maxPrice || price <= this.maxPrice);
  
      // Date filtering
      const releaseDate = new Date(album['im:releaseDate'].label);
      const fromDateMatch = !this.fromDate || releaseDate >= new Date(this.fromDate);
      const toDateMatch = !this.toDate || releaseDate <= new Date(this.toDate);
  
      // Category filtering
      const categoryMatch = !this.selectedCategory || album.category.attributes.label === this.selectedCategory;
  
      // Use OR for nameMatch and artistMatch to allow filtering by either
      return (nameMatch || artistMatch) && priceMatch && fromDateMatch && toDateMatch && categoryMatch;
    });
  }

  // filterAlbums(): void {
  //   this.filteredAlbums = this.albums.filter(album => {
  //     const nameMatch = album['im:name'].label.toLowerCase().includes(this.searchTerm.toLowerCase());
  //     const artistMatch = album['im:artist'].label.toLowerCase().includes(this.searchTerm.toLowerCase());
      
  //     // Price filtering
  //     const price = parseFloat(album['im:price'].attributes.amount);
  //     const priceMatch = (!this.minPrice || price >= this.minPrice) &&
  //                        (!this.maxPrice || price <= this.maxPrice);

  //     const releaseDate = new Date(album['im:releaseDate'].label);
  //     const fromDateMatch = !this.fromDate || releaseDate >= new Date(this.fromDate);
  //     const toDateMatch = !this.toDate || releaseDate <= new Date(this.toDate);
                         
  //     // Category filtering
  //     const categoryMatch = !this.selectedCategory || album.category.attributes.label === this.selectedCategory;

  //     return (nameMatch || artistMatch) && priceMatch && fromDateMatch && toDateMatch && categoryMatch;
  //   });
  // }

  extractCategories(): void {
    this.categories = [...new Set(this.albums.map(album => album.category.attributes.label))];
  }
}
