const http = require("http");
const fs = require("fs");
const url = require("url");

function onRequest(request, response) {
	const data = fs.readFileSync("cars.json", "utf8");
	const q = url.parse(request.url, true).query;
	const dataParse = JSON.parse(data);
	const search = q.name
		? dataParse.cars.find((el) => el.name == q.name)
		: dataParse;

	response.writeHead(200, { "Content-Type": "application/json" });
	response.write(JSON.stringify(search, null, 2));
	response.end();
	// response.writeHead(200); // angka 200 ini adalah status code
	// response.write("Hello World"); // menampilkan body
	// const cars = fs.readFileSync("cars.json", "utf8");
	// response.writeHead(200, { "Content-Type": "application/json" }); // menentukan tipe data yang dikirim
	// response.write(cars);
	// response.end();
}
const server = http.createServer(onRequest);
server.listen(3000); // 3000 itu portnya, bisa diganti jika protnya sudah dipakai
