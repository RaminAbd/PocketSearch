import { WordsDTO } from "./WordsDTO.model";

export class WordsPagingresponseDTO{
  items: WordsDTO[]=[];
	currentPage: number;
	totalPages: number;
	pageSize: number;
	totalCount: number;
	hasPrevious: boolean;
	hasNext: boolean;
}
