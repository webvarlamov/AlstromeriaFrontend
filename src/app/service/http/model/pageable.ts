import {Page} from './page';
import {Linked} from './linked';

export interface Pageable<T> extends Linked {
  page?: Page;
  _embedded: { [domainType: string]: Array<T> };
}

export interface HasId {
  id: string;
}

export const emptyPageable: Pageable<any> = {
  page: {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  },
  _embedded: {
    entities: []
  }
};
