import { createEntityAdapter } from "@ngrx/entity";
import { Users,UserModel } from "src/app/user/Model/Usermodel";


export const UserAdapter=createEntityAdapter<Users>()

export const UserState: UserModel = UserAdapter.getInitialState({
   
    
   
    userinfo:{
       
       name: '',
        email: '',
        sex:'',
        age:'',
        mobile: '',
        status: false,
       address:''
    }
}




)