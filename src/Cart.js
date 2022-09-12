export class Cart {
    #items = {}

    add(name, quantity) {
        const currentQuantity = this.#items[name] || 0;
        const newQuantity = currentQuantity + quantity

        this.#items[name] = newQuantity;
    }

    contains(name) {
        return this.#items.hasOwnProperty(name)
    }

    items() {
        return this.#items;
    }

    quantity(name) {
        if (this.contains(name)) {
            return this.#items[name]
        }

        throw new Error('NotInCartItemException')
    }
}
