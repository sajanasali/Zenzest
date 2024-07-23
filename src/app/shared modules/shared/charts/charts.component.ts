import { Component,ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnChanges{
   

  @ViewChild('myChart', { static: true }) myChart!: ElementRef;
  @ViewChild('myChart2', { static: true }) myChart2!: ElementRef;




  @Input() totalAppointments: number = 0;
  @Input() monthlyAppointmentsRevenue!: number[];
  @Input() monthlyAppointments!:number[];
  @Input() annualRev: number = 0;
  @Input() weeklyRev: number = 0;
  @Input() monthlyRev: number = 0;
  @Input() labels!: string[];
  @Input() totalAdminRevenue:number=0;
  @Input() isAdmin!:boolean;



  ngOnChanges() {
    this.renderChart();
    this.renderChart2();
  }
    // renderChart() {
    //   //console.log(19,'inside chart componnet',this.labels);
    //   const chartCanvas = this.myChart.nativeElement.getContext('2d');
    //   new Chart(chartCanvas, {
    //     type: 'line',
    //     data: {
    //       labels: this.labels,
    //       datasets: [{
    //         label: 'Monthly Revenue',
    //         data: this.monthlyAppointmentsRevenue,
    //         backgroundColor: 'Orange',
    //         borderWidth: 1
    //       }]
    //     },
    //     options: {
    //       scales: {
    //         y: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       }
    //     }
    //   });
    // }
    renderChart() {
      // Get the context of the canvas element we want to select
      const chartCanvas = this.myChart.nativeElement.getContext('2d');
      
      new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Monthly Revenue',
            data: this.monthlyAppointmentsRevenue,
            backgroundColor: 'rgba(255, 165, 0, 0.2)', // Orange with transparency
            borderColor: 'rgba(255, 165, 0, 1)', // Orange
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                // Optional: Customize tick properties
              }
            }
          }
        }
      });
    }
    
    // renderChart2(){
    //   const chartCanvas = this.myChart2.nativeElement.getContext('2d');
    //   new Chart(chartCanvas, {
    //     type: 'pie',
    //     data: {
    //       labels: this.labels,
    //       datasets: [{
    //         label: 'Total Appointments',
    //         data: this.monthlyAppointments,
    //         backgroundColor: 'blue',
    //         borderWidth: 1
    //       }]
    //     },
    //     options: {
    //       scales: {
    //         y: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       }
    //     }
    //   });
    // }
    renderChart2() {
      const chartCanvas = this.myChart2.nativeElement.getContext('2d');
      new Chart(chartCanvas, {
        type: 'pie',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Total Appointments',
            data: this.monthlyAppointments,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
        }
      });
    }
    
}
