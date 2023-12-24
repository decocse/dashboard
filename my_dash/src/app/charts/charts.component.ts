import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  data: any[] = [];
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getDataFromService();
  }


  createBarChart(): void {
    const data = [10, 20, 30, 40, 50]; // Example data

    const svgWidth = 400;
    const svgHeight = 300;

    const svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d: any) => svgHeight - d * 5)
      .attr('width', 65)
      .attr('height', (d: any) => d * 5)
      .attr('fill', '#007bff'); // Blue color fill, change as needed
  }


  getDataFromService(): void {
    this.dataService.getData()
      .subscribe((response) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      });
  }
}
