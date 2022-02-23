import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useEffect,useState} from 'react'
// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
 const [meals,setMeals]=useState([])
 const [isLoading,setIsLoading]=useState(true)
 const [httpError,setHttpError]=useState();
  useEffect(()=>
  {
    const fetchMeals= async()=>{ 
   const response = await fetch('https://foodorderapp-reactjs-default-rtdb.firebaseio.com/meals.json')
   if(!response.ok) 
   {
     console.log(httpError)
     throw new Error('Something went wrong!')
    }
   const data = await response.json()
   
   const loadedMeals=[]
   for(const key in data)
   {
     loadedMeals.push({
      id:key, 
      price: data[key].price,
       name:data[key].name,
       description:data[key].description
     })
   }
   setMeals(loadedMeals);
   setIsLoading(false)
  }

  fetchMeals().catch ((error)=>{
    setIsLoading(false)
    setHttpError(error.message)
  })
  },[])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
    if(isLoading)
    {
      return <p className={classes.MealsLoading}>Loading...</p>
    }
    if(httpError)
    {
      return <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
