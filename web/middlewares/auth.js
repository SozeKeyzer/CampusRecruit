
export const auth = async (req, res, next) => {
  if(req.session.isLoggedIn){
    next();
  }
  else{
    res.redirect('/error');
  }
};