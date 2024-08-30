const validateBody = (req, res, next) => {
    const { body } = req

    
    if (body.id_device == undefined || body.id_device == ""){
       // res.status(400).json({message: "The id_device is required"})
    }
    next()
}

module.exports = {
    validateBody
}