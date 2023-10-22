export default interface ICategory {
  _id?: string;
  CategoryImage?: string;
  CategoryTitle?: string;
  Date?: string;
}

export default interface ISubCategory {
  _id?: string;
  SubCategoryImage?: string;
  SubCategoryTitle: string;
  CategoryId: string;
  Date?: string;
}
