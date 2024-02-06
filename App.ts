import * as express from 'express';
import {UserModel} from "./models/UserModel";
import * as  bodyParser from "body-parser";
import * as crypto from 'crypto';

class App {
  public expressApp: express.Application;
  public User: UserModel;

  constructor(mongoDBConnection:string) {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.User = new UserModel(mongoDBConnection);
  }

  private middleware():void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      // Set the Access-Control-Allow-Origin header to allow all domains to access resources
      res.header("Access-Control-Allow-Origin", "*");
       // Set the Access-Control-Allow-Headers to specify which headers can be used in the actual request
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  private routes():void {
    let router = express.Router();

    router.get("/app/user", async (req, res) => {
      console.log('Query All User');
      await this.User.retreiveAllUsers(res);
    })

    router.get("/app/user/:id", async (req, res) => {
      console.log("Query Single User");
      const id = req.params.id;
      await this.User.retreiveSpecificUser(res, id);
    })

    router.get("/app/usersCount", async (req, res) => {
      console.log("Query All User Count");
      await this.User.retreiveAllUsersCount(res);
    })

    router.post('/app/user/', async (req, res) => {
      console.log("Adding a user");
      // generate a unique userID 
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      // get the payload 
      var jsonObj = req.body;
      // set the payload's userID
      jsonObj.userID = id;
      // create a new model 
      const doc = new this.User.model(jsonObj);
        try {
          // save it in the db 
          await doc.save();
          res.send('{"id":"' + id + '"}');
        }
        catch (e) {
          console.log('object creation failed');
          console.error(e);
        }        
    });

    router.get("/app/userAddReceipt", async (req,res) => {
      const userID = "1";
      const receiptID = "2";

      try {
        await this.User.addReceiptID(res, userID, receiptID);
      } catch (e) {
        console.log(e);
      }
    })


    this.expressApp.use('/', router);
  }
}

export {App}