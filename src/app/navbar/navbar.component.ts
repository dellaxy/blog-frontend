import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { ArticleService } from '../services/article.service';
import { CookieService } from 'ngx-cookie-service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categories: Category[];
  darkMode: boolean;

  isMobileNavOpen: boolean = false;
  showCategories: boolean = false;

  constructor(private articleservice: ArticleService, private cookieService: CookieService, public nav: NavbarService) {
    this.darkMode = cookieService.get('darkMode') === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  ngOnInit() {
    this.getAllCategories();
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }
  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.cookieService.set('darkMode', this.darkMode.toString());
    document.body.classList.toggle('dark', this.darkMode);
  }

  getAllCategories() {
    this.articleservice.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      }
    );
  }

}
