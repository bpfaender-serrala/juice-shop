
import config from 'config'
import { type Request, type Response } from 'express'

module.exports = function retrieveAppConfiguration () {
  return (_req: Request, res: Response) => {
    res.json({ config })
  }
}
