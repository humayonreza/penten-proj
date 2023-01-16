import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';

import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    ReactiveFormsModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SlickCarouselModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent,
        },
      ],
      { onSameUrlNavigation: 'reload' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
