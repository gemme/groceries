import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import { TextField } from "ui/text-field";

@Component ({
    selector: "list",
    templateUrl: "./pages/list/list.html",
    styleUrls: ["./pages/list/list-common.css","./pages/list/list.css"],
    providers: [ GroceryListService ]
})
export class ListComponent implements OnInit {

    grocery = "";
    @ViewChild("groceryTextField") groceryTextField: ElementRef
    groceryList: Array<Grocery> = [];

    constructor(private groceryListService: GroceryListService){}

    ngOnInit(){        
        this.groceryListService.load()
            .subscribe(
                loadedGroceries => {
                    loadedGroceries.forEach((groceryObject) => {
                        this.groceryList.unshift(groceryObject);
                    })
                }
            );
    }

    adding(){
        console.log("adding...");
    }

    add() {
        console.log("add()");
        if(this.grocery.trim() ===""){
            alert("Enter a grocery item");
            return;
        }
        //Dismiss the keryboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this.groceryListService.add(this.grocery)
            .subscribe(
                groceryObject => {
                    this.groceryList.unshift(groceryObject);
                    this.grocery = "";
                },
                () => {
                    alert({
                        message: "An error ocurred while adding an item to your list",
                        okButtonText: "OK"
                    });
                    this.grocery = "";
                }
            )
    }
}