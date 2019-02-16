import {Budget} from "./Budget";

export class IBudgetRepo {
    _budgets;

    constructor(budgets) {
        this._budgets = budgets;
    }

    getAll() {
        const budgets = {};
        this._budgets.forEach(budget => {
            budgets[budget._accountYearMonth] = budget._amount;
        });
        return budgets;
    }
}