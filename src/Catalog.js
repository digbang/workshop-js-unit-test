export class Catalog {
    #priceList = {}

    set(name, price) {
        this.#priceList[name] = price
    }

    price(name) {
        if (this.#priceList.hasOwnProperty(name)) {
            return this.#priceList[name]
        }

        throw new Error('NotCatalogedItemException')
    }
}
