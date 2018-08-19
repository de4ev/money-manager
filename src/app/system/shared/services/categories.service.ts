import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

import { BaseApi } from "../../../shared/core/base-api";
import { Category } from "../models/category.model";
import { Observable } from "rxjs";

@Injectable()
export class  CategoriesService extends BaseApi {
    constructor(public http: Http) {
        super(http)
    }

    addCategory(category: Category): Observable<Category> {
        return this.post('categories', category)
    }
    getCategories(): Observable<Category[]> {
        return this.get('categories');
    }
}