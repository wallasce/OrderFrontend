import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/model/category';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  category: Category = new Category();
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.getCategory(this.route.snapshot.params['id'])
  }
  
  getCategory(id: number) {
    this.api.getCategory(id).subscribe({
      next: (res) => {
        this.category = res;
        console.log(this.category);
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        this.isLoadingResults = false;
      }
    });
  }

  deleteCategory(id: number) {
    this.isLoadingResults = true;
    this.api.deleteCategory(id).subscribe({
      next: (res) => {
        this.router.navigate(['/categories'])
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        this.isLoadingResults = false;
      }
    });
  }

}
