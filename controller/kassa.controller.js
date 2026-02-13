const formidable = require('formidable');
class KassaController {KassaController
    constructor() {
        this.data = []; // Initialize the data array in the constructor
    }
    notif = (req, res) => {
        const form = new formidable.IncomingForm();
  
        form.parse(req, (err, fields, files) => {
        if (err) {
          res.status(400).json({ error: 'An error occurred while parsing form data.' });
          return;
        }

        // Process form data and files as needed
        console.log('Form Fields:', fields);
        console.log('Uploaded Files:', files);
        console.log('bruh')
        this.data.push({})

        res.status(200).json({ message: 'Form data received successfully.' });
        })
        
        
    }
    getData = (req, res) => {
        res.json(this.data)
    }
    success = (req, res) => {
        res.json("success")
    }
    failure = (req, res) => {
        res.json("failure")
    }
}

module.exports = new KassaController()