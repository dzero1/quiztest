import { Component } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {AddquizDialogComponent} from './quizcreator/addquiz-dialog/addquiz-dialog.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(public dialog: MdDialog,
    private route: ActivatedRoute,
    private router: Router) {
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddquizDialogComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result){
        this.router.navigate(['report']);
      }
    });
  }
}
