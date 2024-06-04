const movie = require("../models/movieModal");
const poster = require("../models/poster");
const multer = require("multer");
const fs = require("fs");

const login = async (req, res) => {
  try {
    await res.render("login");
  } catch (error) {
    console.log(error);
  }
};

const admin = async (req, res) => {
  try {
    const showData = await movie.find();
    res.render("admin", { showData });
  } catch (error) {
    console.log(error);
  }
};

// const tailerPage = async (req, res) => {
//   try {
//     const trailer = await movie.findById(req.query.id);
//     let url = trailer.trailer;
//     res.render("tailer", { url: url });
//   } catch (error) {
//     console.log(error);
//   }
// };

const addMoviePage = async (req, res) => {
  try {
    await res.render("addMovie");
  } catch (error) {
    console.log(error);
  }
};

const addPosterPage = async (req, res) => {
  try {
    await res.render("posterAdd");
  } catch (error) {
    console.log(error);
  }
};

const imageMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageUpload = multer({ storage: imageMulter }).single("image");

const addData = async (req, res) => {
  imageUpload(req, res, async (err) => {
    try {
      let image = "";
      if (req.file) {
        image = req.file.path;
        console.log(image);
      }
      const newMovie = await movie.create({
        name: req.body.name,
        date: req.body.date,
        category: req.body.category,
        rating: req.body.rating,
        dsc: req.body.dsc,
        img: image,
        // trailer: req.body.trailer,
      });
      console.log(newMovie);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  });
};

// const posterMulter = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const posterUpload = multer({ storage: posterMulter }).single("image");

// const posterData = async (req, res) => {
//   posterUpload(req, res, async (err) => {
//     try {
//       let image = "";
//       if (req.file) {
//         image = req.file.path;
//         console.log(image);
//       }
//       const newposter = await poster.create({
//         name: req.body.name,
//         date: req.body.date,
//         dsc: req.body.dsc,
//         img: image,
//         movieType: req.body.movieType
//       });
//       // console.log(newMov);
//       res.redirect("back");
//     } catch (err) {
//       console.log(err);
//     }
//   });
// };

const DeleteData = async (req, res) => {
  try {
    const id = req.query.id;
    let deleted = await movie.findById(id);

    const imgpath = deleted.img;
    await movie.findByIdAndDelete(id);

    if (imgpath && fs.existsSync(imgpath)) {
      fs.unlinkSync(imgpath);
    }
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

const editPage = async (req, res) => {
  try {
    const editDataShow = await movie.findById(req.query.id);
    console.log(editDataShow);
    res.render("edit", { val: editDataShow });
  } catch (error) {
    console.log(error);
  }
};

const updateData = async (req, res) => {
  imageUpload(req, res, async (err) => {
    console.log(req.body);
    try {
      let image = "";
      if (req.file) {
        image = req.file.path;
        console.log(image);
      } else {
        image = req.body.old_img;
      }
      let id = req.body.id;
      let updateData = await movie.findByIdAndUpdate(id, {
        name: req.body.name,
        date: req.body.date,
        category: req.body.category,
        rating: req.body.rating,
        dsc: req.body.dsc,
        img: image,
        // trailer: req.body.trailer,
      });
      console.log(updateData);
      res.redirect("/admin");
    } catch (error) {
      res.send(error);
    }
  });
};

const moviepage = async (req, res) => {
  try {
    const movies = await movie.find({ category: { $regex: /movie/i } });
    res.render("movies", { movies });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const seriespage = async (req, res) => {
  try {
    const series = await movie.find({ category: { $regex: /series/i } });
    res.render("series", { series });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const cartoonpage = async (req, res) => {
  try {
    const cartoon = await movie.find({ category: { $regex: /cartoon/i } });
    res.render("cartoon", { cartoon });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  login,
  addData,
  admin,
  DeleteData,
  updateData,
  editPage,
  addMoviePage,
  // tailerPage,
  moviepage,
  seriespage,
  cartoonpage,
};
