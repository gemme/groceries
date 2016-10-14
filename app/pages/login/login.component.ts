import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import { Component,OnInit, ElementRef, ViewChild } from "@angular/core";
import { User } from "../../shared/user/user";
import { UserService } from '../../shared/user/user.service';
import { Router } from "@angular/router";
import { AnimationDefinition } from "ui/animation";

@Component({
  selector: "my-app",
  templateUrl: "pages/login/login.html",
  styleUrls: [ "pages/login/login-common.css", "pages/login/login.css" ],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

user: User;
isLogginIn = true;
@ViewChild("container") container: ElementRef;

constructor(private userService: UserService,
            private router: Router,
            private page: Page) {
  this.user = new User();
}

ngOnInit() {
    console.log("When I am starting...");
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login";
}

public submit(){
  if(this.isLogginIn) { this.login(); return ;}
  this.signUp(); 
}

public toggleDisplay() {
  this.isLogginIn = !this.isLogginIn;
  let container = <View>this.container.nativeElement;
  let options: AnimationDefinition  = {
        backgroundColor: this.isLogginIn ? new Color("white") : new Color("#301217"),
        duration: 200 
  };
  container.animate(options);
}

private login() {
//TODO: define
this.userService.login(this.user)
    .subscribe(
        () => this.router.navigate(["/list"]),
        (error) => {
            console.log(error);
            alert("Unfortunately We coudn't find your account");
        }
    );
}

private signUp() {
  this.userService.register(this.user)
    .subscribe(
      () => {
        alert("Your account was succesfully created");
        this.toggleDisplay();
    },
      (err) => {
        console.log(err);
        alert("Unfortunately we were unable to create your acccount");
    });
}

}