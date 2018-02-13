var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Book = require('./Book.model');

var app = express();
var Port = 3000;
var db = 'mongodb://localhost/example';
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, res){
	res.send('Router working fine');
});
app.get('/book', function(req, res){
	Book.find({}, function(err, result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})
});
app.get('/book2/:id', function(req, res){
	Book.findOne({_id: req.params.id}, function(err, result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})
});
/********************************************************************/
app.post('/book', function(req, res){
	var bookInfo = new Book();
		bookInfo.title = req.body.title;
		bookInfo.auther = req.body.auther;
		bookInfo.category = req.body.category;
	bookInfo.save(function(err, result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})
})
app.post('/book2', function(req, res){
	Book.create(req.body, function(err, result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})
})

/**************************************************************/
app.put('/book/:id', function(req, res){
	Book.findOne({_id: req.params.id}, function(err, result){
		if(err){
			console.log(err);
		}
		result.title = req.body.title;
		result.author = req.body.author;
		result.category = req.body.category;
		result.save(function(err, bookInfo){
			if(err){
				console.log(err);
			}
			else{
				console.log(bookInfo);
				res.send(bookInfo);
			}
		})
	})
});
/////////////////////////////////////////
app.put('/book3/:id', function(req, res){
	var data = {
		title :req.body.title,
		author : req.body.author,
		category : req.body.category
	}

	Book.findOneAndUpdate({_id: req.params.id},{$set: data}, 
		{upsert: true, new: true},
		function(err, result){
			if(err){
				console.log(err);
			}
			else{
				console.log(result);
				res.send(result);
			}
	})
});
/**********************Single Object***********************************/
app.put('/book2/:id', function(req, res){
	Book.findOneAndUpdate({_id: req.params.id},{$set: {title: req.body.title}}, 
		{upsert: true},
		function(err, result){
			if(err){
				console.log(err);
			}
			else{
				console.log(result);
				res.send(result);
			}
	})
});

/************************************************************************/
app.delete('/book/:id', function(req, res){
	Book.findOneAndRemove({_id: req.params.id}, function(err, result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})
})

app.listen(Port, function(){
	console.log('Server running successfully '+ Port);
})