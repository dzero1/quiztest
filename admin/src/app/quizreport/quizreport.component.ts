import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizreport',
  templateUrl: './quizreport.component.html',
  styleUrls: ['./quizreport.component.scss']
})
export class QuizreportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public goalChartData:Array<any> = [
    {data: [0.2, 0.4, 0.6, 0.7, 0.7, 0.75, 0.5], label: 'Series A'},
    {data: [0.2, 0.2, 0.35, 0.38, 0.4, 0.45, 0.8], label: 'Series B'},
    {data: [0.2, 0.2, 0.35, 0.38, 0.4, 0.45, 0.8], label: 'Series C'},
  ];
  public goalChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public goalChartType:string = 'line';
  public goalChartOptions:any = {
    responsive: true
  };
  public goalChartColors:Array<any> = [
      { // Goal 1
          backgroundColor: 'rgba(128,173,246, .5)',
          borderColor: 'rgba(24,106,238, .5)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // Goal 2
          backgroundColor: 'rgba(190, 128, 246, .5)',
          borderColor: 'rgba(143, 0, 189, .5)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // Goal 3
          backgroundColor: 'rgba(84, 241, 89, .5)',
          borderColor: 'rgba(0, 169, 5, .5)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
  ];
  public goalChartLegend:boolean = true;

}
