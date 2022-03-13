const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", [authJwt.verifyToken], controller.getAll);
  app.get("/api/user/identityNumber/:identityNumber",[authJwt.verifyToken], controller.getByIdentityNumber);
  app.get("/api/user/accountNumber/:accountNumber",[authJwt.verifyToken], controller.getByAccountNumber);
};
