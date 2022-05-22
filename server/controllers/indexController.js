const login = async (req,res)=>{
    console.log(req.session);
    const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('index', { title: 'Express', ipaddress });
}

module.exports = {login}