import { NextFunction, Request, Response } from "express";
import CatTest from "../models/CatTest";
import Test from "../models/Test";
import Logging from "../utils/log";


export const createCatTest = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        if(!req.body.productMode || req.body.productMode === ""){
            return res.status(400).json({message:"Product mode is required"})
        }
        const tests = await Test.find({_id:{$in:req.body.tests}});
        const newCatTest = new CatTest({
            productMode:req.body.productMode,
            tests,
            modeTest:req.body.modeTest,
            timeTest:req.body.timeTest
        });       
        const savedCatTest = await newCatTest.save();
        res.status(201).json(savedCatTest); 
    } catch (error:any) {
        Logging.error(error.message);
        console.log(error)
        res.status(500).json({ message: error });
    }
}
export const getCatTestByName = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const nameQuery = req.query.nameQuery;
        // Populate the 'tests' field
        const testFind = await CatTest.find({ productMode: nameQuery }).populate({
            path: 'tests',
            populate: {
                path: 'souTests',
            },
        });
        console.log(testFind)
        res.status(200).json(testFind);
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