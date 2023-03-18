import { Component, OnInit } from '@angular/core';
declare var $: any;
import { Category } from './category';
import { ArticleService } from './article.service';
import { CookieService } from 'ngx-cookie-service';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { NavbarService } from './navbar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  categories: Category[];
  darkMode: boolean;
  isMobileNavOpen: boolean = false;

  //icons
  faFacebook = faFacebook; faTwitter = faTwitter; faInstagram = faInstagram;

  constructor(private articleservice: ArticleService, private cookieService: CookieService) {
    // Load the user's dark mode preference from cookies
    this.darkMode = this.cookieService.get('darkMode') === 'true';
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    // Save the user's dark mode preference to cookies
    this.cookieService.set('darkMode', this.darkMode.toString());
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
