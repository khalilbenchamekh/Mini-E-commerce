 import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardMedia, Paper, Rating, Divider } from '@mui/material';
import { ProductsContext } from '../../context/ProductsContext/ProductsContext';
import { Lock, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../../context/cartContext/CartContext';
import { calculateTotalPrice, fetchDataFromLocalStorage } from '../../utils';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { state  } = useContext(ProductsContext);
    const { products } = state;
    const product = products?.find((p: any)=> p.id.toString() === productId);

    const [quantity, setQuantity] = useState<number>(1);
    const cartContext= useCart();

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (product ) {
            const newCartItem = { product, quantity, id: fetchDataFromLocalStorage().length + 1 };

            const existingCartItems = localStorage.getItem('cartItems');
            let updatedCartItems = [];
    
            if (existingCartItems) {
                updatedCartItems = JSON.parse(existingCartItems);
            } else {
                updatedCartItems = [];
            }
            updatedCartItems.push(newCartItem);

            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

            cartContext.addToCart({ cart: newCartItem });
        }
    };
    
    if (!product) {
        return (
            <Container>
                <Typography variant="h6">Product not found!</Typography>
            </Container>
        );
    }


    return (
        <Container sx={{ marginTop: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Card style={{ height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="auto"
                            image={product.image}
                            alt={product.title}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box p={2}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 100, color: '#333', marginBottom: "20px", textAlign: 'left' }}>
                            {product.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ fontSize: '0.8rem', textAlign: 'left' }}>
                            {product.description}
                        </Typography>
                        <Box display="flex" alignItems="center" mt={2}>
                            <Rating name="product-rating" value={product.rating.rate} readOnly />
                            <Typography variant="body2" style={{ marginLeft: '10px' }}>{product.rating.rate} ({product.rating.count} reviews)</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box p={2} component={Paper} elevation={3} style={{ borderRadius: '8px', height: '100%', width: '100%' }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variant="body1">Price: ${calculateTotalPrice(product.price,quantity)}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Button onClick={decreaseQuantity} variant="outlined" style={{ marginRight: '10px' }}>-</Button>
                            <Typography variant="body1">{quantity}</Typography>
                            <Button onClick={increaseQuantity} variant="outlined" style={{ marginLeft: '10px' }}>+</Button>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            style={{ marginTop: '20px' }}
                            fullWidth
                        >
                            Add to Cart
                        </Button>
                        <Box mt={2}>
                            <Divider />
                            <Box mt={2}>
                                <Typography variant="body2" display="flex" alignItems="center">
                                    <ShoppingCart sx={{ marginRight: '5px' }} /> Worldwide Shipping
                                </Typography>
                                <Typography variant="body2" display="flex" alignItems="center">
                                    <Lock sx={{ marginRight: '5px' }} /> Secure Payment
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetailPage;