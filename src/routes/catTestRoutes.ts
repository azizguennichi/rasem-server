import {Router} from "express";
import {createCatTest,deleteCatTest,getAllCatTests,getCatTestById,updateCatTest,getCatTestByName} from "../controllers/catTestController"
const router: Router = Router();

router.post("/add-cat-test", createCatTest);
router.get("/get-test-by-name", getCatTestByName);
router.get("/get-all-cat-tests", getAllCatTests);
router.get("/get-cat-test-by-id/:catTestId", getCatTestById);
router.patch("/update-cat-test/:catTestId", updateCatTest);
router.delete("/delete-cat-test/:catTestId", deleteCatTest);


export default router;
