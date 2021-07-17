import { NextApiRequest, NextApiResponse } from "next";
import { EXAMPLE_USER } from "../../../../common/constants";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    // return a single user
    case "GET":
      return res.status(200).json(EXAMPLE_USER);
    // update a single user
    case "POST":
      return res.status(201).send(undefined);
    default:
      res.setHeader("Allow", "GET, POST");
      return res.status(405).send(undefined);
  }
}
