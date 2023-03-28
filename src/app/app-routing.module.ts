import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomePageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminpageComponent } from './adminpage/adminpage.component';



const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'articles/category', component: ArticlesComponent },
  { path: 'articles/article/:id', component: ArticleComponent },
  { path: 'adminpage', component: AdminpageComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
