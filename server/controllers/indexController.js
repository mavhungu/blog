const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const login_get = async (req,res)=>{
    console.log(req.session);
    const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('index', { title: 'Express', ipaddress });
};
const login_post = async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      req.session.error = "Invalid Credentials";
      return res.json({"error":"Invalid Credentials"});
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      req.session.error = "Invalid Credentials";
      return res.json({"error":"Invalid Credentials"});
    }
  
    req.session.isAuth = true;
    req.session.username = user.username;
    res.json({"message":"/dashboard"});

}
const register_get = (req, res)=>{
    const error = req.session.error;
    delete req.session.error;
    res.json();
};
const register_post = async (req, res)=>{

    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
  
    if (user) {
      req.session.error = "User already exists";
      return res.json();
    }
  
    const hasdPsw = await bcrypt.hash(password, 12);
  
    user = new User({
      username,
      email,
      password: hasdPsw,
    });
  
    await user.save();
};

module.exports = {login_get, login_post, register_post, register_get}