

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrl: './chart-bar.component.css',
})
export class ChartBarComponent implements AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const width = 700;
    const height = 400;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

  const aapl: { date: Date; close: number }[] = [
  // Replace this with your actual data array.
  { date: new Date('2023-01-01'), close: 100 },
  { date: new Date('2023-01-02'), close: 110 },
  // Add more data objects as needed
];



const validDates = aapl.filter(d => d.date instanceof Date && !isNaN(d.date.getTime()));
const x = d3.scaleUtc(d3.extent(validDates, d => d.date) as [Date, Date], [marginLeft, width - marginRight]);

const validCloseValues = aapl.filter(d => typeof d.close === 'number' && !isNaN(d.close));
const y = d3.scaleLinear([0, d3.max(validCloseValues, d => d.close)!], [height - marginBottom, marginTop]);


    const area = d3.area<{ date: Date, close: number }>() // Specify the type of data you are working with
  .x(d => x(d.date))
  .y0(y(0))
  .y1(d => y(d.close));
    const svg = d3.select(this.chartContainer.nativeElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.append("path")
      .attr("fill", "steelblue")
      .attr("d", area(aapl));

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)"));
  }
}
