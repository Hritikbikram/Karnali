module.exports.updatefilecheck = (req, res, next) => {
  const path = require("path");
  const fs = require("fs");
  try {
    // console.log(req.files);

    if (req.files) {
      const { aboutImage } = req.files;
      const imageExtension = path.extname(aboutImage.name);
      const extension = [".png", ".jpg", ".jpeg"];
      if (extension.includes(imageExtension)) {
        aboutImage.mv(`./uploads/company/${aboutImage.name}`);
        req.CImage = `/uploads/company/${aboutImage.name}`;
        return next();
      } else {
        return res
          .status(400)
          .json({ status: "error", message: "Unspported Image Format" });
      }
    } else {
      return next();
    }
  } catch (e) {
    return res.status(400).json({ status: "error", message: `${e}` });
  }
};
