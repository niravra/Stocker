
import {PortfolioModel} from "./Portfolio.model";

export class UserModel{
  id: string;
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  portfolio: Array<PortfolioModel>;
  buyingpower: Number;
  ssn: Number;

}
