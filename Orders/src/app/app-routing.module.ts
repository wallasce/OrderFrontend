import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    data: {title: 'Categories'}
  },
  {
    path: 'category/:id/details',
    component: CategoryDetailsComponent,
    data: {title: 'Category Details'}
  },
  {
    path: 'category/new',
    component: NewCategoryComponent,
    data: {title: 'Create Category'}
  },
  {
    path: 'category/:id/edit',
    component: EditCategoryComponent,
    data: {title: 'Edit Category'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
