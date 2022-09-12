import Dinero from 'dinero.js'
import { Cart } from '../../src/Cart';
import { Catalog } from '../../src/Catalog';
import { checkout } from '../../src/Checkout';

test('001', () => {
    const cart = new Cart();

    expect(cart.items()).toStrictEqual({})
})

test('002', () => {
    const cart = new Cart();
    cart.add('Item 1', 1);

    expect(Object.keys(cart.items())).toHaveLength(1)

    expect(cart.contains('Item 1')).toBeTruthy()

    expect(cart.quantity('Item 1')).toStrictEqual(1)
})

test('003', () => {
    const cart = new Cart();
    cart.add('Item 1', 1);
    cart.add('Item 1', 1);

    expect(Object.keys(cart.items())).toHaveLength(1)

    expect(cart.contains('Item 1')).toBeTruthy()

    expect(cart.quantity('Item 1')).toStrictEqual(2)
})

test('004', () => {
    const cart = new Cart();
    cart.add('Item 1', 1);
    cart.add('Item 2', 2);

    expect(Object.keys(cart.items())).toHaveLength(2)

    expect(cart.contains('Item 1')).toBeTruthy()
    expect(cart.contains('Item 2')).toBeTruthy()

    expect(cart.quantity('Item 1')).toStrictEqual(1)
    expect(cart.quantity('Item 2')).toStrictEqual(2)
})

test('005', () => {
    const cart = new Cart();

    expect(Object.keys(cart.items())).toHaveLength(0)

    expect(cart.contains('Non in cart item')).toBeFalsy()

    expect(() => cart.quantity('Non in cart item')).toThrowError(new Error('NotInCartItemException'))
})

test('006', () => {
    const catalog = new Catalog()
    catalog.set('Item 1', Dinero({ amount: 10 }))

    expect(Dinero({ amount: 10 }).equalsTo(catalog.price('Item 1'))).toBeTruthy()
})

test('007', () => {
    const catalog = new Catalog()
    catalog.set('Item 1', Dinero({ amount: 10 }))
    catalog.set('Item 1', Dinero({ amount: 50 }))

    expect(Dinero({ amount: 50 }).equalsTo(catalog.price('Item 1'))).toBeTruthy()
})

test('008', () => {
    const catalog = new Catalog()
    catalog.set('Item 1', Dinero({ amount: 10 }))
    catalog.set('Item 2', Dinero({ amount: 50 }))

    expect(Dinero({ amount: 10 }).equalsTo(catalog.price('Item 1'))).toBeTruthy()
    expect(Dinero({ amount: 50 }).equalsTo(catalog.price('Item 2'))).toBeTruthy()
})

test('009', () => {
    const catalog = new Catalog()

    expect(() => catalog.price('Not cataloged item')).toThrowError(new Error('NotCatalogedItemException'))
})

test('010', () => {
    const cart = new Cart()
    const catalog = new Catalog()

    expect(() => checkout(cart, catalog)).toThrowError(new Error('EmptyCartDuringCheckoutException'))
})

test('011', () => {
    const cart = new Cart()
    cart.add('Item 1', 1)

    const catalog = new Catalog()
    catalog.set('Item 1', Dinero({ amount: 10 }))

    expect(checkout(cart, catalog).equalsTo(Dinero({ amount: 10 }))).toBeTruthy()
})

test('012', () => {
    const cart = new Cart()
    cart.add('Item 1', 1)
    cart.add('Item 1', 1)

    const catalog = new Catalog()
    catalog.set('Item 1', Dinero({ amount: 10 }))

    expect(checkout(cart, catalog).equalsTo(Dinero({ amount: 20 }))).toBeTruthy()
})

test('013', () => {
    const cart = new Cart()
    cart.add('Item 1', 1)
    cart.add('Item 2', 1)

    const catalog = new Catalog()
    catalog.set('Item 1', Dinero({ amount: 10 }))
    catalog.set('Item 2', Dinero({ amount: 50 }))

    expect(checkout(cart, catalog).equalsTo(Dinero({ amount: 60 }))).toBeTruthy()
})

test('014', () => {
    const cart = new Cart()
    cart.add('Item 1', 1)

    const catalog = new Catalog()

    expect(() => checkout(cart, catalog)).toThrowError(new Error('NotCatalogedItemException'))
})
