import { WordsSynonym } from './WordsSynonym.model';
export class WordsSense {
  wordId: string;
  gloss: string;
  definition: string;
  academic: string;
  exampleOriginal: string;
  exampleTranslation: string;
  grammaticalInfo: number = 1;
  synonyms: any[] = [];
  antonyms: any[] = [];
  id: string;

  SynonimSearchText: string;
  SearchResults: any[] = []
  showSynonymDrop: boolean = false;
  synonymsForView:string[]=[]

  AntonymSearchText: string;
  AntonymSearchResults: any[] = []
  showAntonymDrop: boolean = false;
  antonymsForView:string[]=[]
}
