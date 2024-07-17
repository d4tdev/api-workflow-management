const CardModel = require('../models/card.model')
const ColumnModel = require('../models/column.model')

const createNew = async (data) => {
   try {
      const newCard = await CardModel.createNew(data)

      // Update cardOrder Array in Board collection
      await ColumnModel.pushCardOrder(
         newCard.columnId.toString(),
         newCard._id.toString()
      )

      return newCard
   } catch (err) {
      throw new Error(err)
   }
}

const updateOne = async (id, data) => {
   try {
      const updateData = { ...data, updatedAt: Date.now() }
      if (updateData._id) delete updateData._id

      const updatedCard = await CardModel.updateOne(id, updateData)

      return updatedCard
   } catch (err) {
      throw new Error(err)
   }
}

const CardService = { createNew, updateOne }

module.exports = CardService 
