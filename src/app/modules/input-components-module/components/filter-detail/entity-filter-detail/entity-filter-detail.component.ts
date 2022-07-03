import { Component, OnInit } from '@angular/core';
import { FilterDetailComponent } from "../common/filter-detail-component";

@Component({
  selector: 'app-entity-filter-detail',
  templateUrl: './entity-filter-detail.component.html',
  styleUrls: ['./entity-filter-detail.component.css']
})
export class EntityFilterDetailComponent extends FilterDetailComponent implements OnInit {

  ngOnInit(): void {
  }

}
