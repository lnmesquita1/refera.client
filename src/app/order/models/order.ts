import { Category } from "./category";

export class Order {
	constructor(
		public id: string = null,
		public name: string = null,
		public celPhone: string = null,
		public category: Category = null,
		public agency: number = null,
		public description: string = null,
		public company: number = null,
		public deadline: string = null
	) { }
}