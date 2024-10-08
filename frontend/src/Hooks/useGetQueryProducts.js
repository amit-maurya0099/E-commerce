import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addAllProducts, addProductCount, addResultPerPage } from "../Utils/appSlices/productSlice";
import { setLoading } from "../Utils/appSlices/userSlice";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const useGetQueryProducts = () => {
  const dispatch=useDispatch();
  const query = useQuery();
  const keyword = query.get("keyword");
 const page=query.get("page")

  const getQueryProducts = async () => {
   
    try {
      dispatch(setLoading(true))
      const response = await fetch(`api/v1/products?keyword=${keyword}&page=${page}`, {
        method: "GET",
      });
      console.log(response);
      const data = await response.json();
      dispatch(addAllProducts(data.products))
      dispatch(addResultPerPage(data.resultperpage))
      dispatch(addProductCount(data.productCount))

      console.log(data);
     dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
        console.log("error while fetching query products", error);
    }
  };

  useEffect(() => {
    getQueryProducts();
  }, [keyword,page]);
};
export default useGetQueryProducts;
