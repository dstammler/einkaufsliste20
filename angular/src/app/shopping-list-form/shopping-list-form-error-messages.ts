export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ){}
}
export const ShoppingListErrorMessages = [
    new ErrorMessage('seeker_id','required','Es muss einen Listenersteller geben.'),
    new ErrorMessage('end_date','required','Es muss ein Enddatum angegeben werden.'),
    new ErrorMessage('label','required','Der Artikel muss einen Titel haben.'),
    new ErrorMessage('max_price','required','Der höchste Preis darf nur Zahlen beinhalten.'),
    new ErrorMessage('amount','required','Es muss eine Menge angegeben werden.'),
    new ErrorMessage('unit','required','Es muss eine Einheit angegeben werden.')
];
