import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/model/category';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  formCategory: FormGroup = new FormGroup({});
  isLoadingResults: boolean = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      'name' : [null, Validators.required],
    });
  }

  addCategory(formValue: Category) {
    this.isLoadingResults = true;
    this.api.addCategory(formValue).subscribe({
      next: (res) => {
        const id = res['categoryId'];
        this.router.navigate(['/categories']);
      }, error: (err) => {
        console.log(err);
      }, complete: () => {
        this.isLoadingResults = false;
      }
    });
  }

}
