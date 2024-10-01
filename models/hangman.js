const mongoose = require('mongoose');

const HangmanSchema = new mongoose.Schema({

});

const Hangman = mongoose.model("Hangman", HangmanSchema);

module.exports = Hangman;

