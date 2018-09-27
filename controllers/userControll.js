const User = require('../models/userModel');



//Handle user login
exports.login_get = (req, res) => {
   res.render("userLogin1.ejs");
}
exports.login_post = (req, res) => {
    let customer ={};
    User.authentication(req.body.username, req.body.password).then((object)=>{
        req.session.user = req.body.username;
        customer.state = "ok";
        res.send(customer);
    }, (err)=>{
        customer.state = "fail";
        customer.username = req.body.username;
        customer.password = req.body.password;
        res.send(customer);
    })
}
//Handle user sign up
exports.signup_get = (req, res) => { 
    res.render("userSignup1.ejs");
}
exports.signup_post = async (req, res) => { 
    const rs = await User.add(req.body);
    User.authentication(req.body.username, req.body.password).then((object)=>{
        req.session.user = rs.username;
        res.redirect('/manager/1');
    }, (err)=>{
        console.log(err);
    })
}

//user Logout
exports.userLogout = (req, res) => {
    req.session.user = undefined;
    res.redirect('/user/login');
}



