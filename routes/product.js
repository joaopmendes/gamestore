const { Router } = require(`express`);
const routes = Router();
const ProductController = require("../Controllers/ProductController");
const ProductControllerAdmin = require("../Controllers/BackOffice/ProductControllerAdmin");
routes.get("/", ProductController.index);
routes.post("/", ProductControllerAdmin.store);

module.exports = routes;
