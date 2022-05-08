const db = require("../../../config/sequelize");

exports.addCollege = async function (req, res) {
  let { rank, university, city, aboutUniversityLink } = req.body;

  try {
    const college = await db.College.create({
      rank,
      college: university,
      city,
      aboutCollegeLink: aboutUniversityLink,
    });

    res.status(201).send(college);
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.getColleges = async function (req, res) {
  try {
    let colleges = await db.College.findAll();
    res.status(200).send(colleges);
  } catch (error) {
    res.status(500).send({ err: err.message });
  }
};
