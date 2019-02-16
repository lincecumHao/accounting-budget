import {Account} from "./Account";
import moment from 'moment';

let account = new Account();
let start = null;
let end = null;
beforeEach(() => {
    account = new Account();
    // clean house
    start = null;
    end = null;
});
test('Test No Budget', () => {
    start = createMoment(2019, 1, 1);
    end = createMoment(2019, 1, 1);
    amountShouldBe(0.00);
});

function amountShouldBe(expected) {
    expect(account.getAmount(start, end)).toBe(expected);
}

function createMoment(year, month, day) {
    return moment({year, month, day});
}

test('Test Wrong Date', () => {
    start = createMoment(2019, 2, 1);
    end = createMoment(2019, 1, 1);
    amountShouldBe(0.00);
});


