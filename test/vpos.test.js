const assert = require('assert');
const Vpos = require('../vpos.js');

let merchant = new Vpos({});
let refundId = "";
let refundTransaction = "";

describe('vPOS', () => {
  describe('Payments', () => {
    describe('Positives', () => {
      it('should create a new payment request transaction', async () => {
        let response = await merchant.newPayment({amount: '123.45', customer: '900000000'});
        assert.strictEqual(response.status_code, 202);
      });
    });

    describe('Negatives', () => {
      it('should not create a new payment request transaction if token is invalid', async () => {
        let merchantPayment = new Vpos({token: 'sdyfisdhfsdiut'})
        let response = await merchantPayment.newPayment({amount: '123.45', customer: '925888553'});
        assert.strictEqual(response.status_code, 401);
      });

      it('should not create a new payment request transaction if customer format is invalid', async () => {
        let response = await merchant.newPayment({amount: '123.45', customer: '92588855'});
        assert.strictEqual(response.status_code, 400);
      });

      it('should not create a new payment request transaction if amount format is invalid', async () => {
        let response = await merchant.newPayment({amount: '123.45.67', customer: '925888553'});
        assert.strictEqual(response.status_code, 400);
      });
    });
  });

  describe('Refunds', () => {
    describe('Positives', () => {
      it('should create a new refund request transaction', async () => {
        let response = await merchant.newPayment({amount: '123.45', customer: '925888553'})
        let paymentId = await merchant.requestId({response: response});

        response = await merchant.newRefund({parentTransactionId: paymentId});
        assert.strictEqual(response.status_code, 202);
      });
    });

    describe('Negatives', () => {
      it('should not create a new refund request transaction if token is invalid', async () => {
        let merchantRefund = new Vpos({token: 'jkshfisdufgsd'})
        let response = await merchantRefund.newRefund({parentTransactionId: '1jYQryG3Qo4nzaOKgJxzWDs25Hv'});
        assert.strictEqual(response.status_code, 401);
      });

      it('should not create a new refund request transaction if parent_transaction_id is not present', async () => {
        let response = await merchant.newRefund({});
        assert.strictEqual(response.status_code, 400);
      });

      it('should not create a new refund request transaction if supervisor_card is invalid', async () => {
        let merchantRefund = new Vpos({supervisorCard: '12345678910111213'});
        let response = await merchantRefund.newRefund({parentTransactionId: '1jYQryG3Qo4nzaOKgJxzWDs25Hv'});
        assert.strictEqual(response.status_code, 400);
      });
    });
  });

  describe('Transactions', () => {
    describe('Positives', () => {
      it('should get a single transaction', async () => {
        let response = await merchant.newPayment({amount: '123.45', customer: '925888553'})
        let paymentId = await merchant.requestId({response: response});

        response = await merchant.getTransaction({transactionId: paymentId});
        assert.strictEqual(response.status_code, 200);
      });
    });

    describe('Negatives', () => {
      it('should not get a non existent single transaction', async () => {
        let response = await merchant.getTransaction({transactionId: '1jYQryG3Qo4nzaOKgJxzWDs25H'});
        assert.strictEqual(response.status_code, 404);
      });

      it('should not get a single transaction if token is invalid', async () => {
        let merchantTransaction = new Vpos({token: 'kjsdfhsdiufs'})
        let response = await merchantTransaction.getTransaction({transactionId: '1jYQryG3Qo4nzaOKgJxzWDs25H'});
        assert.strictEqual(response.status_code, 401);
      });
    });
  });

  describe('Requests', () => {
    describe('Positives', () => {
      it('should get a running single request status', async () => {
        let response = await merchant.newPayment({amount: '123.45', customer: '900000000'});
        let paymentRequest = await merchant.getRequest({response: response});

        assert.strictEqual(paymentRequest.status_code, 200);
      });

      it('should get a completed single request status', async () => {
        let response = await merchant.newPayment({amount: '123.45', customer: '900000000'});
        assert.strictEqual(response.status_code, 202);
      });
    });

    describe('Negatives', () => {
      it('should not get a single request status if token is invalid', async () => {
        let secondMerchantRequest = new Vpos({token: 'jhfsdfutsdufgs'})
        let response = await merchant.newPayment({amount: '123.45', customer: '925888553'});

        let secondResponse = await secondMerchantRequest.getRequest({response: response})
        assert.strictEqual(secondResponse.status_code, 401);
      });
    });
  });
});