import { NextApiRequest, NextApiResponse } from "next";
import { EXAMPLE_USER } from "../../../../common/constants";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    // get all the admins
    case "GET":
      return res.status(200).json([EXAMPLE_USER, EXAMPLE_USER]);
    default:
      res.setHeader("Allow", "GET");
      return res.status(405).send(undefined);
  }
}
