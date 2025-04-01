import { Request, Response } from "express";
import { Bed } from "../models/beds.model";

export const getAllBeds = async (req: Request, res: Response) => {
  try {
    const allBeds = await Bed.find();
    res.status(200).json(allBeds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching beds", error });
  }
};