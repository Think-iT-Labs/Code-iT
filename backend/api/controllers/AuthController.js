/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
axios =  require('axios');

var AuthController = {
  /**
   * @param {Object} req
   * @param {Object} res
   */
  getAccessToken: function (req, res) {

    const loginData = {
              "code" :  req.body.code ,
              "client_id" : req.body.client_id ,
              "client_secret" : req.body.client_secret
    }
    console.log(loginData)
    axios.post('https://github.com/login/oauth/access_token/' , loginData)
         .then((resp) => {           
          return res.send(resp.data);
    })
    .catch(
      (err) =>   res.send(err)
    )

  }
};

module.exports = AuthController;
