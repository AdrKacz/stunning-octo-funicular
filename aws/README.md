# AWS Account

AWS account linked to university mail.

# Architecture

Model : [simple-websockets-chat-app](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:729047367331:applications~simple-websockets-chat-app)

## Details, Lambda Application

**ApiGateway** *$connect*, *$disconnect* and *sendmessage* socket actions.

Each action triggers a **Lambda** function:
 - *$connect* triggers *OnConnectFunction* that stores the *connectionID* in the **DynamoDB** table *ConnectionsTable*

 - *$disconnect* triggers *OnDisconnectFunction* that removes the item *connectionID* from the **DynamoDB** table *ConnectionTable*

 - *sendmessage* triggers *SendMessageFunction* that transfer the message to each *connectionID* stores in the **DynamoDB** table *ConnectionTable*, including to the emitter of the message.

# Code modification

None
