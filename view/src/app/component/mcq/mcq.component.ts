import { Component, OnInit, Input,ViewChildren,QueryList,
  ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PouchDBService } from '../../pouch-dbservice.service';
import { MdCheckboxModule, MdCheckbox } from '@angular/material';
@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss'],
})
export class McqComponent implements OnInit {
   @ViewChildren('options') options: QueryList<MdCheckboxModule>;
 @Input()
  params:any;
username:any;
questions:any;
answerd:boolean = false;
correctTick:boolean = false;
clickedcorrect:Array<boolean> = [];
correct = null;
pattern: Array<Number>;
review: boolean = false;
cssClasses: Array<String> = [];
cssClasses2: Array<String> = [];
lodding=true;

tmpQuiz
  constructor(private route: ActivatedRoute,
              private router: Router,private pouchDBService: PouchDBService,
              private changeDetectorRef: ChangeDetectorRef
  ) {
              pouchDBService.databaseName='quiztest';
              pouchDBService.init();
              this.pouchDBService.getChangeListener().subscribe(data => {
                  for (let i = 0; i < data.change.docs.length; i++) {
                     if(data.change.docs[i]._id=="questions"){
                       this.tmpQuiz=data.change.docs[i].question; 
                        if(this.tmpQuiz.length==0){
                          this.lodding=true;
                        } else{
                          this.lodding=false;
                        }
                        setTimeout(()=>{
                          this.questions = this.tmpQuiz;
                        })
                      }
                  }
              });
  }

  ngOnInit() {
     this.route.params.subscribe((params: Params) => {
        this.params=params;
        this.username= this.params["username"];
    });
    this.pouchDBService.get("questions").then(data=>{
      let q:any =data
      this.questions=q.question;
      if(this.questions.length==0){
        this.lodding=true;
      }else{
           this.lodding=false;
      }
   
    })
 
  }


  doChange(event){
    let target = event.source;
    let checkedIndex = parseInt(target.value);
    this.correctTick = false;
    console.log("tick index is : " + checkedIndex + " Correct answer is : " + this.questions.correct);
    if(checkedIndex == this.questions.correct){
      this.correctTick = true;
      console.log("tick true");
    }
    this.options.toArray().forEach((elem: any) => {elem.checked = false;this.cssClasses[elem.value-1] = ""; this.cssClasses2[elem.value-1] = "";this.clickedcorrect[elem.value-1] = false;});
    target.checked = true;
    this.pattern.push(checkedIndex);
    
  }


  cssClass(answerid,tick){
    return this.cssClasses[answerid];

  }

  cssClass2(answerid){
    return this.cssClasses2[answerid];
  }

  clickCard(cardid){
    this.options.toArray().forEach((elem: any) => {elem.checked = false;this.cssClasses[elem.value-1] = ""; this.cssClasses2[elem.value-1] = "";});
    let answer = this.options.toArray().forEach((elem: any) => {
      if(elem.value == cardid){
        elem.checked = true;
        this.pouchDBService.get(`${this.username}`).then((getanswerdata:any)=>{
          if(getanswerdata){
              console.log(getanswerdata);
              getanswerdata.ansid=elem.value;
              this.pouchDBService.put(this.username,getanswerdata);
          }
        })
        .catch(reson=>{
            console.log(reson);
            this.pouchDBService.put(this.username,{qid:1,ansid:elem.value});
        });
       
      }
    });

    this.questions= false;
    this.lodding=true;
  }
}
