const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connection from your successful terminal log
mongoose.connect('mongodb+srv://admin:muneesraja19@cluster0.eitji8y.mongodb.net/school')
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error(err));

const studentSchema = new mongoose.Schema({
    "Roll no": Number, "Name": String, "Class": String, "Section": String,
    "Grade": String, "Attendance": Number, "English": Number, "Hindi": Number,
    "Maths": Number, "EVS": Number, "GK": Number, "Total": Number
}, { collection: 'studentdb' });

const Student = mongoose.model('Student', studentSchema);

app.get('/api/students', async (req, res) => res.json(await Student.find()));

app.post('/api/students', async (req, res) => {
    const d = req.body;
    const total = Number(d.English||0)+Number(d.Hindi||0)+Number(d.Maths||0)+Number(d.EVS||0)+Number(d.GK||0);
    const student = new Student({ ...d, Total: total });
    await student.save();
    res.json({ message: "Successfully Added" });
});

app.put('/api/students/:id', async (req, res) => {
    const d = req.body;
    const total = Number(d.English||0)+Number(d.Hindi||0)+Number(d.Maths||0)+Number(d.EVS||0)+Number(d.GK||0);
    await Student.findByIdAndUpdate(req.params.id, { ...d, Total: total });
    res.json({ message: "Successfully Updated" });
});

app.delete('/api/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Successfully Deleted" });
});

app.listen(3000, () => console.log("Server at 3000"));