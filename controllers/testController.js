const testUserController = (req,res)=>{
    try {
        res.status(200).send({
            successfull:"true",
            message:"Welcome to test user API"
        })
    } catch (error) {
        console.log('Error in Api',error);
    }
}



module.exports = { testUserController }