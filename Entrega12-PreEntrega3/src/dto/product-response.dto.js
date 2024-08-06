//Datos que se van a mostrar al cliente del producto, no todo el payLoad.
//Se pueden formatear para que se muestren distinto.
export const productResponseDto = (product) => {
    return {
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail,
        product_code: product.code,
        stock: product.stock,
        price: product.price,
        category: product.category,
    };
};