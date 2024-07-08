import { userModel } from "./models/user.model.js";

//Retorna todos los users por algún método (query, si no se envía nada, trae todo, sino por lo que se filtra en la query)
const getAll = async (query) => {
    return await userModel.find(query);
};

//Retorna un user
const getOne = async (query) => {
    return await userModel.findOne(query); // por ej. { name: "Agustina" } o {email: "chagusbigand@gmail.com"}, con esto se ahorra de hacerlo por ejmplo getbyid, getby...
};

//Crea user
const create = async (data) => {
    return await userModel.create(data);
};

//Actualiza user
const update = async (id, data) => {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
};

//Borra user
const deleteOne = async (id) => {
    return await userModel.deleteOne({ _id: id });
};

export default { getAll, getOne, create, update, deleteOne };