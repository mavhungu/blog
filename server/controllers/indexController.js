const login_get = async (req,res)=>{
    console.log(req.session);
    const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.render('index', { title: 'Express', ipaddress });
};
const login_post = async (req, res)=>{
    const {email, password} = req.body;
    
}
const register_get = (req, res)=>{
    const error = req.session.error;
    delete req.session.error;
    res.json();
};
const register_post = async (req, res)=>{

    const { email, password } = req.body;
    //Check if user already exists

    //const user = await User.find({email})
    if(user){
        req.session.error("User already exist");
        return res.json();
    }
    return res.json();
};

module.exports = {login_get, login_post, register_post, register_get}