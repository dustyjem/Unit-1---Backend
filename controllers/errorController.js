const errorController = {}
errorController.throwError = async(req, res, next) =>{
    try{
        throw new Error("Server Error")
    }
    catch(error){
        next({status:500})
    }
}
 
module.exports = errorController;