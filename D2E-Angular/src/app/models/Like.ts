export interface Like{

    likesId: number;

    post: {
        postId : number;
        timePosted : string;
        postBody : string;
        postMedia : string; //link the url
        commentCount : number;
        likesCount : number;
        user : {
            userId : number;
            email : string;
            username : string;
            password : string;
            firstName : string;
            lastName : string;
            location : string;
        }
    }
    
    user : {
        userId : number;
        email : string;
        username : string;
        password : string;
        firstName : string;
        lastName : string;
        location : string;
    }
}