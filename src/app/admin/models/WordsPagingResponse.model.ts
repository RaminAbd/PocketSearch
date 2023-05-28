import { Words } from "./Words.model";

export class WordsPagingResponse{
  items: Words[]=[];
	currentPage: number;
	totalPages: number;
	pageSize: number;
	totalCount: number;
	hasPrevious: boolean;
	hasNext: boolean;
}
