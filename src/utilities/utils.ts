import { OperatorConfig } from "../types";
import {validators} from "./constants";

export default {
    validateOperatorConfig: (operator: OperatorConfig): {isValid: boolean, message?: string} => {
        const {accountId, privateKey} = operator;

        if(!accountId || !privateKey){
            return {
                isValid: false,
                message: 'Operator accountId and privateKey are required'
            };
        }

        if(!accountId.match(validators.accountId) && !privateKey.match(validators.privateKey)){
            return {
                isValid: false,
                message: 'Operator accountId and privateKey are invalid'
            };
        }

        if(!accountId.match(validators.accountId)){
            return {
                isValid: false,
                message: 'Operator accountId is invalid'
            }
        }

        if(!privateKey.match(validators.privateKey)){
            return {
                isValid: false,
                message: 'Operator privateKey is invalid'
            }
        }

        return {
            isValid: true
        };
    }
}