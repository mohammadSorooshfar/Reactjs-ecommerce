import BestSeller from "components/bestSeller/bestSeller";
import Category from "components/category/Category";
import NewsLetter from "components/newsLetter/NewsLetter";
import Offer from "components/offer/Offer";
import Slider from "components/slider/Slider";
import UserLayout from "layouts/User.Layout";
import React, { useEffect, useState } from "react";
import {
  getPostersService,
  getProductsService,
} from "services/services.services";
import { IProduct } from "types/interfaces.types";

const categories = [
  { en: "sport", fa: "ورزشی" },
  { en: "oxford", fa: "رسمی" },
  { en: "sneaker", fa: "کتانی" },
];

const Home: React.FC = () => {
  const [posters, setPosters] = useState<string[]>([]);
  const [productsCategories, setProductsCategories] = useState<{
    sport: IProduct[];
    oxford: IProduct[];
    sneaker: IProduct[];
  }>({ sport: [], oxford: [], sneaker: [] });

  useEffect(() => {
    getPostersService()
      .then((res: any) => setPosters(res))
      .catch((e) => console.log(e));
    categories.forEach((category) =>
      getProductsService("1", "6", [
        { name: "category.en", value: category.en },
      ]).then((res) => {
        setProductsCategories((prev) => ({ ...prev, [category.en]: res.data }));
      })
    );
  }, []);

  return (
    <UserLayout>
      <Slider images={posters} />
      <Offer />
      <Category />
      {Object.values(productsCategories).map((productCategory, index) => (
        <BestSeller
          products={productCategory}
          title={categories[index].fa}
          background={index % 2 === 0 ? "secondary.light" : "white"}
          category={categories[index].en}
        />
      ))}
      <NewsLetter />
    </UserLayout>
  );
};

export default Home;
