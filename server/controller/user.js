/** @controller = controller001 **/

const userDao = require('../dao/user')

const getUser = async (req, res) => {
    let dt = await userDao.getUsers()
    return res.status(200).send({ data: dt });
}

const postUser = async (req, res) => {
    console.log(req.body)
    let dt = {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone
    }
    await userDao.addUser(dt)
    return res.status(200).send({ message: 'data posted' });

}

const deleteUser = async (req, res) => {
    await userDao.deleteUser(req.body.id);
    return res.status(200).send({ message: 'deleted successfully' });
}

const updateUser = async (req, res) => {
    console.log(req.body)
    await userDao.updateUser(req.body);
    return res.status(200).send({ message: 'updated successfully' });
}

module.exports = {
    getUser,
    postUser,
    deleteUser,
    updateUser
}