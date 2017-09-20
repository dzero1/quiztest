import { Component, OnInit } from '@angular/core';

import { PouchDBService } from '../pouch-dbservice.service'

@Component({
  selector: 'app-quizreport',
  templateUrl: './quizreport.component.html',
  styleUrls: ['./quizreport.component.scss']
})
export class QuizreportComponent implements OnInit {

  public records:Array<any>=[];
  public countans1=0;
  public countans2=0;
  public countans3=0;
  public countans4=0;
  public totCount=0;
  public totCorrect=0;
  public correctUsers=0;
  // public correctans=0;
  public goalChartData:Array<any> = [
      {data: [this.countans1/this.totCount, this.countans2/this.totCount, this.countans3/this.totCount, this.countans4/this.totCount], label: 'Series A'}
    ];

  constructor(private pdb:PouchDBService) { 
    pdb.databaseName = "quiztest";
    pdb.init();
  }

  ngOnInit() {

    // this.pdb.get("answer").then(data=>{
    //   this.records = data;
    //   this.calcSum(data);
    // });

    this.pdb.fetch().then(data=>{
      console.log(data);
      for (let i = 0; i < data.rows.length; i++) {
        console.log("document"+i);
        if(data.rows[i]._id=="answer" || data.rows[i]._id=="questions"){
          continue;
        }else{
          this.records.push(data.rows[i]);
          console.log(data.rows[i]);
        }
      }
      this.calcSum();
        this.pdb.get("questions").then(data=>{
        let qdata:any = data;
        for (let i = 0; i < qdata.question.length; i++) {
          // this.correctans = qdata.question[i].correct;
          console.log("Correct ans is" + qdata.question[i].correct);
          this.countCorrectUsers(qdata.question[i].correct);
        }
      });
    })

    

    this.pdb.getChangeListener().subscribe(data => {
            for (let i = 0; i < data.change.docs.length; i++) {
              if(data.change.docs[i]._id != "answer" || data.change.docs[i]._id != "questions"){
                console.log("Docs count : " + data.change.docs[i]._id);
                this.records.push(data.change.docs[i]);
              }
            }
            this.calcSum();
    });
   
  }

  public setData(){
     this.goalChartData = [
      {data: [this.countans1/this.totCount, this.countans2/this.totCount, this.countans3/this.totCount, this.countans4/this.totCount], label: 'Series A'}
    ];
  }

  
  public goalChartLabels:Array<any> = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
  public goalChartType:string = 'pie';
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

  // public calcSum(data){
  //   this.totCount=0;
  //   this.countans1=0;
  //   this.countans2=0;
  //   this.countans3=0;
  //   this.countans4=0;
  //   console.log("in");
  //   for (let i = 0; i < data.answer.length; i++) {
  //     console.log("I is " + data.answer[i].uname);
  //     if(data.answer[i].ansid == 1){
  //       this.countans1++;
  //     }
  //     else if(data.answer[i].ansid == 2){
  //       this.countans2++;
  //     }
  //     else if(data.answer[i].ansid == 3){
  //       this.countans3++;
  //     }
  //     else if(data.answer[i].ansid == 4){
  //       this.countans4++;
  //     }
  //   }

  //   this.totCount = this.countans1+this.countans2+this.countans3+this.countans4;
  //   // this.totCorrect = (this.correctans*100)/this.totCount;
  //   this.setData();
  // }

  public calcSum(){
    this.totCount=0;
    this.countans1=0;
    this.countans2=0;
    this.countans3=0;
    this.countans4=0;
    console.log("in");
    for (let i = 0; i < this.records.length; i++) {
      console.log("I is " + this.records[i].doc._id);
      if(this.records[i].doc.ansid == 1){
        this.countans1++;
      }
      else if(this.records[i].doc.ansid == 2){
        this.countans2++;
      }
      else if(this.records[i].doc.ansid == 3){
        this.countans3++;
      }
      else if(this.records[i].doc.ansid == 4){
        this.countans4++;
      }
    }

    this.totCount = this.countans1+this.countans2+this.countans3+this.countans4;
    // this.totCorrect = (this.correctans*100)/this.totCount;
    this.setData();
  }

  public countCorrectUsers(correctans){
    for (let i = 0; i < this.records.length; i++) {
      console.log("Correct"+i);
      if(correctans == this.records[i].doc.ansid){
        this.correctUsers++;
      }
    }
    this.totCorrect = (this.correctUsers*100)/this.totCount;
  }

}
