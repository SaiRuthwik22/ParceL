import { asyncHandler } from "../middlewares/asyncHandler.js";
import {Cart} from "../models/cart.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const addItemToCart = asyncHandler(async(req,res)=>{
    const {productId,quantity}= req.body
try {
    if (!productId || !quantity) {
        throw new ApiError(400, "productId and quantity are required");
      }
        const cartObject = {
            productId,
            quantity
        }
       const userCart= await Cart.findOne({owner:req.user?._id})
       if(userCart){
        const existingProduct = userCart.product.find(product => product.productId==productId)
        if(existingProduct){
          existingProduct.quantity +=quantity
        }
        else{
          userCart.product.push(cartObject)
        }
       await userCart.save({validateBeforeSave:false})

        return res.json(new ApiResponse(200,userCart,"item added successfully"))
       }
       else{
            const userNewCart =  await Cart.create([{product:[cartObject],owner:req.user?._id}])
            const createdCart = await Cart.findOne({owner:req.user?._id})
            return res.json(new ApiResponse(200,createdCart,"successfully created cart and added"))
        }
} catch (error) {
    throw new ApiError(500,"internal error")
}
})

const deleteItemInCart = asyncHandler(async(req,res)=>{
    const {productId,quantity} = req.body
    if(!productId || !quantity){
        throw new ApiError(404,"productid and quantity is required for deletion")
    }
    const userCart = await Cart.findOne({owner:req.user._id})
    if(!userCart){
      throw new ApiError(404,"userCArt not found")
    }
    const existingProduct = userCart.product.find(product=> product.productId == productId)
    if(existingProduct.quantity > quantity){
      existingProduct.quantity -=quantity
    }
    else{
      existingProduct.quantity = 0
    }
    userCart.product = userCart.product.filter(item=>item.quantity>0)
    await userCart.save({validateBeforeSave:false})
    return res.status(200)
    .json(new ApiResponse(200,userCart,"deleted successfully"))
    


})

const getCart = asyncHandler(async(req,res)=>{
    const userCart = await Cart.aggregate([
        {
          $match: {
            owner: req.user._id
          }
        },
        {
          $unwind: "$product"
        },
        {
          $lookup: {
            from: "products",
            localField: "product.productId",
            foreignField: "_id",
            as: "result"
          }
        },
        {
          $unwind: "$result"
        },
        {
          $addFields: {
            singleAmount: {
              $multiply: ["$result.price", "$product.quantity"]
            }
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$singleAmount"
            },
            products: {
              $push: {
                _id:"$result._id",
                quantity: "$product.quantity",
                title: "$result.title",
                image: "$result.image",
                price: "$result.price",
                description: "$result.description",
                singleAmount: "$singleAmount"
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
            products: 1
          }
        }
      ]
      )
    if(!userCart){
        return res.json(new ApiResponse(200,{},"cart is empty"))
    }
    return res.json(new ApiResponse(200,userCart,"user cart fetched successful"))
})


export{addItemToCart,deleteItemInCart,getCart}