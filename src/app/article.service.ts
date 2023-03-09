import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article';
import { Category } from './category';
import { ArticleWithBody } from './article_body';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public baseUrl = 'http://192.168.0.2:8080'

  constructor(private http: HttpClient) { }


  // Article methods

  public getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/article/all`);
  }

  public getArticlesByCategoryId(category: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/article/category/${category}`);
  }

  public getArticleById(id: number): Observable<ArticleWithBody> {
    return this.http.get<ArticleWithBody>(`${this.baseUrl}/article/${id}`);
  }

  public createArticle(article: Article): void {
    this.http.post<Article>(`${this.baseUrl}/article/add`, article);
  }

  public updateArticle(article: Article): void {
    this.http.put<Article>(`${this.baseUrl}/article/update`, article);
  }

  public deleteArticle(id: number): void {
    this.http.delete<Article>(`${this.baseUrl}/article/delete/${id}`);
  }

  // Category methods

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category/all`);
  }

  public getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/${id}`);
  }
}
