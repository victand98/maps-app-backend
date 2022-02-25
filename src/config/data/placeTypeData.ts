import { PlaceTypeAttrs } from "../../models";
import { PlaceTypes } from "../../types";

export const placeTypeData: PlaceTypeAttrs[] = [
  {
    name: PlaceTypes["park"],
    icon: "park.svg",
    description: "Parques encontrados en la ciclovía",
  },
  {
    name: PlaceTypes["parking"],
    icon: "parking.svg",
    description: "Puntos de estacionamiento encontrados en la ciclovía",
  },
  {
    name: PlaceTypes["stream"],
    icon: "stream.svg",
    description: "Quebradas encontrados en la ciclovía",
  },
];
