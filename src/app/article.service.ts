import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Article } from './article';
import { Category } from './category';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { ArticlePost } from './articlepost';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // Article methods

  public getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/article/all`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public getArticlesByCategoryId(category: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/article/category/${category}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/article/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public createArticle(article: ArticlePost): Observable<ArticlePost> {
    return this.http.post<ArticlePost>(`${this.baseUrl}/article/add`, article).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public updateArticle(article: ArticlePost): Observable<ArticlePost> {
    return this.http.put<ArticlePost>(`${this.baseUrl}/article/update`, article).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(`${this.baseUrl}/article/delete/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Category methods

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category/all`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    } else {
      console.error(error);
    }
    //this.router.navigate(['/notfound']); // navigate to the error page
    return throwError(error);
  }
}