import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material-module';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomePageComponent } from './homepage/homepage.component'
import { EditorModule } from '@tinymce/tinymce-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { FormsModule } from '@angular/forms'; // Import the ReactiveFormsModule



@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlesComponent,
    HomePageComponent,
    PagenotfoundComponent,
    AdminpageComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    EditorModule,
    FontAwesomeModule,
    FormsModule

  ]
})
export class AppModule {
}


