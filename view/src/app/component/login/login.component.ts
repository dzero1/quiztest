import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
  }

openModule(){
     let username:any = document.getElementsByClassName('username');
     console.log(username[0].value);
        let link =`/../mcq/${username[0].value}`
        this.router.navigate([link]);
     
  }
}
