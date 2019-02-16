export class Account {
    _iBudgetRepo;

    constructor(iBudgetRepo) {
        this._iBudgetRepo = iBudgetRepo;
    }

    /**
     *
     * @param first
     * @param last
     * @return {number}
     */
    getAmount(first, last) {

        if (first.isAfter(last)) {
            return 0.00;
        }
        const allBudget = this._iBudgetRepo.getAll();

        const extFisrt = first.clone().startOf('month');
        const extLast = last.clone().endOf('month');
        let total = 0;
        while (extLast > extFisrt) {
            total += allBudget[Account.getAccountYearMonth(extFisrt)];
            extFisrt.add(1, 'month');
        }
        total -= allBudget[Account.getAccountYearMonth(first)] * (first.date() - 1) / first.daysInMonth();
        total -= allBudget[Account.getAccountYearMonth(last)] * (last.daysInMonth() - last.date()) / last.daysInMonth();
        return total || 0.00;
    }

    static getAccountYearMonth(moment) {
        return moment.format('YYYYMM');
    }
}