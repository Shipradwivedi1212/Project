const mongoose = require('mongoose');
const reviews  = require('./reviews');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    url:String,
    filename:String
});
imageSchema.virtual('thumbnail').get(function(){
   return this.url.replace('/upload','/upload/w_200')
});
const campgroundSchema = new Schema({
    title : String,
    price : Number,
    image:[imageSchema],
    description : String,
    location: String,
    author:
        {
            type : Schema.Types.ObjectId,
            ref : 'User'
        }
    ,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
});
campgroundSchema.post('findOneAndDelete',async function (doc) {
if(doc){
    await reviews.deleteMany({
        _id : {
            $in : doc.reviews
        }
    })
}
});
module.exports = mongoose.model('Campground',campgroundSchema);
