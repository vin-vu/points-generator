jest.mock('../data/receiptStorage', () => ({}))

const receiptStorage = require('../data/receiptStorage')

const { saveReceipt, getPoints } = require('../controller/receiptsController')

describe('Receipts Controller', () => {
  describe('saveReciept', () => {
    it('should save receipt and return the ID', () => {

      const mockReq = {body: {retailer: 'Target'}, id: '123'}
      const mockRes = {send: jest.fn()}
      const mockNext = jest.fn()

      saveReceipt(mockReq, mockRes, mockNext)

      expect(receiptStorage).toHaveProperty('123', {retailer: 'Target'})
      expect(mockRes.send).toHaveBeenCalledWith({id: '123'})
      expect(mockNext).not.toHaveBeenCalled()
    })
  })
})
