import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputBase,
  InputLabel,
  Paper,
  Slider,
  styled,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { persianNumber } from "utils/functions.util";
const drawerWidth = 240;

const genders = {
  men: "مردانه",
  women: "زنانه",
  kid: "بچگانه",
};
const categories = {
  sport: "ورزشی",
  sneaker: "کتانی",
  oxford: "رسمی",
};
const colors = [
  "قرمز",
  "نارنجی",
  "مشکی",
  "بنفش",
  "سفید",
  "زرد",
  "آبی",
  "نقره ای",
  "صورتی",
  "سبز",
  "قهوه ای",
  "کرم",
];

const CategorySelect: React.FC<{
  categoryParam?: string;
  genderParam?: string;
}> = ({ categoryParam, genderParam }) => {
  const navigate = useNavigate();
  return (
    <Accordion
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "white",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography gutterBottom={false}>دسته بندی</Typography>
      </AccordionSummary>

      <List>
        {Object.entries(genders).map((gender, index) => (
          <ListItem>
            <Accordion
              elevation={0}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1e1e1e" : "white",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ "&::before": { backgroundColor: "none" } }}
              >
                <Typography>{gender[1]}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingRight: 2,
                  width: `${drawerWidth - 80}px`,
                }}
              >
                {Object.entries(categories).map((category, index) => (
                  <Button
                    onClick={() => {
                      navigate(
                        `/tehranshoes/products/${gender[0]}/${category[0]}`
                      );
                      // setOpen(false);
                    }}
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "inherit" : "primary",
                    }}
                    color={
                      categoryParam === category[0] && genderParam === gender[0]
                        ? "info"
                        : undefined
                    }
                    size={"large"}
                    variant={
                      categoryParam === category[0] && genderParam === gender[0]
                        ? "contained"
                        : "text"
                    }
                    fullWidth
                  >
                    {category[1]}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>
    </Accordion>
  );
};
interface priceProps {
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
}
const PriceSelect: React.FC<priceProps> = ({ setMaxPrice, setMinPrice }) => {
  const [multiValue, setMultiValue] = useState([0, 10000000]);

  const changeMultiValue = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(value)) setMultiValue(value);
  };
  const BootstrapInput = styled(TextField)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 14,
      width: "70px",
      padding: "5px 6px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
    },
  }));
  const handleClick = () => {
    setMaxPrice(multiValue[1].toString());
    setMinPrice(multiValue[0].toString());
  };
  const debouncedChangeMultiValue = useMemo(
    () => debounce(changeMultiValue, 200),
    []
  );
  useEffect(() => {
    return () => {
      debouncedChangeMultiValue.cancel();
    };
  }, []);
  return (
    <Accordion
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "white",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography gutterBottom={false}>محدوده قیمت </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingRight: 2,
          width: `${drawerWidth - 55}px`,
        }}
      >
        <Slider
          min={0}
          max={10000000}
          value={multiValue}
          onChange={changeMultiValue}
          sx={{
            "& .MuiSlider-thumb": {
              right: "90%",
            },
          }}
          componentsProps={{
            thumb: { style: { transform: "translate(0,-50%)" } },
          }}
          disableSwap
        />
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          mt={1}
        >
          <FormControl>
            <InputLabel
              shrink
              htmlFor="min-input"
              sx={{
                left: "auto",
                fontSize: "12px",
                transform: "translate(0px, 0px)",
              }}
            >
              از
            </InputLabel>
            <BootstrapInput
              id={"min-input"}
              name={"min"}
              value={persianNumber(multiValue[0].toString())}
            />
          </FormControl>
          <FormControl>
            <InputLabel
              shrink
              htmlFor="max-input"
              sx={{
                left: "auto",
                fontSize: "12px",
                transform: "translate(0px, 0px)",
              }}
            >
              تا
            </InputLabel>
            <BootstrapInput
              id={"max-input"}
              name={"max"}
              value={persianNumber(multiValue[1].toString())}
            />
          </FormControl>
        </Box>
        <Button
          variant="contained"
          color="info"
          onClick={handleClick}
          sx={{ marginTop: 2 }}
        >
          اعمال فیلتر
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
const ColorCheckbox = ({
  setColorCheckbox,
}: {
  setColorCheckbox: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setColorCheckbox((prev) => [...prev, e.target.name]);
    } else {
      setColorCheckbox((prev) => {
        const index = prev.indexOf(e.target.name);
        prev.splice(index, 1);
        return [...prev];
      });
    }
  };
  return (
    <Accordion
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "white",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography gutterBottom={false}> انتخاب رنگ </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "right",
          paddingRight: 2,
          width: `${drawerWidth - 80}px`,
        }}
      >
        <FormGroup>
          {colors.map((color) => (
            <FormControlLabel
              control={<Checkbox onChange={handleChange} name={color} />}
              label={color}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};
interface filterProps {
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;
  filterListMobileOpen: boolean;
  setFilterListMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setColorCheckbox: React.Dispatch<React.SetStateAction<string[]>>;
}
const FilterSide: React.FC<filterProps> = ({
  setMaxPrice,
  setMinPrice,
  filterListMobileOpen,
  setFilterListMobileOpen,
  setColorCheckbox,
}) => {
  const { category, gender } = useParams();
  const navigate = useNavigate();

  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h5">فیلتر‌ها</Typography>
      </Toolbar>
      <CategorySelect categoryParam={category} genderParam={gender} />
      <PriceSelect
        {...{
          setMaxPrice,
          setMinPrice,
        }}
      />
      <ColorCheckbox setColorCheckbox={setColorCheckbox} />
    </Box>
  );
  return (
    <Paper
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            border: "1px solid #5661686d",
            borderRadius: "10px",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1e1e1e" : "white",
            position: "static",
            minHeight: "80vh",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="right"
        transitionDuration={0}
        open={filterListMobileOpen}
        onClose={() => setFilterListMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Paper>
  );
};

export default FilterSide;
