export default interface ICanChat {
    getId(): number,
    getName(): string
    getType(): string
    setName(val: string): void
    getInfoString(): string
    getItems(): ICanChat[]
}