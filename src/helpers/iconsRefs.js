import BarIcon from "../SVG/Bar.svg"
import CineIcon from "../SVG/Cine.svg"
import TheaterIcon from "../SVG/Theater.svg"
import DiscoIcon from "../SVG/Disco.svg"
import ConcertIcon from "../SVG/Concert.svg"
//import CoffeeShopIcon from "../SVG/icons8-coffee-48.png"
import Excursión from "../SVG/Excursión.svg"

export const localType = [
    {
      icon:CineIcon,
      type:"Cine",
      subcategory: [
        "Clásico",
        "Normal",
        "3D",
        "Infantil",
      ]
    },
    {
      icon:BarIcon,
      type:"Bar",
    },{
      icon:TheaterIcon,
      type:"Teatro",
    },{
      icon:DiscoIcon,
      type:"Discoteca",
    },{
      icon:Excursión,
      type:"Excursión",
    }]
export const eventType = [
    {
    icon:TheaterIcon,
    type:"Presentación Teatral",
    },{
    icon:DiscoIcon,
    type:"Project",
    },{
    icon:ConcertIcon,
    type:"Concierto",
    },{
      icon:CineIcon,
      type:"Cine",
    },{
      icon:Excursión,
      type:"Excursión",
    }]