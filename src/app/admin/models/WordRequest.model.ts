import { WordsSense } from './WordsSense.model';
export class WordRequest{
  dictionaryId: string;
	headWord: string;
	lexemeForm: string;
	pronunciation: string;
	etymology: string;
	location: string;
	senses: WordsSense[]=[];
	id: string;
}
