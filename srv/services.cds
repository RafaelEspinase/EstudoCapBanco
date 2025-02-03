using { sap.capire.banks as my } from '../db/schema';

/**
 * Service used by support personell, i.e. the Accounts' 'processors'.
 */
service ProcessorService { 
    entity Accounts as projection on my.Accounts;

    @readonly
    entity Customers as projection on my.Customers;
    
    entity Extract as projection on my.Extract;
}

/**
 * Service used by administrators to manage customers and Accounts.
 */
service AdminService {
    entity Customers as projection on my.Customers;
    entity Accounts as projection on my.Accounts;
    entity Extract as projection on my.Extract;
    }
