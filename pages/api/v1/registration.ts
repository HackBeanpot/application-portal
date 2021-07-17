import { NextApiRequest, NextApiResponse } from "next";
import { EXAMPLE_RESPONSE } from "../../../common/constants";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(EXAMPLE_RESPONSE);
    case "POST":
      return res.status(201).send(undefined);
    default:
      res.setHeader("Allow", "GET, POST");
      return res.status(405).send(undefined);
  }
}
