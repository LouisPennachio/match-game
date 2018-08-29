import { StatusService } from './../../shared/status/status.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private statusService: StatusService) {}

  ngOnInit() {
  }
}
