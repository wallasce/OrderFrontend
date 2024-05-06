import { Component, OnInit } from '@angular/core';
import { Category } from 'src/model/category';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  dataSource : Category[] = [];
  displayedColumns = [ 
    'Name',
    'Action'
  ];
  isLoadingResults = true;

  constructor(private api :ApiService) { }

  ngOnInit(): void {
    this.api.getCategories().subscribe({
      next: (res) => {
        this.dataSource = res;
        console.log(this.dataSource)
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        this.isLoadingResults = false;
      }
    });
  }

}
