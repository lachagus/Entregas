import { userModel } from "../models/user.model.js";

//Trae todos los users
const getAll = async () => {

    const users = await userModel.find;
    return users;
};

const getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
};

//Recibe un email y busca por ese
const getByEmail = async (email) => {
    const user = await userModel.findOne({ email });
    return user;
};

//Recibe la data que se va a almacenar en la BD
const create = async (data) => {
    const user = await userModel.create(data);
    return user;
};

//Recibe un ID del user a actualizar y la data que se actualiza
const update = async (id, data) => {

    await userModel.findByIdAndUpdate(id, data);

    //Busca el user
    const user = await userModel.findById(id);

    //Retorna el user ya actualizado
    return user;
};

//Recibe el ID a eliminar, tiene que conicidir el ID con el de mongo
const deleteOne = async (id) => {
    const user = await userModel.deleteOne({ _id: id });

    //Manejo del error desde esta capa DAO
    if (user.deletedCount === 0) return false;

    //Retorna true porque avisa que se ha eliminado ese user
    return true;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    getByEmail
};