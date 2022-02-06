const express = require('express');
const app = express();
const mongoose = require('mongoose');
const RestaurantRoutes = require('./RestaurantRoutes.js');

mongoose
	.connect('mongodb+srv://rootRoot:root@cluster0.aungh.mongodb.net/gbc_full_stack?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected'));
app.use(RestaurantRoutes);

app.listen(3000, () => {
	console.log('Server is running...');
});
