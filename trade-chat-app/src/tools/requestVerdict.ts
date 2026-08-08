import {
    validateTrade,
    type TradeVerdict,
} from "../services/mockValidationService";

export function requestVerdict(
    playerCount: number
): TradeVerdict {

    return validateTrade(playerCount);
}


