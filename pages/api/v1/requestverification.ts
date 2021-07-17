import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return res.status(201).send(undefined);
    default:
      res.setHeader("Allow", "POST");
      return res.status(405).send(undefined);
  }
}
