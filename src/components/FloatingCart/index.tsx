import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    let cartTotalSum = 0;

    products.map(p => {
      p.quantity > 1
        ? (cartTotalSum += p.price * p.quantity)
        : (cartTotalSum += 1);

      return cartTotalSum;
    });

    return formatValue(cartTotalSum);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    let totalItensInCartSum = 0;

    products.map(p => {
      totalItensInCartSum += p.quantity;

      return totalItensInCartSum;
    });

    return totalItensInCartSum;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
