import { Component, OnInit, ViewChild } from '@angular/core';
import { PouchDBService } from '../pouch-dbservice.service'
import { MdInput } from '@angular/material'

@Component({
  selector: 'app-quizcreator',
  templateUrl: './quizcreator.component.html',
  styleUrls: ['./quizcreator.component.scss']
})
export class QuizcreatorComponent implements OnInit {

  @ViewChild('question') question:MdInput;
  @ViewChild('ans1') ans1:MdInput;
  @ViewChild('ans2') ans2:MdInput;
  @ViewChild('ans3') ans3:MdInput;
  @ViewChild('ans4') ans4:MdInput;

  constructor(private pdb:PouchDBService) { 
    pdb.databaseName = "quiztest";
    pdb.init();
  }

  ngOnInit() {
    console.log("asdasd")
  }

  addQuiz(){
    console.log(this.question.value)
  }

}
