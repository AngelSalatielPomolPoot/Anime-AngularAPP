import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuardGuard } from './user-guard.guard';
import { UserGuard2Guard } from './user-guard2.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/auth/login',
    pathMatch:'full',
  },
  { 
    path: 'auth',canActivate:[UserGuard2Guard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'home',canActivate:[UserGuardGuard],
    loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) 
  },
  { path: 'anime-lista',canActivate:[UserGuardGuard],
   loadChildren: () => import('./components/pages/animes/anime-lista/anime-lista.module').then(m => m.AnimeListaModule) 
  },
  { 
    path: 'anime-details/:id/:query/:page',canActivate:[UserGuardGuard], loadChildren: () => import('./components/pages/animes/anime-details/anime-details.module').then(m => m.AnimeDetailsModule) 
  },
  { 
    path: 'personaje-lista',canActivate:[UserGuardGuard], loadChildren: () => import('./components/pages/personajes/personaje-lista/personaje-lista.module').then(m => m.PersonajeListaModule) },
  {
    path: 'personaje-details',canActivate:[UserGuardGuard], loadChildren: () => import('./components/pages/personajes/personaje-details/personaje-details.module').then(m => m.PersonajeDetailsModule) 
  },
  { 
    path: 'top-anime',canActivate:[UserGuardGuard], loadChildren: () => import('./components/pages/top/top-anime/top-anime.module').then(m => m.TopAnimeModule) 
  },
  { path: 'lista-manga',canActivate:[UserGuardGuard], loadChildren: () => import('./components/pages/manga/lista-manga/lista-manga.module').then(m => m.ListaMangaModule) },
  { 
    path: 'manga-details/:id/:query',canActivate:[UserGuardGuard], loadChildren: () => import('./components/pages/manga/manga-details/manga-details.module').then(m => m.MangaDetailsModule) 
  },
  { path: 'Error-404',canActivate:[UserGuardGuard], loadChildren: () => import('./components/pages/notFound/not-found-page/not-found-page.module').then(m => m.NotFoundPageModule) },
  { 
    path: '**', redirectTo:'/Error-404'  //pagina no encontrada
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
