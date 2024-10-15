import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

export const routes: Routes = [
    { path: 'albums', component: AlbumListComponent },
    { path: 'albums/:id', component: AlbumDetailComponent },
     //{ path: '', redirectTo: 'albums', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'albums' },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}