import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/model/category';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number = 0;
  name: string = '';
  isLoadingResults: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      'categoryId' : [null],
      'name' : [null, Validators.required],
    });
   }

  ngOnInit(): void {
    this.getCategory(this.route.snapshot.params['id']);
  }

  getCategory(id: number) {
    this.isLoadingResults = true;
    this.api.getCategory(id).subscribe({
      next: (res) => {
        this.categoryId = res.categoryId;
        this.categoryForm.setValue({
          categoryId : res.categoryId,
          name: res.name,
        });
      }, error: (err) => console.log(err), 
      complete: () => this.isLoadingResults = false
    });
  }

  updateCategory(formValue: Category) {
    this.isLoadingResults = true;
    this.api.updateCategory(this.categoryId, formValue).subscribe({
      next: (res) => this.router.navigate(['/category/' + this.categoryId + '/details']),
      error: (err) => console.log(err), 
      complete: () => this.isLoadingResults = false
    });
  }
}