import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DummyService {

    constructor(private http: HttpClient) {
    }

    getText() {
        return this.http.get<any>(`${environment.api}dummy`);
    }
}
