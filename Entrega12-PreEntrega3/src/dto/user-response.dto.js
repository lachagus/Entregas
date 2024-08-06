//Datos que se van a mostrar, a retornar del user
export const userResponseDto = (user) => {
    return {
        first_name: user.first_name,
        email: user.email,
        role: user.role,
    };
};