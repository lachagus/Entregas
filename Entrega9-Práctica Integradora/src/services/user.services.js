//Servicios exclusivos de los users. Lógica de negocios.
import userDao from "../dao/user.dao.js";

//Recibe la data del user a crear y retorna el user creado
const registerUser = async (userData) => {
    return await userDao.create(userData);
};

//Recibe la query y retorna el user que cumple con la query
const getOnUser = async (query) => {
    return await userDao.getOne(query);
};

export default { registerUser, getOnUser };