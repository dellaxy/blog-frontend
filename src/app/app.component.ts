import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { ArticleService } from './article.service';
import { CookieService } from 'ngx-cookie-service';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  categories: Category[];
  darkMode: boolean;
  isMobileNavOpen: boolean = false;

  faFacebook = faFacebook; faTwitter = faTwitter; faInstagram = faInstagram;

  constructor(private articleservice: ArticleService, private cookieService: CookieService) {
    this.darkMode = this.cookieService.get('darkMode') === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.cookieService.set('darkMode', this.darkMode.toString());
    document.body.classList.toggle('dark', this.darkMode);
  }

  ngOnInit() {
    this.getAllCategories();

  }

  getAllCategories() {
    this.articleservice.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      }
    );
  }

}
