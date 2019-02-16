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
        const diffDay = Math.abs(first.diff(last, 'days')) + 1;
        return allBudget[this.getAccountYearMonth(first)] / first.daysInMonth() * diffDay || 0.00;
    }

    getAccountYearMonth(moment) {
        return moment.format('YYYYMM');
    }
}