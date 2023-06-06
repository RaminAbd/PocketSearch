import { WordsSynonym } from './WordsSynonym.model';
export class WordsSense {
  wordId: string;
  gloss: string;
  definition: string;
  academic: string;
  exampleOriginal: string;
  exampleTranslation: string;
  grammaticalInfo: any = undefined;
  grammaticalInfoForView:any;
  synonyms: any[] = [];
  antonyms: any[] = [];
  terminologyId:any = undefined;
  terminologyForView:any = null;
  id: string;

  SynonimSearchText: string;
  SearchResults: any[] = []
  showSynonymDrop: boolean = false;
  synonymsForView:string[]=[]
  synonymLoading: boolean = false;
  showSelectedSynonymSenses:boolean = false;

  AntonymSearchText: string;
  AntonymSearchResults: any[] = []
  showAntonymDrop: boolean = false;
  antonymsForView:string[]=[]
  antonymLoading: boolean = false;
  showSelectedAntonymSenses:boolean = false;
}
