import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return res.status(200).json("Thanks for applying to HackBeanpot 2048! <sample welcome message>");
    case "POST":
      return res.status(201).send(undefined);
    default:
      res.setHeader("Allow", "GET, POST");
      return res.status(405).send(undefined);
  }
}
