import { User } from './user';
import { Comments } from './comments';

export class Issues {

    _id:string;
    title:string;
    description:string;
    start_date:Date;
    end_date:Date;
    sprint_id: Date;
    status:String;
    comments:Comments[];
    create_date:String;
    users:User;
    userEmail:string;

}