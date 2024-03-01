import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {};
  constructor() {
    
    this.chartOptions =  {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Project Completion Report'
      },
      tooltip: {
          valueSuffix: '%'
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      credits: {
        enabled: false,
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data: [{
                name: 'Customer Support',
                y: 21.3
              }, {
                name: 'Development',
                y: 18.7
              }, {
                name: 'Sales',
                y: 20.2
              }, {
                name: 'Marketing',
                y: 14.2
              }, {
                name: 'Other',
                y: 25.6
              }]
          }
      ]
  }
   HC_exporting(Highcharts);
  }
}




