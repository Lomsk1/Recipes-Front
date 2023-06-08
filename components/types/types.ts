export interface RecipeTypes {
  _id: string;
  recipeCategory: {
    name: string;
    _id: string;
  };
  author: {
    avatar: string;
    firstName: string;
    _id: string;
  };
  cookingProcess: {
    description: string;
    step: number;
    _id: string;
  }[];
  cookingTime: string;
  image: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  difficulty: string;
  ingredients: {
    name: string;
    _id: string;
  }[];
  nutrition: {
    name: string;
    weight: number;
    _id: string;
  }[];
  shortDescription: string;
  name: string;
  necessaryIngredients: {
    name: string;
    _id: string;
  }[];
  portion: number;
  ratingsAverage: number | null;
  ratingsQuantity: number | null;
}

export interface IngredientsType {
  name: string;
  _id: string;
}

export interface CommentTypes {
  _id: string;
  comment: string;
  user: {
    _id: string;
    firstName: string;
    avatar: string;
  };
  createdAt: Date;
  receipt: string;
}