export class Account {
    allBudget = [];

    constructor(iBudgetRepo) {
        if(iBudgetRepo){
            this.allBudget = iBudgetRepo.getAll();
        }
    }

    /**
     *
     * @param first
     * @param last
     * @return {number}
     */
    first = null;
    last = null;
    getAmount(first, last) {
        this.first = first;
        this.last = last;
        if (first.isAfter(last)) {
            return 0.00;
        }

        const extFirst = first.clone().startOf('month');
        const extLast = last.clone().endOf('month');
        let total = null;
        while (extLast > extFirst) {
            total += this.getBudgetAmount(extFirst);
            extFirst.add(1, 'month');
        }
        total -= this.excludeFirstMonth();
        total -= this.excludeLastMonth();
        return total || 0.00;
    }

    excludeLastMonth(last = this.last) {
        return this.getBudgetAmount(last) * (last.daysInMonth() - last.date()) / last.daysInMonth();
    }

    excludeFirstMonth(first = this.first) {
        return this.getBudgetAmount(first) * (first.date() - 1) / first.daysInMonth();
    }

    getBudgetAmount(moment) {
        return this.allBudget[Account.getAccountYearMonth(moment)];
    }

    static getAccountYearMonth(moment) {
        return moment.format('YYYYMM');
    }
}