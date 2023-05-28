export class WordsDTO{
  id:string;
  headWord: string;
  glosses:string[]=[];
  definitions:string[] = [];
  synonyms:string[] = [];
  antonyms:string[] = [];
}