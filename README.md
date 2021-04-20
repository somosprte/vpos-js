# vPOS Javascript
[![Node.js CI](https://github.com/v-pos/vpos-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/v-pos/vpos-js/actions/workflows/node.js.yml)
[![](https://img.shields.io/badge/vPOS-OpenSource-blue.svg)](https://www.vpos.ao)

This javascript library helps you easily interact with the vPOS API,
Allowing merchants apps/services to request a payment from a client through his/her mobile phone number.

The service currently works for solutions listed below:

 - EMIS GPO (Multicaixa Express)

Want to know more about how we are empowering merchants in Angola? See our [website](https://vpos.ao)

### Features
- Simple interface
- Uniform plain old objects are returned by all official libraries, so you don't have
to serialize/deserialize the JSON returned by our API.

### Documentation
Does interacting directly with our API service sound better to you? 
See our documentation on [developer.vpos.ao](https://developer.vpos.ao)

## Installation
```shell
npm install vpos
```

### Configuration
This javascript library requires you set up the following environment variables on your machine before
interacting with the API using this library:

| Variable | Description | Required |
| --- | --- | --- |
| `GPO_POS_ID` | The Point of Sale ID provided by EMIS | true |
| `GPO_SUPERVISOR_CARD` | The Supervisor card ID provided by EMIS | true |
| `MERCHANT_VPOS_TOKEN` | The API token provided by vPOS | true |
| `PAYMENT_CALLBACK_URL` | The URL that will handle payment notifications | false |
| `REFUND_CALLBACK_URL` | The URL that will handle refund notifications | false |
| `VPOS_PROFILE` | The vPOS environment, leave empty for `sandbox` mode and use `"PRD"` for `production`.  | false |

or using one of the optional arguments

| Variable | Description | Required |
| --- | --- | --- |
| `posId` | The Point of Sale ID provided by EMIS | false |
| `supervisorCard` | The Supervisor card ID provided by EMIS | false |
| `token` | The API token provided by vPOS | false |
| `paymentCallbackUrl` | The URL that will handle payment notifications | false |
| `refundCallbackUrl` | The URL that will handle refund notifications | false |
| `environment` | The vPOS environment, leave empty for `sandbox` mode and use `'PRD'` for `production`.  | false |

Don't have this information? [Talk to us](suporte@vpos.ao)

Given you have set up all the environment variables above with the correct information, you will now
be able to authenticate and communicate effectively with our API using this library. 

The next section will show the various payment actions that can be performed by you, the merchant.

### Create a Instance
Creates a new vPOS instance

```javascript
const Vpos = require('vpos')

// use the default environment variables option
let merchant = new Vpos();

// or use optional arguments option
let merchant = new Vpos({environment: 'PRD', token: 'your_token_here'})
```

### Get all Transactions
This endpoint retrieves all transactions.

```javascript
let transactions = await merchant.getTransactions({});
```

### Get a specific Transaction
Retrieves a transaction given a valid transaction ID.

```javascript
let response = await merchant.getTransaction({transactionId: '1jYQryG3Qo4nzaOKgJxzWDs25Ht'});
```

| Argument | Description | Type |
| --- | --- | --- |
| `transactionId` | An existing Transaction ID | `string`

### New Payment Transaction
Creates a new payment transaction given a valid mobile number associated with a `MULTICAIXA` account
and a valid amount.

```javascript
let payment = await merchant.newPayment({amount: '123.45', customer: '915898553'});
```

| Argument | Description | Type |
| --- | --- | --- |
| `mobile` | The mobile number of the client who will pay | `string`
| `amount` | The amount the client should pay, eg. "259.99", "259,000.00" | `string`

### Request Refund
Given an existing `parent_transaction_id`, request a refund.

```javascript
let response = await merchant.newRefund({parentTransactionId: '1kTFGhJH8i58uD9MdJpMjWnoE'});
```

| Argument | Description | Type |
| --- | --- | --- |
| `parent_transaction_id` | The ID of transaction you wish to refund | `string`

### Poll Transaction Status
Poll the status of a transaction given a valid `request_id`. 

Note: The `request_id` in this context is essentially the `transaction_id` of an existing request. 

```javascript
let response = await merchant.getRequest({requestId: '1jYQryG3Qo4nzaOKgJxzWDs25Ht'});
```
##### Complete `getRequest()` example with additional Context

```javascript
let payment = await merchant.newPayment({amount: '123.45', customer: '915889553'});
refundId = merchant.getRequestId({response: payment})

let response = await merchant.getRequest({requestId: refundId});
```

| Argument | Description | Type |
| --- | --- | --- |
| `requestId` | The ID of transaction you wish to poll | `string`

### Have any doubts?
In case of any doubts, bugs, or the like, please leave an issue. We would love to help.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

License
----------------

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).