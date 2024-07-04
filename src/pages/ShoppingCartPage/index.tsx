
import { Link } from 'react-router-dom';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button, Box, Container } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { CartItem, useCart } from '../../context/cartContext/CartContext';
import { calculateTotalPrice , fetchDataFromLocalStorage, deleteCartItemFromLocalStorage } from '../../utils';


const ShoppingCartPage = () => {
  const { incrementItemQuantity, decrementItemQuantity, removeFromCart } = useCart();

  const handleIncrement = (item: CartItem) => {
    incrementItemQuantity({ cart: {...item,quantity:item.quantity+1,id:item.id ||fetchDataFromLocalStorage().length} });
  };

  const handleDecrement = (item: CartItem) => {
    decrementItemQuantity({ cart: {...item,quantity:item.quantity-1>0?item.quantity-1:1,id:item.id ||fetchDataFromLocalStorage().length} });
  };

  const handleRemove = (item: CartItem) => {
    deleteCartItemFromLocalStorage(item.id);
    removeFromCart({ cart: item });
  };

  

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4} mb={4} p={2}>
        <Typography variant="h5" gutterBottom>My Shopping Cart</Typography>
        {fetchDataFromLocalStorage()?.length === 0 ? (
          <Typography variant="body1">Your cart is empty. <Link to="/">Browse products</Link></Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fetchDataFromLocalStorage()?.map(item => (
                  <TableRow key={item.product.id}>
                    <TableCell>
                      <img src={item.product.image} alt={item.product.title} style={{ width: 50, height: 50 }} />
                    </TableCell>
                    <TableCell>{item.product.title}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDecrement(item)}><RemoveIcon /></IconButton>
                      {item.quantity}
                      <IconButton onClick={() => handleIncrement(item)}><AddIcon /></IconButton>
                    </TableCell>
                    <TableCell>${calculateTotalPrice(item.product.price, item.quantity)}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="secondary" onClick={() => handleRemove(item)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default ShoppingCartPage;
