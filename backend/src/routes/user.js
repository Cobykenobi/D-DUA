diff --git a/backend/src/routes/user.js b/backend/src/routes/user.js
index 36b5f7b236a4347ebf3c35b1b9bac7347b68fe21..7d1192edfa887344d3fe7ce90c70a94b88f297fb 100644
--- a/backend/src/routes/user.js
+++ b/backend/src/routes/user.js
@@ -1,27 +1,27 @@
 const express = require('express');
-const bcrypt = require('bcryptjs');
+const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const User = require('../models/User');
 
 const router = express.Router();
 
 // Реєстрація
 router.post('/register', async (req, res) => {
   const { login, password } = req.body;
   if (!login || !password) {
     return res.status(400).json({ message: 'Login and password are required' });
   }
   const candidate = await User.findOne({ login });
   if (candidate) {
     return res.status(400).json({ message: 'User already exists' });
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const user = new User({ login, password: hashedPassword });
   await user.save();
   res.status(201).json({ message: 'User registered successfully' });
 });
 
 // Логін
 router.post('/login', async (req, res) => {
   const { login, password } = req.body;
   if (!login || !password) {
