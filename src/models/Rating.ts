export default  class Rating{
    id!:number;
    rating!:number;
    movie_id!:number;
    user_id!:number;
    constructor(data:any){
        this.id = data.id;
        this.rating = data.rating;
        this.movie_id = data.movie_id;
        this.user_id = data.user_id;
 
    }
}