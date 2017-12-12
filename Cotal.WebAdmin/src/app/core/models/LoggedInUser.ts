export class LoggedInUser {
  constructor(access_token: string, username: string, fullName:string,
  email:string, avatar:string,permissions:any,isAdmin:boolean
    ) {
        this.Token = access_token; 
        this.UserName = username; 
        this.Avatar = avatar;
        this.Email = email;
        this.FullName = fullName;    
        this.Permissions = permissions;      
        this.IsAdmin = isAdmin;      
  }
    public Id: string;
    public Token: string;
    public UserName: string;
    public FullName: string;
    public Email: string;
    public Avatar: string;
    public Permissions:any;  
    public IsAdmin:Boolean
  
}