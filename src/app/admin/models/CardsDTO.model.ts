import { CardItem } from "./CardItem.model";

export class CardsDTO {
  all: CardItem = new CardItem();
  verbs: CardItem = new CardItem();
  pronouns: CardItem = new CardItem();
  nouns: CardItem = new CardItem();
  adverbs: CardItem = new CardItem();
}
