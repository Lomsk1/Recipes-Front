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
    name: string;
    destination: string;
    data: Buffer;
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
