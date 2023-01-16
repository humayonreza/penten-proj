import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  fileName: string = '';
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    const utcDt = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    this.fileName = 'cms-' + utcDt + '.json';
    console.log('File Name : ', this.fileName);
  }
}
