import { NextFunction, Request, Response } from "express";
import TestResult from "../models/TestResult";
import Test from "../models/Test";
import Logging from "../utils/log";
import Machine from "../models/Machine";

export const createTestResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTestResult = new TestResult({
            productMode:req.body.productMode,
            serialNumber:req.body.serialNumber,
            tests:req.body.tests
        });
        const savedTestResult = await newTestResult.save();
        const machine = new Machine({
            productMode:req.body.productMode,
            serialNumber:req.body.serialNumber,
            macAdress:req.body.macAdress,
            productModel:req.body.productModel,
            probelength:req.body.probelength,
            potdiam:req.body.potdiam,
            potlength:req.body.potlength,
            potwidth:req.body.potwidth,
            sprinkleduration:req.body.sprinkleduration,
            sprinklefreq:req.body.sprinklefreq,
            sprinkletargettimestamp:req.body.sprinkletargettimestamp,
            sprinklemode:req.body.sprinklemode,
            thresholdmin:req.body.thresholdmin,
            thresholdmax:req.body.thresholdmax,
            probecurrent:req.body.probecurrent,
            batterycurrent:req.body.batterycurrent
        });
        
        let allPass = true; 

        for (const test of savedTestResult.tests) {
        if (test.result === "fail") {
            allPass = false; 
            break; 
        }
    }
    if (allPass) {
        machine.testGlobale = "pass";
    } else {
        machine.testGlobale = "fail";
    }
    await machine.save();
       return res.status(201).json(savedTestResult);
        
    } catch (error:any) {
        Logging.error(error.message);
        res.status(500).json({ message: error });
    }
}