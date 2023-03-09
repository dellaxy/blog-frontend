import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomePageComponent } from './homepage/homepage.component';



const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'articles/category', component: ArticlesComponent },
  { path: 'articles/article/:id', component: ArticleComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
