import * as Mongoose from "mongoose";
import {IUserModel} from '../interfaces/IUserModel';

class UserModel {
  public schema: any;
  public model: any;
  public dbConnectionString: string;

  public constructor(dbConnectionString: string) {
    this.dbConnectionString = dbConnectionString;
    this.createSchema();
    this.createModel();
  }

  public createSchema() {
    this.schema = new Mongoose.Schema({
      userID: String,
      username: String,
      email: String,
      debtsOwed: [
        {debtID: String,
        amount: Number,
        debtorID: String,
        creditorID: String}
      ],
      debtsOwedTo: [
        {debtID: String,
        amount: Number,
        debtorID: String,
        creditorID: String}
      ],
    receiptsList: [String],
    balance: Number,
    friendRequestsSent: [String],
    friendRequestsReceived: [String],
    groupsList: [String]
    }, {collection: "users"} 
    )
  }


public async createModel(){
  try {
    await Mongoose.connect(this.dbConnectionString);
    this.model = Mongoose.model<IUserModel>("Users", this.schema);
  } catch (e) {
    console.error(e);
  }
}

public async retreiveAllUsers(response: any){
  const query = this.model.find({});
  try {
    const usersArray = await query.exec();
    response.json(usersArray)
  } catch (e) {
    console.log(e)
  }
}

public async retreiveSpecificUser(response: any, userID: string) {
  const query = this.model.findOne({"userID": userID});
  
  try {
    const user = await query.exec();
    response.json(user)
  } catch (e) {
    console.log(e)
  }
}
}

export {UserModel};