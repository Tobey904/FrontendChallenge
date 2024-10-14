import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

export const routes: Routes = [
    { path: 'first-component', component: AlbumListComponent },
    { path: 'second-component/:id', component: AlbumDetailComponent },
  //   { path: '', redirectTo: 'first-component', pathMatch: 'full' }, // Przekierowanie domyślne na pierwszą stronę
  { path: '**', redirectTo: 'first-component' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}