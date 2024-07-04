import React, { useContext, useState, useEffect } from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Container, Link, Box, Slider, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { ProductsContext } from '../../context/ProductsContext/ProductsContext';
import { Product } from '../../types';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Link as RouterLink } from 'react-router-dom';
import { mainProcessCategories } from '../../utils';


const ProductList: React.FC = () => {
  const { state } = useContext(ProductsContext);
  const { products, loading, error } = state;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState< string[] | undefined>([]);
 
  useEffect(() => {
    const fetchData = async () => {
      const data = await mainProcessCategories(products);
      setCategories(data );
    };

    fetchData();
  }, [products]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    filterProducts();
  }, [priceRange, filterCategories]);

  const filterProducts = () => {
    let filtered = products;

    if (priceRange) {
      filtered = filtered.filter((product : Product) => product.price >= priceRange[0] && product.price <= priceRange[1]);
    }

    if (filterCategories.length > 0) {
      filtered = filtered.filter((product : Product) => filterCategories.includes(product.category));
    }

    setFilteredProducts(filtered);
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.name;
    if (filterCategories.includes(category)) {
      setFilterCategories(prev => prev.filter(item => item !== category));
    } else {
      setFilterCategories(prev => [...prev, category]);
    }
  };

  const truncateDescription = (description: string, length: number) => {
    if (description.length <= length) return description;
    return description.substring(0, length) + '...';
  };

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleReadMoreClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Container>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 3fr' }} gap={2}>
        <Box component="aside" display="flex" flexDirection="column" alignItems="center" padding={2}>
          <Typography variant="h6" gutterBottom>
            Filter by Price
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={1}
            marks={[
              { value: 0, label: '$0' },
              { value: 1000, label: '$1000' }
            ]}
            style={{ width: '80%' }}
          />
          <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
            Filter by Category
          </Typography>
          <FormGroup>
            {categories?.map((category:any, index:number) => (
              <FormControlLabel
                key={index}
                control={<Checkbox checked={filterCategories.includes(category)} onChange={handleCategoryChange} name={category} />}
                label={category}
              />
            ))}
          </FormGroup>
        </Box>
        <Grid container spacing={3} style={{ margin: '20px 0' }}>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : error ? (
            <Typography variant="h6" color="error">{error}</Typography>
          ) : (
            filteredProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                  <CardActionArea style={{ flex: 1 }}>
                    <Link component={RouterLink} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                      />
                      <CardContent style={{ flex: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {expandedId === product.id ? product.description : truncateDescription(product.description, 25)}
                          {product.description.length > 25 && (
                            <Link component="button" onClick={() => handleReadMoreClick(product.id)}>
                              {expandedId === product.id ? ' Show Less' : ' Read More'}
                              <ReadMoreIcon style={{ verticalAlign: 'middle' }} />
                            </Link>
                          )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Price: ${product.price}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductList;
