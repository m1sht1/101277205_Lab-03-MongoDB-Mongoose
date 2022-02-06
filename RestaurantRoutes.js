const express = require('express');
const mongoose = require('mongoose');
const restaurantModel = require('./model/Restaurant.js');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const app = express();

//http://localhost:8081/restaurants
app.get('/restaurants', async (req, res) => {
	const restaurants = await restaurantModel.find({});

	try {
		res.send(restaurants);
	} catch (err) {
		res.status(500).send(err);
	}
});
// http://localhost:8081/restaurants/cuisine/Japanese
app.get('/restaurants/cuisine/:name', async (req, res) => {
	const name = req.params.name;
	const cuisine = await restaurantModel.find({ cuisine: name });

	try {
		if (cuisine.length != 0) {
			res.send(cuisine);
		} else {
			res.send(JSON.stringify({ status: false, message: 'No data found' }));
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get('/restaurant', async (req, res) => {
	//console.log(req.query)
	if (Object.keys(req.query).length != 1) {
		res.send(JSON.stringify({ status: false, message: 'Insufficient query parameter' }));
	} else {
		const order = req.query.sortBy;

		if (order == 'ASC') {
			restaurants = await restaurantModel
				.find({})
				.select('_id cuisine name city restaurant_id')
				.sort({ restaurant_id: 1 });
		} else if (order == 'DESC') {
			restaurants = await restaurantModel
				.find({})
				.select('_id cuisine name city restaurant_id')
				.sort({ restaurant_id: -1 });
		}

		try {
			if (restaurants.length != 0) {
				res.send(restaurants);
			} else {
				res.send(JSON.stringify({ status: false, message: 'No data found' }));
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
});

app.get('/restaurants/Delicatessen', async (req, res) => {
	// const name = req.params.name
	const restaurant = await restaurantModel
		.find({ $and: [{ cuisine: 'Delicatessen' }, { city: { $not: { $eq: 'Brooklyn' } } }] })
		.select('cuisine name city ')
		.sort({ name: 1 });

	try {
		if (restaurant.length != 0) {
			res.send(restaurant);
		} else {
			res.send(JSON.stringify({ status: false, message: 'No data found' }));
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

//  http://localhost:8081/save
app.post('/save', jsonParser, async function (req, res) {
	const data = new restaurantModel({
		_id: mongoose.Types.ObjectId(),
		address: {
			building: req.body.address.building,
			street: req.body.address.street,
			zipcode: req.body.address.zipcode,
		},
		city: req.body.city,
		cuisine: req.body.cuisine,
		name: req.body.name,
		restaurant_id: req.body.restaurant_id,
	});
	data.save()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.warn(err);
		});
});
module.exports = app;
