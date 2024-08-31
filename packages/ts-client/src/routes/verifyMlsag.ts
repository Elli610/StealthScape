import { Request, Response, Router, json } from "express";
import { hexDecodeMLSAG, verifyMlsag } from "../utils/mlsag";


const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {

    const body = req.body as { hexSignature: string };
    res.json({
      isValid: verifyMlsag(hexDecodeMLSAG(body.hexSignature)),
    });

  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});

export default router;
