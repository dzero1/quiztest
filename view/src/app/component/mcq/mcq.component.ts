import { Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PouchDBService } from '../../pouch-dbservice.service'
@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.scss']
})
export class McqComponent implements OnInit {
 @Input()
  params:any;
username:any;
questions:any;
  constructor(private route: ActivatedRoute,
              private router: Router,private pouchDBService: PouchDBService) {
              pouchDBService.databaseName='quiztest';
              pouchDBService.init();
              this.pouchDBService.getChangeListener().subscribe(data => {
                
                  for (let i = 0; i < data.change.docs.length; i++) {
                     if(data.change.docs[i]._id="questions"){
                       this.questions=data.change.docs[i].question; 
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
      console.log (this.questions);
    })
 
  }

}
