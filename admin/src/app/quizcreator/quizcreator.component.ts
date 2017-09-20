import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { PouchDBService } from '../pouch-dbservice.service'
import { MdInput, MdRadioButton, MdRadioModule } from '@angular/material'

@Component({
  selector: 'app-quizcreator',
  templateUrl: './quizcreator.component.html',
  styleUrls: ['./quizcreator.component.scss']
})
export class QuizcreatorComponent implements OnInit {

  @ViewChild('title') title:any;
  @ViewChild('ans1') ans1:any;
  @ViewChild('ans2') ans2:any;
  @ViewChild('ans3') ans3:any;
  @ViewChild('ans4') ans4:any;

  correctAnswer:number = 1;

  allQuestions:Array<any> = [];

  doc:string = "t_questions";

  constructor(private pdb:PouchDBService) { 
    pdb.databaseName = "quiztest";
    pdb.init();
  }

  ngOnInit() {
    this.pdb.get(this.doc).then((questions:any)=>{
      this.allQuestions = questions.question;
      console.log(questions.question);      
    })
  }

  addQuiz(){
    let a1 = new Answer();
    a1.text = this.ans1.nativeElement.value;
    let a2 = new Answer();
    a2.text = this.ans2.nativeElement.value;
    let a3 = new Answer();
    a3.text = this.ans3.nativeElement.value;
    let a4 = new Answer();
    a4.text = this.ans4.nativeElement.value;

    let q = new Quiz();
    q.qid = 1;
    q.title = this.title.nativeElement.value;
    q.correct = this.correctAnswer;
    q.answer = [a1,a2,a3,a4];
    //this.allQuestions.concat();

    this.pdb.get(this.doc).then((questions:any)=>{
      questions.question = [q];
      console.log(questions.question);      
      this.pdb.put(this.doc, questions);
    }).catch(error=>{
      this.pdb.put(this.doc, {"question":[q]});
    });

  }

  radioChange(k){
    console.log(k);
    this.correctAnswer = k;
  }

}

export class Answer{
  text:string;
}

export class Quiz{
  qid:number;
  correct:number;
  title:string;
  answer:Answer[];
}
