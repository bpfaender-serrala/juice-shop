
import path = require('path')
import { type Request, type Response } from 'express'
import { challenges } from '../data/datacache'

import challengeUtils = require('../lib/challengeUtils')

module.exports = function servePremiumContent () {
  return (req: Request, res: Response) => {
    challengeUtils.solveIf(challenges.premiumPaywallChallenge, () => { return true })
    res.sendFile(path.resolve('frontend/dist/frontend/assets/private/JuiceShop_Wallpaper_1920x1080_VR.jpg'))
  }
}
