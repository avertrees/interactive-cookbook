// types/Ingredient.ts

// Ingredient types for classifying broad biological source
export type IngredientType = "plant" | "animal" | "fungi" | "mineral" | "other";

// Edible part of the ingredient (used for filtering or taxonomy)
export type EdiblePart =
  | "leaf"
  | "root"
  | "flower"
  | "fruit"
  | "seed"
  | "muscle"
  | "fat"
  | "milk"
  | "offal"
  | "shell"
  | "sap"
  | "bark"
  | "other";

export interface Taxonomy {
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
}

export interface Origin {
  region: string[]; // E.g., ["Mesoamerica"]
  specific_locations?: string[]; // E.g., ["Tehuacán Valley", "Veracruz"]
  indigenous_peoples?: string[]; // E.g., ["Nahua", "Maya"]
}

export interface FirstDocumentedUse {
    date: string;  // E.g., "7000 BCE"
    location?: string; // E.g., "Tehuacán Valley, Mexico"
    use?: string; // E.g., "Nixtamalized into masa"
    source?: string; // E.g., "Smith, B.D. (1995). The Emergence of Agriculture."
}

export interface Ingredient {
  id: string; // e.g., "pumpkin_seed"
  name: string; // e.g., "Pumpkin Seed"
  common_names?: string[];
  type: IngredientType;
  taxonomy: Taxonomy;
  part_used: EdiblePart;
  origin: Origin;
  flavor_profile?: string[]; // e.g., ["nutty", "earthy"]
  uses?: string[]; // e.g., ["sauce", "snack", "thickener"]
  cultural_notes?: string[]; // e.g., ["Used in pipián verde in Oaxaca..."]
  recipes?: string[]; // Recipe IDs that use this ingredient
  first_documented_use?: FirstDocumentedUse; // New field: e.g., "{ date: 7000 BCE, location: Tehuacán Valley"
}
