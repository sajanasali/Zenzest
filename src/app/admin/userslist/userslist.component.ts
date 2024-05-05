import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { GetUsers, User, Users } from 'src/app/user/Model/Usermodel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit{

  users:User[]=[]
  constructor(private adminservice:AdminService,private userservice:UserService){}
  searchText:string='';
ngOnInit(): void {
  this.getUsers()
}
  getUsers(){
    this.userservice.getUsers()
    .subscribe((response:any) => {
      this.users = response.data;
     //this.doctorDataservice.setDoctors(this.doctors)
   
      console.log(this.users,"usersss")
    }); 
  }

  toggleBlockStatus(user:User): void {
    user.isBlocked = !user.isBlocked; // Toggle the isBlocked status
   const  userId=user._id
    this.adminservice.blockUser(userId)
      .subscribe({
        next: () => {
          console.log('user block status updated successfully');
          // You may want to reload the list of doctors after updating
          this.getUsers();
        },
        error: (error) => {
          console.error('Error updating doctor block status:', error);
          // Handle error, e.g., show error message
        }
      });
  }

}
