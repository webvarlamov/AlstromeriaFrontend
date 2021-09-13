import {EntitiesLoadOptions} from "../model/entities-load-options";
import {FilterExpression} from "../model/filter-expression";
import {Observable} from "rxjs";
import {Pageable} from "../model/pageable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Range} from "../model/range";
import {EntityLoadOptions} from "../model/entity-load-options";

export class DefaultDataAccess {
  private root = '';
  private defaultIdentificationProperty = 'id';

  constructor(
    public httpClient: HttpClient
  ) {}

  public loadEntities<T>(domainType?: string, options?: EntitiesLoadOptions, expression?: FilterExpression): Observable<Pageable<T>> {
    let params = new HttpParams();

    params = options?.page ? params.set('page', options.page?.toString()) : params;
    params = options?.size ? params.set('size', options.size?.toString()) : params;
    params = options?.projection ? params.set('projection', options.projection?.toString()) : params;
    params = expression ? params.set('expression', JSON.stringify(expression)) : params;

    if (options?.sort) {
      options.sort.forEach(sort => {
        params = params.set('sort', [sort.selector, (sort.desc ? 'desc' : 'asc')].join(','));
      });
    } else {
      params = params.set('sort', 'id,asc');
    }

    return this.httpClient.get(this.root + domainType, {params}) as Observable<Pageable<T>>;
  }

  public loadEntitiesCount<T>(domainType: string, options?: EntitiesLoadOptions, ranges?: Range[], expression?: FilterExpression): Observable<number> {
    let params = new HttpParams();
    params = expression ? params.set('expression', JSON.stringify(expression)) : params;
    params = (ranges && ranges.length > 0) ? params.set('ranges', JSON.stringify(ranges)) : params;

    return this.httpClient.get(this.root + domainType
      + ((ranges && ranges.length !== 0) || (expression !== undefined) ? '/filter/count' : ''),
      {params}
    ) as Observable<number>;
  }

  public loadEntity<T>(domainType: string, id: string, options?: EntityLoadOptions): Observable<T> {
    let params = new HttpParams();
    params = options?.projection ? params.set('projection', options.projection?.toString()) : params;

    return this.httpClient.get([this.root + domainType, id].join('/'), {params}) as Observable<T>;
  }

  public saveEntity<T>(domainType: string, hateoasEntity: any, options?: EntitiesLoadOptions): Observable<any> {
    let params = new HttpParams();
    params = options?.projection ? params.set('projection', options.projection?.toString()) : params;
    return this.httpClient.post(this.root + domainType, hateoasEntity, {params});
  }

  public patchEntity<T>(domainType: string, id: string, hateoasEntityPart: any, options?: EntitiesLoadOptions): Observable<any> {
    let params = new HttpParams();
    params = options?.projection ? params.set('projection', options.projection?.toString()) : params;
    return this.httpClient.patch(this.root + domainType + '/' + id, hateoasEntityPart, {params});
  }

  public deleteEntityById<T>(domainType: string, entityId: string): Observable<any> {
    return this.httpClient.delete(this.root + domainType + '/' + entityId, {
      observe: 'response'
    });
  }

  public deleteEntity<T>(domainType: string, entity: any, identificationProperty?: string): Observable<any> {
    return this.deleteEntityById(domainType, identificationProperty ?
      entity[identificationProperty] :
      entity[this.defaultIdentificationProperty]
    );
  }

  public loadSuggestions(domainType: string, search: string, attributeKey: string, expression?: FilterExpression): Observable<Array<string>> {
    let params = new HttpParams();
    params = params.set('search', search);
    params = params.set('attributeKey', attributeKey);
    params = expression ? params.set('expression', JSON.stringify(expression)) : params;

    return this.httpClient.get(this.root + '/' + domainType + '/suggestion', {params}) as Observable<Array<string>>;
  }
}
