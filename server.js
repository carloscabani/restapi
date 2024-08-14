require('dotenv').config()

 const express = require('express');
 const bodyParser = require('body-parser');
 const admin = require('firebase-admin');
 const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_API)
 const swaggerUi = require('swagger-ui-express')

 const swaggerFile = require('./swagger_output.json')

 const authToken = require('./middleware/auth_token.js');

 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
 });

 const app = express();
 app.use(bodyParser.json());
 
 const PORT = process.env.PORT || 5000;
 
 app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile))
 
 app.use('/api', authToken, require('./routes/api'));
 
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });