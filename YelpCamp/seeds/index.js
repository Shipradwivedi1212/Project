const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(()=>{
    console.log("connection open :)");
}).catch((err)=>{
console.log("connection refused!! Try Again :(");
});
const sample = array => array[Math.floor(Math.random() * array.length)];

async function seedDb(){
    await Campground.deleteMany({});
    for(var i = 0 ;i<= 50;i++){
        const random100 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20) + 10;
        var camp = new Campground({
            author:"66dda1bb2b9f2993c06155a6",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random100].city} , ${cities[random100].state}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus facere laudantium ratione ducimus alias dolor sit eveniet vitae quod possimus, animi laboriosam aliquam sapiente distinctio repellendus inventore facilis excepturi! Deleniti!',
            price: price,
            image:[
                {
                url:"https://res.cloudinary.com/doifgqlcy/image/upload/v1727606521/pexels-cliford-mervil-988071-2398220_l2k0em.jpg",
                filename:"YelpCamp/ubpnsf2kjpnhlumzwu6v"
                },
                {
                url:"https://res.cloudinary.com/doifgqlcy/image/upload/v1726937771/YelpCamp/ueo1g5y7x4q7sstxq32r.jpg",
                filename:"YelpCamp/uboktshz7k7pqs4zfggz"
                    }
            ]

        });
       await camp.save();
    }
}
seedDb();