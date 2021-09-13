import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DefaultDataAccess} from "./default-data-access";

@Injectable({
  providedIn: 'root'
})
export class DataAccessService extends DefaultDataAccess {
  constructor(
    public httpClient: HttpClient,
  ) {
    super(httpClient)
  }
}
