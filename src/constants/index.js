import { keyBy } from 'lodash';
import articlesData from '../data/articles.json';
import referenceData from '../data/references_graph.json';

export const apiUrl = import.meta.env.VITE_API_CHATBOT || 'http://localhost:8000';
export const referenceGraph = keyBy(referenceData, 'id');
export const articles = keyBy(articlesData.map((a) => {
    const pcmid = a.pmcid;
    const aRef = referenceGraph[pcmid];
    return {
        ...a,
        ref_cited: aRef.cited,
        ref_cited_by: aRef.cited_by
    }
}), 'pmcid');
