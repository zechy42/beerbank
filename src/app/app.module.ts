import { BeerService } from './beer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatInputModule, MatCardMdImage, MatCardModule, MatIconModule } from '@angular/material';
import { FavoriteComponent } from './favorite/favorite.component';
import { LowerHeaderComponent } from './lower-header/lower-header.component';
import { FormsModule } from '@angular/forms';
import { BeerListComponent } from './beer-list/beer-list.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FavoriteComponent,
    LowerHeaderComponent,
    BeerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [BeerService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
