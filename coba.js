// core module
const os = require("os");
const fs = require("fs");
// local module
const luasSegitiga = require("./luasSegitiga.js");

// membuat file menggunakan module fs
fs.writeFileSync("text.txt", "bikin file");

// membaca file menggunakan module fs
const data = fs.readFileSync("text.txt", "utf8"); // utf8 itu encoding (karakter2 yang digunakan untuk bikin file)
console.log(data);

console.log("Hello, World");
console.log(os.hostname());
console.log(luasSegitiga(3, 4));

// third party module itu adalah nodemon
