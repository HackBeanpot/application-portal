import { NextApiRequest, NextApiResponse } from "next";
import { EXAMPLE_USER } from "../../../../common/constants";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    // get a single applicant
    case "GET":
      return res.status(200).json(EXAMPLE_USER);
    // update a single applicant
    case "POST":
      return res.status(201).send(undefined);
    default:
      res.setHeader("Allow", "GET, POST");
      return res.status(405).send(undefined);
  }
}
