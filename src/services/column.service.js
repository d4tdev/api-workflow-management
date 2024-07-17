const ColumnModel = require('../models/column.model')
const BoardModel = require('../models/board.model')
const CardModel = require('../models/card.model')

const createNew = async (data) => {
   try {
      // Sử dụng transaction mongodb
      const newColumn = await ColumnModel.createNew(data)
      newColumn.cards = []

      // Update columnOrder Array in Board collection
      await BoardModel.pushColumnOrder(
         newColumn.boardId.toString(),
         newColumn._id.toString()
      )

      return newColumn
   } catch (err) {
      throw new Error(err)
   }
}

const updateOne = async (id, data) => {
   try {
      const updateData = { ...data, updatedAt: Date.now() }
      if (updateData._id) delete updateData._id
      if (updateData.cards) delete updateData.cards
      const updatedColumn = await ColumnModel.updateOne(id, updateData)

      if (updatedColumn.data._destroy) {
         await CardModel.updateMany(updatedColumn.data.cardOrder, {
            _destroy: true,
         })
      } else {
         await CardModel.updateMany(updatedColumn.data.cardOrder, {
            _destroy: false,
         })
      }

      return updatedColumn
   } catch (err) {
      throw new Error(err)
   }
}

const ColumnService = { createNew, updateOne }

module.exports = ColumnService
