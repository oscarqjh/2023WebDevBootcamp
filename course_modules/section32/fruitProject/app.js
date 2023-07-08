import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const FruitSchema = mongoose.Schema({ 
    name: {
        type: String,
        required: `{PATH} is required!`
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    review: String 
});

const Fruit = mongoose.model('Fruit', FruitSchema);

const fruit = new Fruit({
    name: 'Apple',
    rating: 7,
    review: 'Good'
});

const PersonSchema = mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: FruitSchema
})

const pineapple = new Fruit({
    name: 'Pineapple',
    rating: 9,
    review: 'Great'
})

const Person = mongoose.model('Person', PersonSchema);

const person = new Person({
    name: 'Amy',
    age: 12,
    favouriteFruit: pineapple
})

// fruit.save();
// pineapple.save();
// person.save();

const kiwi = new Fruit({
    name: 'Kiwi',
    rating: 3,
    review: 'Bad'
})

const orange = new Fruit({
    name: 'Orange',
    rating: 8,
    review: 'Mid'
})

const banana = new Fruit({
    name: 'Banana',
    rating: 9,
    review: 'Amazing'
})

const pear = new Fruit({
    name: 'Pear',
    rating: 4,
    review: 'Lol'
})

// pear.save();

// Fruit.insertMany([kiwi, orange, banana]);

// Fruit.find().then(fruits => {
//     mongoose.connection.close();
//     fruits.forEach(element => {
//         console.log(element.name);
//     });
// });

// Person.updateOne({_id: '6495b2ea4a28db436465cbc7'}, {favouriteFruit: pear}).then(res => {mongoose.connection.close()}).catch(err => {console.log(err)});

// Fruit.deleteOne({_id: '6495c6f1ba13eab5c3e3416a'}).then(res => {
//     mongoose.connection.close();
//     console.log(this);
// });
