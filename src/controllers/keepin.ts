import { validationResult } from "express-validator"

const createKeepin = async (req, res) => {
  const errors = validationResult(req);
}


export default {
  createKeepin
}