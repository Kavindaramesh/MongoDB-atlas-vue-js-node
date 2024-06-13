const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/employees', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Employee Schema and Model
const employeeSchema = new mongoose.Schema({
    employee_ID: String, // Add employee_ID field
  personal_details: {
    
    first_name: String,
    last_name: String,
    date_of_birth: Date,
    gender: String,
    address: String,
  },
  contact_details: {
    phone_numbers: [String],
    email_addresses: [String],
    emergency_contact: {
      name: String,
      relationship: String,
      phone: String,
    },
  },
  employment_information: {
    position: String,
    department: String,
    date_of_joining: Date,
    salary: Number,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/employees', async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    res.status(201).send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
