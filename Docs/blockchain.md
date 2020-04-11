gettransaction "txid" ( includeWatchonly )

Get detailed information about in-wallet transaction <txid>

Arguments:
1. "txid"    (string, required) The transaction id
2. "includeWatchonly"    (bool, optional, default=false) Whether to include watchonly addresses in balance calculation and details[]

Result:
{
  "amount" : x.xxx,        (numeric) The transaction amount in btc
  "confirmations" : n,     (numeric) The number of confirmations
  "bcconfirmations" : n,   (numeric) The number of blockchain confirmations
  "blockhash" : "hash",  (string) The block hash
  "blockindex" : xx,       (numeric) The block index
  "blocktime" : ttt,       (numeric) The time in seconds since epoch (1 Jan 1970 GMT)
  "txid" : "transactionid",   (string) The transaction id.
  "time" : ttt,            (numeric) The transaction time in seconds since epoch (1 Jan 1970 GMT)
  "timereceived" : ttt,    (numeric) The time received in seconds since epoch (1 Jan 1970 GMT)
  "details" : [
    {
      "account" : "accountname",  (string) The account name involved in the transaction, can be "" for the default account.
      "address" : "News24address",   (string) The News24 address involved in the transaction
      "category" : "send|receive",    (string) The category, either 'send' or 'receive'
      "amount" : x.xxx                  (numeric) The amount in btc
      "vout" : n,                       (numeric) the vout value
    }
    ,...
  ],
  "hex" : "data"         (string) Raw data for transaction
}

Examples:
> News24-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
> News24-cli gettransaction "1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d" true
> curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "gettransaction", "params": ["1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"] }' -H 'content-type: text/plain;' http://127.0.0.1:9251/
 (code -1)
