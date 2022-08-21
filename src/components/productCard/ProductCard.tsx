import { Box, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { BASE_URL, IMAGES } from "configs/url.config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IProduct } from "types/interfaces.types";
import { colorGenerator, persianNumber } from "utils/functions.util";

export default function ProductCard({ product }: { product: IProduct }) {
  const [img, setImg] = useState(`${BASE_URL}${IMAGES}/${product.images[0]}`);
  const [selectedColor, setSelectedColor] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setImg(`${BASE_URL}${IMAGES}/${product.images[0]}`);
    setSelectedColor(0);
  }, [product]);
  useEffect(() => {
    setImg(`${BASE_URL}${IMAGES}/${product.images[selectedColor * 3]}`);
  }, [selectedColor]);

  const ColorCircleStyle = styled(Box)<{ shoeColor?: string }>(
    ({ shoeColor }) => ({
      borderRadius: "50%",
      backgroundColor: shoeColor,
      width: 15,
      height: 15,
    })
  );
  const CircleBoxStyle = styled(Box)<{ selected: boolean }>(({ selected }) => ({
    borderRadius: "50%",
    padding: 3,
    border: selected ? "2px solid blue" : "2px solid #d4d0d0",
    marginRight: 5,
    "&:hover": {
      cursor: "pointer",
    },
  }));
  return (
    <Link to={`/tehranshoes/product/${product.id}`}>
      <Card elevation={1}>
        <Box
          sx={{
            minHeight: "400px",
          }}
        >
          <CardMedia
            component="img"
            height="250"
            image={img}
            alt="shoe photo"
            onMouseEnter={() =>
              product.images.length >= selectedColor * 3 + 2 &&
              setImg(
                `${BASE_URL}${IMAGES}/${product.images[selectedColor * 3 + 2]}`
              )
            }
            onMouseLeave={() =>
              product.images.length >= selectedColor * 3 &&
              setImg(
                `${BASE_URL}${IMAGES}/${product.images[selectedColor * 3]}`
              )
            }
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate(`/tehranshoes/product/${product.id}`)}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              textAlign={"right"}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/tehranshoes/product/${product.id}`)}
            >
              {product.name}
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              marginTop={5}
              alignItems={"center"}
            >
              <Box display={"flex"}>
                {product.colors.map((color, index) => (
                  <CircleBoxStyle
                    selected={index === selectedColor}
                    onClick={() => setSelectedColor(index)}
                  >
                    <ColorCircleStyle shoeColor={colorGenerator(color)} />
                  </CircleBoxStyle>
                ))}
              </Box>
              <Typography variant="subtitle1" textAlign={"left"}>
                {persianNumber(product.price.toString())}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Link>
  );
}
