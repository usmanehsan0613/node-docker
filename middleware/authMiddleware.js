const protect = (req, res, next) => {
    const { user} = req.session;

    if( !user){
        return res.status(401).json({ status : 'fail', message: 'Unauth'});
    }

    req.user = user;

    // next method will be called , in controller. 
    next();
}

module.exports = protect;