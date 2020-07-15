import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, runGuardsAndResolvers: 'always'},
  {path: 'favorites', component: FavoriteComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
