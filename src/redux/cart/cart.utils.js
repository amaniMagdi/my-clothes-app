export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
        );
        //existingCartItem = undefined if there isn't 1st match
        //existingCartItem = true if there is 1st match
        if(existingCartItem) {
            return cartItems.map( //here we will re-generate array of objects.
                cartItem => cartItem.id === cartItemToAdd.id 
                ? {...cartItem, quantity: cartItem.quantity + 1} 
                // ...cartItem => its mean that I expanded the cartItem properties and added quantity property
                //spread all cartItem props and increased the quantity by 1
                : cartItem
                )
        }
        return [...cartItems, {...cartItemToAdd , quantity: 1} ] 
        //if existingCartItem = undefined and quantity will be 1

}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )
    if(existingCartItem.quantity === 1 )
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id )

    return cartItems.map(
        cartItem =>
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity-1}
        : cartItem
    )
}