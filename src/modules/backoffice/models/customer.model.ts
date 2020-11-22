import { User } from './user.model';
import { CreditCard } from './credit-card.model';
import { Address } from './address.model';
import { Pet } from './pet.model';

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public user: User
    ) {
        
    }
}