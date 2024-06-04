const { Router } = require("express");
const {
  addData,
  login,
  admin,
  DeleteData,
  updateData,
  addMoviePage,
  editPage,
  tailerPage,
  moviepage,
  seriespage,
  cartoonpage,
} = require("../controller/controle");
const { movieCheck, seriesCheck, cartoonCheck } = require("../middleware/middleware");
const route = Router();

route.get("/", login);
route.post("/admin", admin);
route.get("/admin", admin);
route.post("/addData", addData);
route.get("/addMoviePage", addMoviePage);
route.get("/deleteData", DeleteData);
route.get("/editPage", editPage);
route.post("/editData", updateData);
// route.get("/tailer", tailerPage);
route.get("/movie", movieCheck, moviepage);
route.get("/series", seriesCheck, seriespage);
route.get("/cartoon", cartoonCheck, cartoonpage);

module.exports = { route };
