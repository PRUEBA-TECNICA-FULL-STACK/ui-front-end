class User {
    email!:string;
    password!:string;
    name!:string;
  constructor(data:any) {
    // ...
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
  }
}