import {Account} from "./Account";
import moment from 'moment';
import {Budget} from "./Budget";
import {IBudgetRepo} from "./IBudgetRepo";

let account = new Account();
let start = null;
let end = null;
beforeEach(() => {
    // clean house
    start = null;
    end = null;
});

function amountShouldBe(expected) {

    expect(account.getAmount(start, end)).toBe(expected);
}

function createMoment(year, month, day) {

    return moment({year, month: month - 1, day});
}

test('Test Wrong Date', () => {
    start = createMoment(2019, 2, 1);
    end = createMoment(2019, 1, 1);
    amountShouldBe(0.00);
});

test('Test No Budget', () => {
    const iBudgetRepo = new IBudgetRepo([]);
    account = new Account(iBudgetRepo);
    start = createMoment(2019, 1, 1);
    end = createMoment(2019, 1, 1);
    amountShouldBe(0.00);
});

test('Test Whole Month', () => {
    const iBudgetRepo = new IBudgetRepo([
        new Budget('201901', 31)
    ]);
    account = new Account(iBudgetRepo);
    start = createMoment(2019, 1, 1);
    end = createMoment(2019, 1, 31);
    amountShouldBe(31.00);
});

test('Test One Day', () => {
    const iBudgetRepo = new IBudgetRepo([
        new Budget('201901', 31)
    ]);
    account = new Account(iBudgetRepo);
    start = createMoment(2019, 1, 1);
    end = createMoment(2019, 1, 1);
    amountShouldBe(1.00);
});
test('Test Cross Month', () => {
    const iBudgetRepo = new IBudgetRepo([
        new Budget('201901', 31),
        new Budget('201902', 280)
    ]);
    account = new Account(iBudgetRepo);
    start = createMoment(2019, 1, 31);
    end = createMoment(2019, 2, 1);
    amountShouldBe(11.00);
});



