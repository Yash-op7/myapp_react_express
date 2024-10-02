const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("welcome to auth");
});

const db = [];
router.post("/signup", async (req, res) => {
  try {
    const { name, password } = req.body;

    // add hashed pwd to the db
    const hashedPassword = await bcrypt.hash(password, 10);
    db.push({ name, password: hashedPassword });

    console.log(db);

    res.send(`${name} and ${password} received.`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    // check if the received user exists in the db
    const user = db.find((x) => x.name === name);

    if (!user) {
        res.status(401).send('invalid credentials. ❌');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(isValid) {
        return res.status(200).json({message:'you have provided correct credentials ✅'});
    } else {
    return res.status(401).json({ flx: 'invalid credentials. ❌' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
