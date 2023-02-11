import { Component,OnInit } from '@angular/core';
import {AuthenticationService} from '../../common/services/authentication.service';
import {User} from '../../common/models/common-dto'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  error: string;
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getProfile()
  .subscribe(
      (data:User) => {
          this.user=data;
      },
      error => {
          this.error = error.message; // error path
      });
  }

 
  
}


