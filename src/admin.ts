import Enquirer from "enquirer";
import { User, userSchema } from "./validators";

const enquirer = new Enquirer()

const admin:User = {
  userName:'',
  email:'',
  password:''
}

const createAdmin = async()=>{
  const username = await enquirer.prompt({
    type: 'input',
    name: 'username',
    message :'Enter the admin username'
  })

  const password = await enquirer.prompt({ 
    type: 'password',
    name: 'password',
    message:'Enter the admin password'
  })

    const email = await enquirer.prompt({ 
    type: 'input',
    name: 'email',
    message:'Enter the email'
  });

  const promptUser:User = {
    userName: (username as any).username,
    email: (email as any).email,
    password: (password as any).password
  }


const parsedUser = userSchema.safeParse(promptUser);

if (!parsedUser.success) {
    parsedUser.error.issues.forEach((issue) => {
    console.log(`Message: ${issue.message}`);
 });
}
else{
  //CONNECTION TO DATABASE
}
}

createAdmin()
