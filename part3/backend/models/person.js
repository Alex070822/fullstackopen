require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNumberValidator = {
  validator: function (value) {
    const pattern = /^[0-9]{2,3}-[0-9]+$/
    return pattern.test(value)
  },
  message: 'Invalid format. The number should be formed of two parts that are separated by a hyphen, the first part has two or three numbers and the second part also consists of numbers.',
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: phoneNumberValidator,
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)