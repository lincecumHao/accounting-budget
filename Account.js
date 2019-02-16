export class Account {
    _iBudgetRepo;

    constructor(iBudgetRepo) {
        this._iBudgetRepo = iBudgetRepo;
    }

    /**
     *
     * @param first {moment}
     * @param last
     * @return {number}
     */
    getAmount(first, last) {

        if (first.isAfter(last)) {
            return 0.00;
        }
        const allBudget = this._iBudgetRepo.getAll();

        // whole month
        let amount = allBudget[Account.getAccountYearMonth(first)];

        amount -= allBudget[Account.getAccountYearMonth(first)] * (first.daysInMonth() - last.date()) / first.daysInMonth();
        amount -= allBudget[Account.getAccountYearMonth(first)] * (first.date() - 1) / first.daysInMonth();

        return amount || 0;
    }

    static getAccountYearMonth(moment) {
        return moment.format('YYYYMM');
    }
}