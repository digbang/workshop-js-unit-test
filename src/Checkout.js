import Dinero from 'dinero.js'

function assertEmptyCart(cart) {
    if (Object.keys(cart.items()).length < 1) {
        throw new Error('EmptyCartDuringCheckoutException')
    }
}

export function checkout(cart, catalog) {
    assertEmptyCart(cart)

    let total = Dinero({ amount: 0 })

    for (const [item, quantity] of Object.entries(cart.items())) {
        total = total.add(catalog.price(item).multiply(quantity))
    }

    return total
}
