import fetch from 'isomorphic-fetch';

const baseUrl = 'http://jsonplaceholder.typicode.com';

const api = {
  posts: {
    async getList(page = 1) {
      const response = await fetch(`${baseUrl}/posts?_page=${page}`);
      const data = await response.json();
      return data;
    }
  }
};