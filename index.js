let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());


let notesSchema = new Schema({
    namePleer: String,
    timeLesson: {
        timeBeginning: Date,
        timeEnd: Date,
        сheckСall: Boolean
    }
})

let Note = model('note', notesSchema);


// app.get('/categories/all', async function (req, res) {
//     let response = await Category.find().sort({ value: -1 })
//     res.send(response);
// })


// app.get('/notes/all', async function (req, res) {
//     let response = await Note.find().sort({ date: -1 }).populate('category');
//     res.send(response);
// })

// app.post('/notes/create', async function (req, res) {
//     //let {text, date, category} = req.body;
//     let text = req.body.text;
//     let date = req.body.date;
//     let category = req.body.category;

//     let note = new Note({
//         text: text,
//         date: date,
//         category: category
//     })

//     await note.save();


//     res.send(note);
// })