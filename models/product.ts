import * as utils from '../lib/utils'
import * as challengeUtils from '../lib/challengeUtils'
import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  DataTypes,
  type CreationOptional,
  type Sequelize
} from 'sequelize'
import { type BasketItemModel } from './basketitem'
import { challenges } from '../data/datacache'
import * as security from '../lib/insecurity'

class Product extends Model<
InferAttributes<Product>,
InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare description: string
  declare price: number
  declare deluxePrice: number
  declare image: string
  declare BasketItem?: CreationOptional<BasketItemModel> 
}

const ProductModelInit = (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      description: {
        type: DataTypes.STRING,
        set (description: string) {
          // Check if the challenge is enabled and solve it if the condition is met
          if (utils.isChallengeEnabled(challenges.restfulXssChallenge)) {
            challengeUtils.solveIf(challenges.restfulXssChallenge, () => {
              return utils.contains(
                description,
                '<iframe src="javascript:alert(`xss`)">'
              )
            })
          } else {
            const sanitizedDescription = security.sanitizeSecure(description.split('').reverse().join('')).split('').reverse().join('')
            description = sanitizedDescription.replace(/</g, '&lt;').replace(/>/g, '&gt;')
          }
          this.setDataValue('description', description)
        }
      },
      price: DataTypes.DECIMAL,
      deluxePrice: DataTypes.DECIMAL,
      image: DataTypes.STRING
    },
    {
      tableName: 'Products',
      sequelize,
      paranoid: true
    }
  )
}

export { Product as ProductModel, ProductModelInit }
