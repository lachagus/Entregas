//Capa de persistencia del user. Es la que se comunica con la BD. 
//Se migró del DAO.
//En esta capa se pueden agregar más métdos o funcines además de las CRUD, para esto sirve, para más lógica.
import { userModel } from "../models/user.model.js";

const getAllUsers = async (query, options) => {
    const users = await userModel.paginate(query, options);
    return users;
};

const getUserById = async (id) => {
    const user = await userModel.findById(id);
    return user;
};

const getUserByEmail = async (email) => {
    const user = await userModel.findOne({ email });
    return user;
};

const createUser = async (data) => {
    const user = await userModel.create(data);
    return user;
};

const updateUser = async (id, data) => {
    const user = await userModel.findByIdAndUpdate(id, data, { new: true });
    return user;
};

const deleteUser = async (id) => {
    const user = await userModel.deleteOne({ _id: id });
    if (user.deletedCount === 0) return false;
    return true;
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};