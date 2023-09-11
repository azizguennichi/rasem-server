import { NextFunction, Request, Response } from "express";
import CatTest from "../models/CatTest";
import Test from "../models/Test";
import Logging from "../utils/log";


export const createCatTest = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const tests = await Test.find({_id:{$in:req.body.tests}});
        const newCatTest = new CatTest({
            productMode:req.body.productMode,
            tests,
        });       
        const savedCatTest = await newCatTest.save();
        res.status(201).json(savedCatTest); 
    } catch (error:any) {
        Logging.error(error.message);
        console.log(error)
        res.status(500).json({ message: error });
    }
}

export const getAllCatTests = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const catTests = await CatTest.find({});
        res.status(200).json(catTests);
    } catch (error:any) {
        Logging.error(error.message);
        res.status(500).json({ message: error });
    }
}
export const getCatTestById = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const catTestId = req.params.catTestId;
        const catTest = await CatTest.findById(catTestId);
        if(!catTest){
            res.status(404).json({message:"CatTest not found"});
        }
        res.status(200).json(catTest);
    } catch (error:any) {
        Logging.error(error.message);
        res.status(500).json({ message: error });
    }
}

export const updateCatTest = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const catTestId = req.params.catTestId;
        const catTest = await CatTest.findByIdAndUpdate(catTestId,req.body,{new:true});
        if(!catTest){
            res.status(404).json({message:"CatTest not found"});
        }
        res.status(200).json(catTest);
    } catch (error:any) {
        Logging.error(error.message);
        res.status(500).json({ message: error });
    }
}
export const deleteCatTest = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const catTestId = req.params.catTestId;
        const catTest = await CatTest.findByIdAndDelete(catTestId);
        if(!catTest){
            res.status(404).json({message:"CatTest not found"});
        }
        res.status(200).json(catTest);
    } catch (error:any) {
        Logging.error(error.message);
        res.status(500).json({ message: error });
    }
}