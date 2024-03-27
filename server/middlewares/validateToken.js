// se va a ejecutar antes de que llegue a la ruta

export const authRequired = (req, res, next) => {   

    const cookies= req.cookies;
    console.log(cookies)

    next()
}