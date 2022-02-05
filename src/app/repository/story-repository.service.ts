import {Injectable} from '@angular/core';
import {PagingAndSortingRepositoryAsync} from "../service/http/repository/paging-and-sorting-repository-async";
import {Plan} from "../entity/plan";
import {AbstractPagingAndSortingRemoteEntityRepositoryAsync} from "../service/http/repository/abstract-paging-and-sorting-remote-entity-repository-async";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StoryRepositoryService extends AbstractPagingAndSortingRemoteEntityRepositoryAsync<Plan> implements PagingAndSortingRepositoryAsync<Plan> {
  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getURL(method: any, methodArgs?: any): string {
    return "story";
  }
}
