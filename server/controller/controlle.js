var userdb = require('../model/model');

//   create user
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content can't be empty" });
        return;
    }
    try {
        const user = new userdb({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status
        });
        const createduser = await user.save();
        res.redirect('/new_user');

        // res.status(201).send(createduser);
    } catch (e) {
        res.status(400).send(e);
    }

}
// find users
exports.find = (req, res) => {
    if (req.query.id) {

        const _id = req.query.id;
        userdb.findById(_id)
            .then(function (userd) {
                res.status(200).send(userd);
                console.log(userd);
            }).catch(err => {
                res.status(400).send(err);
            })
    } else {

        userdb.find()
            .then(function (usersdata) {
                res.status(200).send(usersdata);
            }).catch(e => {
                res.status(400).send(e);
            })

    }

}

// updating data of users
exports.update = async (req, res) => {
    try {
        const _id = req.params.id;
        const updated_user = await userdb.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(200).send(updated_user);

    } catch (e) {
        res.status(500).send(e);
    }
}
// deleting data of users
exports.delete = async (req, res) => {
    try {
        const _id = req.params.id;
        const delete_user = await userdb.findByIdAndDelete(_id);

        if (!_id) {
            return res.status(400).send();
        }
        res.status(200).send(delete_user);
    } catch (e) {
        res.status(500).send(e);
    }
}