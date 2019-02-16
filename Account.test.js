import {Account} from "./Account";
import moment from 'moment';

test('Test No Budget', () => {

    let account = new Account();
    const start = moment({year: 2019, month: 2, day: 1});
    const end = moment({year: 2019, month: 2, day: 1});
    expect(account.getAmount(start, end)).toBe(0.00);
});
test('Test Wrong Date', () => {

    let account = new Account();
    const start = moment({year: 2019, month: 2, day: 1});
    const end = moment({year: 2019, month: 1, day: 1});
    expect(account.getAmount(start, end)).toBe(0.00);
});

