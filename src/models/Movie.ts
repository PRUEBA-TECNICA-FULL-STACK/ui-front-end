import Rating from "./Rating";

export default  class Movie{
    id!:number;
    Title!:string;
    Year!:number;
    imdbID!:string;
    Poster!:string;
    Ratings!:number;

    constructor(data:any){
        this.id = data.id;
        this.Title = data.Title;
        this.Year = data.Year;
        this.imdbID = data.imdbID;
        this.Poster = data.Poster;
        this.Ratings = data.Ratings;
    }
}