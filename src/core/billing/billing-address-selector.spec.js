import { getErrorResponseBody } from '../common/error/errors.mock';
import { getQuoteState } from '../quote/quotes.mock';
import BillingAddressSelector from './billing-address-selector';

describe('BillingAddressSelector', () => {
    let billingAddressSelector;
    let state;

    beforeEach(() => {
        state = {
            quote: getQuoteState(),
        };
    });

    describe('#getBillingAddress()', () => {
        it('returns the current billing address', () => {
            billingAddressSelector = new BillingAddressSelector(state.quote);

            expect(billingAddressSelector.getBillingAddress()).toEqual(state.quote.data.billingAddress);
        });
    });

    describe('#getUpdateError()', () => {
        it('returns error if unable to update', () => {
            const updateBillingAddressError = getErrorResponseBody();

            billingAddressSelector = new BillingAddressSelector({
                ...state.quote,
                errors: { updateBillingAddressError },
            });

            expect(billingAddressSelector.getUpdateError()).toEqual(updateBillingAddressError);
        });

        it('does not returns error if able to update', () => {
            billingAddressSelector = new BillingAddressSelector(state.quote);

            expect(billingAddressSelector.getUpdateError()).toBeUndefined();
        });
    });

    describe('#isUpdating()', () => {
        it('returns true if updating billing address', () => {
            billingAddressSelector = new BillingAddressSelector({
                ...state.quote,
                statuses: { isUpdatingBillingAddress: true },
            });

            expect(billingAddressSelector.isUpdating()).toEqual(true);
        });

        it('returns false if not updating billing address', () => {
            billingAddressSelector = new BillingAddressSelector(state.quote);

            expect(billingAddressSelector.isUpdating()).toEqual(false);
        });
    });
});
