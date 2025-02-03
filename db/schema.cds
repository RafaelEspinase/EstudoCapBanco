using { cuid, managed, sap.common.CodeList } from '@sap/cds/common';
namespace sap.capire.banks; 


entity Accounts : cuid, managed {  
customer      : Association to Customers;
key ID        : String  @title : 'Title';
balance       : String;
}

entity Customers : managed { 
key ID        : String;
firstName     : String;
lastName      : String;
name          : String = firstName ||' '|| lastName;
email         : EMailAddress;
phone         : PhoneNumber;
accounts      : Association to many Accounts on accounts.customer = $self;
addresses     : Composition of many Addresses on addresses.customer = $self;
}

entity Addresses : cuid, managed {
customer      : Association to Customers;
city          : String;
postCode      : String;
streetAddress : String;
}

entity Extract : cuid, managed {
key ID        : String; 
customer      : Association to Customers;
account       : Association to Accounts;
date          : type of managed:createdAt;
lastBalance   : String;
newBalance    : String;
}

type EMailAddress : String;
type PhoneNumber  : String;
