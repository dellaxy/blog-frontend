import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { Title } from "@angular/platform-browser"

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']

})

export class HomePageComponent implements OnInit {

  articles: Article[];

  isLoaded: boolean = false;

  constructor(private articleservice: ArticleService, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle("Coffe Blog - Homepage");
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getAllArticles();
    });
  }

  getAllArticles() {
    this.articleservice.getAllArticles().subscribe(
      (response: Article[]) => {
        this.articles = response;
        this.isLoaded = true;
      }
    );
  }



}


