export interface TradeVerdict {
    isValid: boolean;
    summary: string;
}

export function validateTrade(
    playerCount: number
): TradeVerdict {

    if (playerCount > 0) {
        return {
            isValid: true,
            summary: "Trade contains at least one player.",
        };
    }

    return {
        isValid: false,
        summary: "Trade contains no players.",
    };
}


