export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
}