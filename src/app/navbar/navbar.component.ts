import { Component } from '@angular/core';
import { Category } from '../models/category';
import { ArticleService } from '../services/article.service';
import { CookieService } from 'ngx-cookie-service';
import { NavbarService } from '../services/navbar.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categories: Category[];
  darkMode: boolean;

  showCategories: boolean = false;
  activeCategory: number;

  constructor(private articleservice: ArticleService,
    private cookieService: CookieService,
    public nav: NavbarService,
    private router: Router,
    private route: ActivatedRoute) {
    this.darkMode = cookieService.get('darkMode') === 'true';
    document.body.classList.toggle('dark', this.darkMode);

  }

  ngOnInit() {
    this.getAllCategories();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeCategory = Number(this.route.snapshot.queryParamMap.get('categoryId'));
        if (this.route.snapshot.queryParamMap.get('page')) {
          this.activeCategory = -999;
        }
        this.showCategories = false;
      }
    });
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;

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
