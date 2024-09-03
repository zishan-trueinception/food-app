// const userModel = require("../models/userModel"); 
// const authMiddleware = async (req, res, next) => {
//     try {
//       const user = await userModel.findById(req.body.Id);
//       if(user.usertype !== "admin"){
//           return res.status(401).send({
//               success: false,  
//               message: "Only Admin Access",
//           })
//       }
        
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: "Unauthorized Access",
//         }) 
//     }
// }

// module.exports = { authMiddleware }