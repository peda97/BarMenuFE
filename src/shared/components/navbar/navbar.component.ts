import { Component, OnInit } from '@angular/core';
import { NavbarMenu } from 'src/app/models/navbar-menu.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nuis!: string;
  businessName!: string;
  navbarMenu: NavbarMenu[] = [];
  isVisiblePage: boolean = false;
  
  constructor(private categoriesService: CategoriesService){

  }
  ngOnInit(): void {
    this.getCategory();
  }

  /**
 * Get category
 */
  getCategory(){
    this.categoriesService.getAllCategories().subscribe({
      next: (result) => {
        if(result){
          this.nuis = result.nuis;
          this.businessName = result.businessName;
          result.categories.forEach((_)=>{
            this.navbarMenu.push({
              name: this.modifyNavbarName(_.name),
              link: '/category/' + this.categoriesService.modifyLinkName(_.name)
            })
            });
            this.isVisiblePage = true;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  /**
 * Remove & and / from a string.
 */
  private modifyNavbarName(categoryName: string): string{
    if(categoryName.includes('&'))
      return categoryName.split(' ').join('').split('&').join(' & ').toUpperCase();
    else if(categoryName.includes('/'))
      return categoryName.split('/').join(' &').toUpperCase();
    return categoryName.toUpperCase();
  }

   /**
 * Theme
 */
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }


}
