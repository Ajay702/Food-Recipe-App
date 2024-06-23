import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([ {
      publisher: "A Spicy Perspective",
      image_url: "http://forkify-api.herokuapp.com/images/IMG_4351180x1804f4a.jpg",
      title: "Greek Pizza",
      id: "664c8f193e7aa067e94e8438"
    },
  {
    publisher: "Simply Recipes",
    image_url: "http://forkify-api.herokuapp.com/images/howtogrillpizzad300x20086a60e1b.jpg",
    title: "How to Grill Pizza",
    id: "664c8f193e7aa067e94e8534"
  },
  {
    publisher: "Simply Recipes",
    image_url: "http://forkify-api.herokuapp.com/images/pizza292x2007a259a79.jpg",
    title: "Homemade Pizza",
    id: "664c8f193e7aa067e94e8531"
  },
  {
    publisher: "Closet Cooking",
    image_url: "http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg",
    title: "Pizza Dip",
    id: "664c8f193e7aa067e94e84c1"
  },
  {
    publisher: "A Spicy Perspective",
    image_url: "http://forkify-api.herokuapp.com/images/IMG_4351180x1804f4a.jpg",
    title: "Greek Pizza",
    id: "664c8f193e7aa067e94e8438"
  },
  {
    publisher: "All Recipes",
    image_url: "http://forkify-api.herokuapp.com/images/391236ba85.jpg",
    title: "Veggie Pizza",
    id: "664c8f193e7aa067e94e845a"
  },
  {
    publisher: "All Recipes",
    image_url: "http://forkify-api.herokuapp.com/images/7988559586.jpg",
    title: "Valentine Pizza",
    id: "664c8f193e7aa067e94e8454"
  },
  {
    publisher: "My Baking Addiction",
    image_url: "http://forkify-api.herokuapp.com/images/PizzaDip21of14f05.jpg",
    title: "Pizza Dip",
    id: "664c8f193e7aa067e94e840d"
  },
  {
    publisher: "All Recipes",
    image_url: "http://forkify-api.herokuapp.com/images/5100898cc5.jpg",
    title: "Pizza Casserole",
    id: "664c8f193e7aa067e94e836b"
  },
  {
    publisher: "BBC Good Food",
    image_url: "http://forkify-api.herokuapp.com/images/1649634_MEDIUMd3fc.jpg",
    title: "Pitta pizzas",
    id: "664c8f193e7aa067e94e838d"
  },
  {
    publisher: "All Recipes",
    image_url: "http://forkify-api.herokuapp.com/images/7988559586.jpg",
    title: "Valentine Pizza",
    id: "664c8f193e7aa067e94e8454"
  },
  {
    publisher: "My Baking Addiction",
    image_url: "http://forkify-api.herokuapp.com/images/PizzaDip21of14f05.jpg",
    title: "Pizza Dip",
    id: "664c8f193e7aa067e94e840d"
  },]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([])

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate('/')
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorite(getCurrentItem){
    console.log(getCurrentItem);
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(item=> item.id === getCurrentItem.id)

    if(index === -1) {
      cpyFavoritesList.push(getCurrentItem)
    } else {
      cpyFavoritesList.splice(index)
    }

    setFavoritesList(cpyFavoritesList)
  }

  console.log(favoritesList, 'favoritesList');

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
