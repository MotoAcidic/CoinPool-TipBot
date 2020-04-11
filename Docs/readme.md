# MYSQL Commands
To select from a table by username:
```
select * from user where username = "Tfinch";
```

To update a balance but dont use this unless you really have to
```
update user set balance='17.20071073' where username='Tfinch';
```

Use this to insert a record in the deposits table if a txid was not recorded for a deposit
Make sure to make the credit field 0 so the db will credit the amount missed.
```
INSERT INTO `deposits` (`id`, `address`, `amount`, `txid`, `confirmations`, `credited`, `datetime`, `coin_price`) VALUES (NULL, 'NXvf6iujbuknWAJSrLBYfCgJ8324mp5yJh', '500', 'dedd7e7db0875503fb4ff9ae4a2a005fa14f3806230e1f271634e3d1a391ed65', '999', '0', CURRENT_TIMESTAMP, '0');
```

To rename Mysql data base make this script
```
#!/bin/bash

dbuser=xxxx
dbpass=xxxx
olddb=xxxx
newdb=xxxx

mysqlconn="mysql -u $dbuser -p$dbpass -h localhost"

$mysqlconn -e "CREATE DATABASE $newdb"
params=$($mysqlconn -N -e "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE table_schema='$olddb'")

for name in $params; do
      $mysqlconn -e "RENAME TABLE $olddb.$name to $newdb.$name";
      echo "Renamed $olddb.$name to $newdb.$name";
done;

#$mysqlconn -e "DROP DATABASE $olddb"
```