import { expect } from '@playwright/test'

export class ProductsPage {

    constructor (page){

        this.page = page;
        this.productTitle = page.locator('[data-test="title"]');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');

    }

    async verifyProductsPage() {
        await expect(this.productTitle).toBeVisible();
    }

    async addProductToCart(productName) {

        await this.page
            .locator(".inventory_item")
            .filter({ hasText: productName })
            .getByRole("button", { name: "Add to cart" })
            .click();
    }

    async openCart() {
        await this.shoppingCart.click();
    }
}

