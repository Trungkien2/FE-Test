import { ENV } from "../common";

class BaseAPI {
  private baseURL: string;
  private router: string;

  constructor(router: string) {
    this.baseURL = ENV.REACT_APP_API;
    this.router = router;
  }
  async getAll() {
    try {
      const response = await fetch(`${this.baseURL}${this.router}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async add<T>(value: T) {
    try {
      const response = await fetch(`${this.baseURL}${this.router}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });
      if (!response.ok) {
        throw new Error("Failed to add new task");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update<T>(id: number | string, updatedValue: T) {
    try {
      const response = await fetch(`${this.baseURL}${this.router}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValue),
      });
      if (!response.ok) {
        throw new Error(`Failed to update task with id ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default BaseAPI;
