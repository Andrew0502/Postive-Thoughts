const express = require("express");
const db = require("../models");

const router = express.Router();

// router.get("/user", (req, res) => {
//   db.User.findAll().then((allUser) => {
//     res.render("users/users", { allUser: allUser });
//   });
// });

router.get("/:id", (req, res) => {
  db.User.findById(req.params.id)
    .then((foundUser) => {
      console.log(foundUser);
      res.json(foundUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "there has been an error.",
      });
    });
});

router.post("/sign-up", (req, res) => {
  const newUser = {
    fullName: req.body.fullName,
    birthday: req.body.birthday,
    phoneNumber: req.body.phoneNumber,
    username: req.body.username,
    password: req.body.password,
  };
  db.User.create(newUser).then((newUser) => {
    res.json(newUser);
  });
});

router.post("/login", (req, res) => {
  db.User.findOne({email:req.body.email}).then((foundUser) => {
    res.json(foundUser);
  });
});

// router.put("/api/user/:id", (req, res) => {
//   db.User.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((updatedUser) => {
//       console.log(updatedUser);
//       res.json({
//         error: false,
//         data: updatedUser,
//         message: "Successfully updated profile.",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: true,
//         data: null,
//         message: "Unable to update profile.",
//       });
//     });
// });

// router.delete("/api/user/:id", (req, res) => {
//   db.User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedUser) => {
//       console.log(deletedUser);
//       res.json({
//         error: false,
//         data: deletedUser,
//         message: "Successfully deleted profile.",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: true,
//         data: null,
//         message: "Unable to delete profile.",
//       });
//     });
// });

module.exports = router;
