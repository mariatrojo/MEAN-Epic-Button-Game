var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var clickCount = 0;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(8000, function() {
	console.log("Epic Button Game on port 8000!")
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log('Client/socket is connected!');
	console.log('Client/socket id is ', socket.id);

	socket.on("epic_button_pressed", function(data) {
		console.log('Someone clicked the epic button!')
		clickCount++;
		io.emit('buttonUpdate', clickCount);
	});

	socket.on("reset_button_pressed", function(data) {
		console.log('Someone clicked reset!')
		clickCount = 0;
		io.emit('buttonUpdate', clickCount);
	})

});