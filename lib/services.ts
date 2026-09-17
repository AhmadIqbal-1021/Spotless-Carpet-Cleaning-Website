/**
 * Single source of truth for all services and pricing.
 *
 * These prices are supplied directly by the client and must not be
 * modified, estimated, or supplemented with invented figures. Every
 * page that displays pricing (home, services) reads from this file
 * so there is never more than one place to update a price.
 */

export type ServiceCategoryId =
  | "carpet"
  | "rooms"
  | "upholstery"
  | "mattress";

export type Service = {
  /** Stable identifier, used for form pre-selection and links. */
  id: string;
  name: string;
  price: number;
  /** Short, factual description — no invented technical claims. */
  description?: string;
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  title: string;
  description: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "carpet",
    title: "Carpet Cleaning",
    description:
      "Professional carpet cleaning priced by the number of rooms.",
    services: [
      { id: "carpet-1-room", name: "1 room carpet cleaning", price: 40 },
      { id: "carpet-2-room", name: "2 room carpet cleaning", price: 80 },
      { id: "carpet-3-room", name: "3 room carpet cleaning", price: 120 },
      { id: "carpet-4-room", name: "4 room carpet cleaning", price: 150 },
    ],
  },
  {
    id: "rooms",
    title: "Room & Property Cleaning",
    description: "Living rooms, stairs, landings and hallways.",
    services: [
      { id: "living-room", name: "1 living room cleaning", price: 50 },
      {
        id: "stairs-landings",
        name: "Stairs and landings cleaning",
        price: 50,
      },
      { id: "hallway", name: "Hallway cleaning", price: 20 },
    ],
  },
  {
    id: "upholstery",
    title: "Sofa & Upholstery Cleaning",
    description: "Professional cleaning for sofas of all sizes.",
    services: [
      { id: "sofa-2-seater", name: "2 seater sofa cleaning", price: 70 },
      { id: "sofa-3-seater", name: "3 seater sofa cleaning", price: 90 },
      { id: "sofa-l-shape", name: "L-shape sofa cleaning", price: 120 },
    ],
  },
  {
    id: "mattress",
    title: "Mattress Cleaning",
    description: "Deep cleaning for mattresses.",
    services: [
      {
        id: "mattress-normal",
        name: "Normal mattress cleaning",
        price: 40,
      },
      {
        id: "mattress-king",
        name: "King size mattress cleaning",
        price: 60,
      },
    ],
  },
];

export const allServices: Service[] = serviceCategories.flatMap(
  (category) => category.services
);

export function findServiceById(id: string): Service | undefined {
  return allServices.find((service) => service.id === id);
}

export function getCategoryStartingPrice(category: ServiceCategory): number {
  return Math.min(...category.services.map((service) => service.price));
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** High-level enquiry types offered in the quote form. */
export const enquiryServiceOptions = [
  { value: "carpet", label: "Carpet Cleaning" },
  { value: "living-room", label: "Living Room Cleaning" },
  { value: "stairs-landings", label: "Stairs & Landings Cleaning" },
  { value: "hallway", label: "Hallway Cleaning" },
  { value: "sofa", label: "Sofa / Upholstery Cleaning" },
  { value: "mattress", label: "Mattress Cleaning" },
  { value: "other", label: "Other / Not sure" },
] as const;

export type EnquiryServiceValue =
  (typeof enquiryServiceOptions)[number]["value"];
