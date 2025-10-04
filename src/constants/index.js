import { keyBy } from 'lodash';
import articlesData from '../data/articles.json';

export const apiUrl = import.meta.env.VITE_API_CHATBOT || 'http://localhost:8000';
export const articles = keyBy(articlesData, 'pmcid');
