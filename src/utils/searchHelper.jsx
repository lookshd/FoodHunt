 export function filterData(searchText,restaurants)
{
const resfilterData=restaurants.filter((restaurant)=>

  restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  

);
return resfilterData;

}