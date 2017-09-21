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
  count :number=0;
  public correctans=0;
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
        if(data.rows[i].id=="answer" || data.rows[i].id=="questions"){
          continue;
        }else{
          this.records.push(data.rows[i].doc);
          console.log(data.rows[i].doc);
        }
      }
      this.calcSum();
        this.pdb.get("questions").then(data=>{
        let qdata:any = data;
        for (let i = 0; i < qdata.question.length; i++) {
          this.correctans = qdata.question[i].correct;
          console.log("Correct ans is" + qdata.question[i].correct);
          this.countCorrectUsers(this.correctans);
        }
      });
    })

    
    setInterval(()=>{
          this.count++;
          if (this.count > 10000) this.count = 0;
    }, 1000)

    this.pdb.getChangeListener().subscribe(data => {
            // for (let i = 0; i < data.change.docs.length; i++) {
            //   if(data.change.docs[i]._id != "answer" || data.change.docs[i]._id != "questions"){
            //     console.log("Docs count : " + data.change.docs[i]._id);
            //     this.records.push(data.change.docs[i]);
            //   }
            // }
            this.records = [];
            this.pdb.fetch().then(data=>{
              console.log(data);
              for (let i = 0; i < data.rows.length; i++) {
                console.log("documentasasasasa"+i);
                if(data.rows[i].id=="answer" || data.rows[i].id=="questions"){
                  continue;
                }else{
                  this.records.push(data.rows[i].doc);
                  console.log(data.rows[i].doc);
                }
              }
              console.log(this.records);
            this.calcSum();
            this.countCorrectUsers(this.correctans);
            });
            
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
          backgroundColor: [
              'rgba(255, 99, 132, 1.0)',
              'rgba(54, 162, 235, 1.0)',
              'rgba(255, 206, 86, 1.0)',
              'rgba(153, 102, 255, 1.0)',
            ],
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
      console.log("I is " + this.records[i]._id);
      if(this.records[i].ansid == 1){
        this.countans1++;
      }
      else if(this.records[i].ansid == 2){
        this.countans2++;
      }
      else if(this.records[i].ansid == 3){
        this.countans3++;
      }
      else if(this.records[i].ansid == 4){
        this.countans4++;
      }
    }

    this.totCount = this.countans1+this.countans2+this.countans3+this.countans4;
    // this.totCorrect = (this.correctans*100)/this.totCount;
    this.setData();
  }

  public countCorrectUsers(correctans){
    this.totCorrect = 0;
    this.correctUsers = 0;
    for (let i = 0; i < this.records.length; i++) {
      console.log("Correct"+i);
      if(correctans == this.records[i].ansid){
        this.correctUsers++;
      }
    }
    this.totCorrect = (this.correctUsers*100)/this.totCount;
  }

}
