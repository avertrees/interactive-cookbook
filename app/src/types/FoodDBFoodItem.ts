export type FoodDBFoodItemType = {
  id: Number;
  name: String;
  name_scientific: String | null;
  description:  String | null;
  itis_id: String | null;
  wikipedia_id: String | null;
  picture_file_name: String | null;
  picture_content_type: String | null;
  picture_file_size: String | null;
  picture_updated_at: String | null;
  legacy_id: String | null;
  food_group: String | null;
  food_subgroup: String | null;
  food_type: String | null;
  created_at: String | null;
  updated_at: String | null;
  creator_id: Number;
  updater_id: Number;
  export_to_afcdb: Boolean;
  category: String | null;
  ncbi_taxonomy_id: String | null;
  export_to_foodb: Boolean;
  public_id: String | null
}