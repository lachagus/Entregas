import bcrypt from 'bcrypt';

//Fn. que hashea la pwd
export const createHash = (password) => {

    //Retorna con un método que se ocupa del hasheo
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//Fn. que valida la pwd
export const isValidPassword = (user, password) => {

    //Chequea el pwd recibido por el body con el pwd de la BD
    return bcrypt.compareSync(password, user.password);
};