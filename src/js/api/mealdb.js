

export class Mealdb {
  constructor() {
    this.baseUrl = "https://nutriplan-api.vercel.app/api/meals";
  }
  async getMeals() {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?q=${query}&page=1&limit=25`,
      );
      // destructing results from response
      const { results } = await response.json();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllCategories() {
    try {
      const response = await fetch(
        `${this.baseUrl}/categories`,
      );
      // console.log(response);

      // destructing results from response
      const { results } = await response.json();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllAreas() {
    try {
      const response = await fetch(
        `${this.baseUrl}/areas`,
      );
      // console.log(response);

      // destructing results from response
      const { results } = await response.json();
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }

}
