import { useSelector, useDispatch } from 'react-redux';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
  selectItemsInCart,
} from '../redux/slices/cartSlice';
import { CDN_URL } from '../pages/RestaurantList';

const CartItemList = () => {
  const cartItems = useSelector(selectItemsInCart);
  const dispatch = useDispatch();
console.log(cartItems);

  const removeItem = (id) => dispatch(removeFromCart({ id }));
  const decreaseQuantity = (id) => dispatch(decreaseItemQuantity({ id }));
  const increaseQuantity = (id) => dispatch(increaseItemQuantity({ id }));

  // console.log('cart: ', cartItems);

  if (cartItems.length === 0) {
    return (
      <div className='flex grow min-h-[vh] justify-center items-center'>
        <p>Your cart is empty!</p>
      </div>
    );
  }

  return (
    <ul className='basis-7/12'>
      {cartItems &&
        cartItems.map((item) => (
          <li
            key={item?.item?.card?.info?.id}
            className='flex gap-4 justify-between max-w-[600px] my-4'
          >
            <div className='basis-3/12'>
              <img
                className='w-full h-full md:h-auto object-cover block rounded-md aspect-square'
                src={CDN_URL + item?.item?.imageId}
                alt=''
              />
            </div>
            <div className='basis-9/12'>
              <p className='text-lg font-semibold'>
                {item?.item?.name}
              </p>

              <p className='hidden md:block'>
                {item?.item?.card?.info?.description?.length > 100
                  ? item?.item?.card?.info?.description.slice(0, 100) + '...'
                  : item?.item?.card?.info?.description}
              </p>

              <p className='my-2 space-x-1'>
                <span className='font-semibold'>
                  ₹
                  {parseFloat(
                    (
                      item?.quantity * parseFloat(item?.item?.price / 100)
                    ).toFixed(2)
                  )}
                </span>
                <span className='text-gray-800 font-normal'>
                  ({item?.item?.price / 100} × {item?.quantity})
                </span>
              </p>

              {/* actions */}
              <div className='flex justify-between items-center mt-2'>
                <div className='flex items-center'>
                  <button
                    onClick={() => decreaseQuantity(item?.item?.id)}
                    disabled={item?.quantity === 1}
                    className={
                      'minus'
                    }
                  >
                    -
                  </button>
                  <p className='number'>
                    { item?.quantity }
                  </p>
                  <button
                    onClick={() => increaseQuantity(item?.item?.id)}
                    className='add'
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item?.item?.id)}
                  className='remove-button'
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CartItemList;