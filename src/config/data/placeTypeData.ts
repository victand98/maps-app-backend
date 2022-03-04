import { PlaceTypeAttrs } from "../../models";
import { PlaceTypes } from "../../types";

/**
 * Place types for default
 */
export const placeTypeData: PlaceTypeAttrs[] = [
  {
    name: PlaceTypes["park"],
    icon: "park",
    description: "Parques encontrados en la ciclovía",
    color: "#4ad466",
    status: true,
  },
  {
    name: PlaceTypes["parking"],
    icon: "local_parking",
    description: "Puntos de estacionamiento encontrados en la ciclovía",
    color: "#d49b4a",
    status: true,
  },
  {
    name: PlaceTypes["stream"],
    icon: "waves",
    description: "Quebradas encontrados en la ciclovía",
    color: "#4aabd4",
    status: true,
  },
];
