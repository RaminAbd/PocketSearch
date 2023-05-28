export class WordsPagingRequest {
  DictionaryId: string;
  Letter: string;
  PageIndex: number = 1;
  PageSize: number = 15;
  SearchText: string;
}
